import { create } from "zustand";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../utils/firebase/firebase-config";

export const vacanciesCollectionsRef = collection(db, "vacancies");
export const useVacancies = create((set) => ({
  vacancie: [],
  isFetch: false,
  error: false,
  async getAllVacancies() {
    try {
      set({ isFetch: true });
      const q = query(vacanciesCollectionsRef);
      const querySnapShot = await getDocs(q);
      const vacanciesData = querySnapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      set({ vacancie: vacanciesData });
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ isFetch: false });
    }
  },
  defineVacancies: null,
  async getDefineVacancies(id) {
    const defineVacanciesRef = doc(vacanciesCollectionsRef, id);
    const vacanciesSnap = await getDoc(defineVacanciesRef);
    set({ defineVacancies: { id: vacanciesSnap.id, ...vacanciesSnap.data() } });
  },
  async addToWork(vacancies) {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        console.error("Пользователь не авторизован");
        return;
      }
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { work: arrayUnion(vacancies) });
      console.log("Добавлено");
    } catch (error) {
      console.error("Ошибка при добавлени", error);
    }
  },
  async getWork() {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        console.error("Пользователь не авторизован");
        return;
      }
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
      set({ work: userSnap.data()?.work || [] });
    } catch (error) {
      console.error("Ошибка", error);
    }
  },
}));