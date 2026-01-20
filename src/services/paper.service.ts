
import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { QuestionPaper, ExamSession } from '../models/paper.model';
import { PaperDataService } from './paper-data.service';
import { FirebaseService } from './firebase.service';

@Injectable({ providedIn: 'root' })
export class PaperService {
  private paperDataService = inject(PaperDataService);
  private firebaseService = inject(FirebaseService);

  // State Signals
  studentName = signal<string>('');
  questionPaper = signal<QuestionPaper | null>(null);
  answers = signal<{ [questionId: string]: string }>({});
  timeSpent = signal<number>(0); // in seconds
  
  // Computed Signal
  currentSession = computed<ExamSession>(() => ({
    studentName: this.studentName(),
    subject: this.questionPaper()?.subject ?? '',
    answers: this.answers(),
    timeSpent: this.timeSpent(),
    lastSaved: new Date(),
  }));

  private timer: any;

  constructor() {
    this.initializePaper();
    
    // Auto-save every 30 seconds.
    // The effect will re-run whenever studentName() changes.
    // The onCleanup function ensures the previous interval is cleared
    // before a new one is set, preventing memory leaks.
    effect((onCleanup) => {
      const name = this.studentName();
      if (name) {
        const autoSaveInterval = setInterval(() => {
          this.saveProgress();
        }, 30000);

        // Register a cleanup function to be called when the effect is destroyed
        // or re-runs. This is the correct way to handle side-effects like intervals.
        onCleanup(() => {
          clearInterval(autoSaveInterval);
        });
      }
    });
  }

  initializePaper() {
    const paper = this.paperDataService.getSciencePaper();
    this.questionPaper.set(paper);
  }

  startSession(name: string) {
    this.studentName.set(name);
    this.startTimer();
  }

  updateAnswer(questionId: string, answer: string) {
    this.answers.update(currentAnswers => ({
      ...currentAnswers,
      [questionId]: answer
    }));
  }

  private startTimer() {
    this.stopTimer();
    this.timer = setInterval(() => {
      this.timeSpent.update(t => t + 1);
    }, 1000);
  }

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  async saveProgress() {
    if (!this.studentName()) {
      console.warn('Cannot save progress without a student name.');
      return;
    }
    try {
      await this.firebaseService.saveSession(this.currentSession());
      console.log('Progress saved!');
    } catch (e) {
      console.error('Failed to save progress', e);
    }
  }

  async loadProgress(name: string) {
    this.studentName.set(name);
    try {
      const session = await this.firebaseService.loadSession(name);
      if (session) {
        this.answers.set(session.answers);
        this.timeSpent.set(session.timeSpent);
        // Assuming paper is already initialized
        this.startTimer();
        console.log('Progress loaded!');
      } else {
        console.log('No saved progress found for this student. Starting new session.');
        this.answers.set({});
        this.timeSpent.set(0);
        this.startTimer();
      }
    } catch (e) {
      console.error('Failed to load progress', e);
      // Start a fresh session on load failure
      this.answers.set({});
      this.timeSpent.set(0);
      this.startTimer();
    }
  }
}
