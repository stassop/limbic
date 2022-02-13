export interface AnswerOption {
  id: number,
  text: string,
}

export interface Question {
  id: number,
  text: string,
  isMultiple: boolean,
  answerOptions?: AnswerOption[],
}

export type Gender = 'male' | 'female';

export interface PatientAnswer {
  questionId: number,
  text?: string,
  answerOptionId?: number,
}

export interface Patient {
  id: number,
  name: string,
  gender: string,
  isActive: boolean,
  lastActive: string,
  answers: PatientAnswer[],
}
