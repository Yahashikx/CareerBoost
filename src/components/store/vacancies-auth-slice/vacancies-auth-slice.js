import { create } from "zustand";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../../utils/firebase/firebase-config";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";

export const userCollectionRef = collection(db, "companies");

export const useAuth = create((set) => ({
  isFetch: false,
  error: null,
  user: null,
  setUser: (user) => {
    set({ user });
  },

  async registerUser(email, password, companyData) {
    set({ isFetch: true, error: null });
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userDoc = doc(userCollectionRef, user.uid);
      await setDoc(userDoc, {
        description: companyData.description,
        experience: companyData.experience,
        images: companyData.images,
        location: companyData.location,
        name: companyData.name,
        profession: companyData.profession,
        responsibilities: companyData.responsibilities,
        salary: companyData.salary,
        time: companyData.time,
        email: email,
      });

      const userData = { id: user.uid };
      set({ user: userData });
      return userData;
    } catch (error) {
      console.error(error);
      set({ error: "Ошибка при создании аккаунта" });
    } finally {
      set({ isFetch: false });
    }
  },

  async loginUser(email, password) {
    set({ isFetch: true, error: null });
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userData = { id: user.uid };
      set({ user: userData });
    } catch (error) {
      console.error(error);
      set({ error: "Ошибка при входе в аккаунт" });
    } finally {
      set({ isFetch: false });
    }
  },

  async logoutUser() {
    try {
      await signOut(auth);
      set({ user: null });
    } catch (error) {
      console.error("Ошибка при выходе", error);
    }
  },

  async updateAvatar(newAvatar) {
    const user = auth.currentUser;
    if (user) {
      try {
        const userDoc = doc(userCollectionRef, user.uid);
        await updateDoc(userDoc, { avatar: newAvatar });
        set({ user: { ...user, avatar: newAvatar } });
        localStorage.setItem("avatar", newAvatar);
      } catch (error) {
        console.error("Ошибка при обновлении аватара:", error);
        set({ error: "Ошибка при обновлении аватара" });
      }
    }
  },
}));