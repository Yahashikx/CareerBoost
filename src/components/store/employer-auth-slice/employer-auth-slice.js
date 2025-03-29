import { create } from "zustand";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth, db } from "../../utils/firebase/firebase-config";
import { collection, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

export const userCollectionRef = collection(db, "users");

export const useAuth = create((set) => ({
  isFetch: false,
  error: null,
  user: null,
  setUser: (user) => {
    set({ user });
  },
  async loginGoogle() {
    set({ isFetch: true, error: null });
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userData = { id: user.uid };
      const userDoc = doc(userCollectionRef, user.uid);
      const userSnapshot = await getDoc(userDoc);
      if (!userSnapshot.exists()) {
        await setDoc(userDoc, { isAdmin: false, isEmployer: true, work: [], avatar: "" });
      }

      set({ user: userData });
      return userData;
    } catch (error) {
      console.error(error);
      set({ error: "Ошибка при входе с Google" });
    } finally {
      set({ isFetch: false });
    }
  },
  async loginFacebook() {
    set({ isFetch: true, error: null });
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userData = { id: user.uid };
      const userDoc = doc(userCollectionRef, user.uid);
      const userSnapshot = await getDoc(userDoc);
      if (!userSnapshot.exists()) {
        await setDoc(userDoc, { isAdmin: false, isEmployer: true, work: [], avatar: "" });
      }

      set({ user: userData });
      return userData;
    } catch (error) {
      console.error(error);
      set({ error: "Ошибка при входе с Facebook" });
    } finally {
      set({ isFetch: false });
    }
  },

  async registerUser(email, password) {
    set({ isFetch: true, error: null });
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userDoc = doc(userCollectionRef, user.uid);
      await setDoc(userDoc, { isAdmin: false, isEmployer: true, work: [], avatar: "" });
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
      console.error("Error logging out", error);
    }
  },
  async updateAvatar(newAvatar) {
    const user = auth.currentUser;
    if (user) {
      try {
        const userDoc = doc(userCollectionRef, user.uid);
        await updateDoc(userDoc, { avatar: newAvatar });
        set({ user: { ...this.user, avatar: newAvatar } });
        localStorage.setItem("avatar", newAvatar);
      } catch (error) {
        console.error("Ошибка при обновлении аватара:", error);
        set({ error: "Ошибка при обновлении аватара" });
      }
    }
  },
}));