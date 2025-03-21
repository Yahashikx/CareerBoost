import { create } from "zustand";
import { arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc } from "firebase/firestore";
import { auth, db } from "../../utils/firebase/firebase-config";

export const companiesCollectionsRef = collection(db, "companies");
export const useCompanies = create((set) => ({
  companie: [],
  isFetch: false,
  error: false,
  async getAllCompanies() {
    try {
      set({ isFetch: true });
      const q = query(companiesCollectionsRef);
      const querySnapShot = await getDocs(q);
      const companiesData = querySnapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      set({ companie: companiesData });
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ isFetch: false });
    }
  },
  defineProduct: null,
  async getDefineProduct(id) {
    const defineProductRef = doc(companiesCollectionsRef, id);
    const companieSnap = await getDoc(defineProductRef);
    set({ defineProduct: { id: companieSnap.id, ...companieSnap.data() } });
  },
  async addToWork(companies) {
    try {
      const userId = auth.currentUser?.uid;
      if(!userId) {
        console.error('Пользователь не авторизован');
        return;
      }
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {work: arrayUnion(companies),});
      console.log('Добавлено');
      
    } catch(error) {
      console.error('Ошибка при добавлени', error);
      
    }
  },
  async getWork() {
    try {
      const userId = auth.currentUser?.uid;
      if(!userId) {
        console.error('Пользователь не авторизован');
        return;
      }
      const userRef = doc(db, "users", userId)
      const userSnap = await getDoc(userRef)
      set({work: userSnap.data()?.work || []})
    } catch (error) {
      console.error('Ошибка', error);
      
    }
  },
}));
