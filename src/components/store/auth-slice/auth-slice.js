import { create } from "zustand";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../utils/firebase/firebase-config";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

export const userCollectionRef = collection(db, "users");

export const useAuth = create((set) => ({
  isFetch: false,
  error: null,
  user: null,
  isEmployer: false,
  setUser: (user) => {
    set({ user });
  },

  async loginGoogle() {
    set({ isFetch: true, error: null });
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userDoc = doc(userCollectionRef, user.uid);
      const userSnapshot = await getDoc(userDoc);
      if (!userSnapshot.exists()) {
        await setDoc(userDoc, { isAdmin: false, isEmployer: false, work: [], avatar: "" });
      }
      const userData = { ...userSnapshot.data(), id: user.uid };
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
      const userDoc = doc(userCollectionRef, user.uid);
      const userSnapshot = await getDoc(userDoc);
      if (!userSnapshot.exists()) {
        await setDoc(userDoc, { isAdmin: false, isEmployer: false, work: [], avatar: "" });
      }
      const userData = { ...userSnapshot.data(), id: user.uid };
      set({ user: userData });
      return userData;
    } catch (error) {
      console.error(error);
      set({ error: "Ошибка при входе с Facebook" });
    } finally {
      set({ isFetch: false });
    }
  },
    async checkIfEmployer() {
      try {
        const userId = auth.currentUser?.uid;
        if (!userId) {
          console.error('Не зарегестрирован');
          return;
        }
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        set({ isEmployer: userSnap.data()?.isEmployer || false });
      } catch (error) {
        console.error('Error fetching user employer status', error);
      }
    },
  async registerUser(email, password) {
    set({ isFetch: true, error: null });
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = doc(userCollectionRef, user.uid);
      await setDoc(userDoc, { isAdmin: false, isEmployer: false, work: [], avatar: "" });
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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = doc(userCollectionRef, user.uid);
      const userSnapshot = await getDoc(userDoc);
      const userData = { ...userSnapshot.data(), id: user.uid };
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
      console.error(error);
      set({ error: "Ошибка при выходе" });
    }
  }
}));
