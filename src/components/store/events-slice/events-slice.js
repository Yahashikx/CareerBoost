import { create } from "zustand";
import { collection, doc, getDoc, getDocs, addDoc, query } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase-config";

export const eventsCollectionsRef = collection(db, "events");
export const participantsCollectionsRef = collection(db, "participants");

export const useEvents = create((set) => ({
  events: [],
  isFetch: false,
  error: null,
  async getAllEvents() {
    try {
      set({ isFetch: true, error: null });
      const q = query(eventsCollectionsRef);
      const querySnapShot = await getDocs(q);
      const eventsData = querySnapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      set({ events: eventsData });
    } catch (error) {
      console.error(error);
      set({ error: "Failed to fetch events" });
    } finally {
      set({ isFetch: false });
    }
  },
  async getDefineEvent(id) {
    try {
      const defineEventsRef = doc(eventsCollectionsRef, id);
      const eventsSnap = await getDoc(defineEventsRef);
      if (eventsSnap.exists()) {
        set({ defineEvents: { id: eventsSnap.id, ...eventsSnap.data() } });
      } else {
        set({ error: "Event not found" });
      }
    } catch (error) {
      console.error("Error fetching event details:", error);
      set({ error: "Failed to fetch event details" });
    }
  },
  async addParticipant(eventId, participantName, participantEmail) {
    try {
      await addDoc(participantsCollectionsRef, {
        eventId,
        name: participantName,
        email: participantEmail,
        joinedAt: new Date(),
      });
      set({ error: null });
      return true;
    } catch (error) {
      console.error("Error adding participant:", error);
      set({ error: "Failed to join the event" });
      return false;
    }
  },
}));
