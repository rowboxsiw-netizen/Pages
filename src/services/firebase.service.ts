
import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { firebaseConfig } from '../firebase.config';
import { ExamSession } from '../models/paper.model';

// Type aliases for Firebase compat types for improved readability and maintenance.
type Firestore = firebase.firestore.Firestore;
type DocumentReference = firebase.firestore.DocumentReference;
type DocumentSnapshot = firebase.firestore.DocumentSnapshot;

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  private db: Firestore;

  constructor() {
    // Ensure Firebase is initialized only once, preventing errors during hot reloads.
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.db = firebase.firestore();
  }

  /**
   * Saves the student's exam session to Firestore.
   * @param session The exam session data to save.
   */
  async saveSession(session: ExamSession): Promise<void> {
    if (!session.studentName) {
      throw new Error("Student name is required to save a session.");
    }
    const sessionRef: DocumentReference = this.db.collection('examSessions').doc(session.studentName);
    try {
      // Use the 'set' method from the compat API to save the document.
      await sessionRef.set({ ...session, lastSaved: new Date() });
      console.log('Session saved successfully!');
    } catch (error) {
      console.error("Error saving session: ", error);
      throw error;
    }
  }

  /**
   * Loads a previously saved exam session from Firestore.
   * @param studentName The name of the student whose session to load.
   * @returns The loaded ExamSession object, or null if not found.
   */
  async loadSession(studentName: string): Promise<ExamSession | null> {
    if (!studentName) {
      throw new Error("Student name is required to load a session.");
    }
    const sessionRef: DocumentReference = this.db.collection('examSessions').doc(studentName);
    try {
      // Use the 'get' method from the compat API to retrieve the document.
      const docSnap: DocumentSnapshot = await sessionRef.get();
      if (docSnap.exists) {
        console.log("Session data:", docSnap.data());
        return docSnap.data() as ExamSession;
      } else {
        console.log("No such session!");
        return null;
      }
    } catch (error) {
      console.error("Error loading session: ", error);
      throw error;
    }
  }
}
