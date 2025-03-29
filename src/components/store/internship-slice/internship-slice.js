import { create } from "zustand";
import { arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc } from "firebase/firestore";
import { auth, db } from "../../utils/firebase/firebase-config";

export const internshipCollectionsRef = collection(db, "internship");
export const useInternship = create((set) => ({
  intern: [],
  isFetch: false,
  error: false,
  async getAllInternship() {
    try {
      set({ isFetch: true });
      const q = query(internshipCollectionsRef);
      const querySnapShot = await getDocs(q);
      const internshipData = querySnapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      set({ intern: internshipData });
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ isFetch: false });
    }
  },
  defineInternship: null,
  async getDefineInternship(id) {
    const defineInternshipRef = doc(internshipCollectionsRef, id);
    const internshipSnap = await getDoc(defineInternshipRef);
    set({ defineInternship: { id: internshipSnap.id, ...internshipSnap.data() } });
  },
  async addToWork(internship) {
    try {
      const userId = auth.currentUser?.uid;
      if(!userId) {
        console.error('Пользователь не авторизован');
        return;
      }
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {work: arrayUnion(internship)});
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