
import { Injectable, inject } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, Firestore, DocumentReference, DocumentSnapshot } from 'firebase/firestore';
import { firebaseConfig } from '../firebase.config';
import { ExamSession } from '../models/paper.model';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  private app: FirebaseApp;
  private db: Firestore;

  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
  }

  async saveSession(session: ExamSession): Promise<void> {
    if (!session.studentName) {
      throw new Error("Student name is required to save a session.");
    }
    const sessionRef: DocumentReference = doc(this.db, 'examSessions', session.studentName);
    try {
      await setDoc(sessionRef, { ...session, lastSaved: new Date() });
      console.log('Session saved successfully!');
    } catch (error) {
      console.error("Error saving session: ", error);
      throw error;
    }
  }

  async loadSession(studentName: string): Promise<ExamSession | null> {
    if (!studentName) {
      throw new Error("Student name is required to load a session.");
    }
    const sessionRef: DocumentReference = doc(this.db, 'examSessions', studentName);
    try {
      const docSnap: DocumentSnapshot = await getDoc(sessionRef);
      if (docSnap.exists()) {
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
