
export interface Question {
  id: string;
  text: string;
  marks: number;
  subQuestions?: Question[];
  answer?: string;
  options?: string[];
  type: 'mcq' | 'fill-in' | 'long' | 'short';
}

export interface Section {
  title: string;
  instructions: string;
  questions: Question[];
}

export interface Page {
  pageNumber: number;
  content: Section[];
}

export interface QuestionPaper {
  id: string;
  subject: string;
  title: string;
  instructions: string[];
  totalPages: number;
  totalMarks: number;
  duration: string;
  pages: Page[];
}

export interface ExamSession {
  studentName: string;
  subject: string;
  answers: { [questionId: string]: string };
  timeSpent: number; // in seconds
  lastSaved: Date;
}
