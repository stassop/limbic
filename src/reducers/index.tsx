import { Reducer } from 'redux';
import { Actions, ActionType } from '../actions';
import { Question, Patient } from '../types';

import questions from '../data/questions.json';
import patients from '../data/patients.json';

export interface State {
  questions: Question[],
  patients: Patient[],
  selectedPatientId: number | null,
}

const initialState: State = {
  questions: questions as Question[],
  patients: patients as Patient[],
  selectedPatientId: null,
};

export const rootReducer: Reducer<State, ActionType> = (
  state: State = initialState,
  action: ActionType,
): State => {
  switch (action.type) {
    case Actions.CREATE_QUESTION:
      return {
        ...state,
        questions: [ action.question, ...state.questions ]
      };
    case Actions.EDIT_QUESTION:
      return {
        ...state,
        questions: state.questions.map((question: Question) => {
          return question.id === action.question.id ? action.question : question;
        })
      };
    case Actions.DELETE_QUESTION:
      return {
        ...state,
        questions: state.questions.filter((question: Question) => {
          return question.id !== action.id;
        })
      };
    case Actions.SELECT_PATIENT:
      return {
        ...state,
        selectedPatientId: action.id,
      };
    default:
      return state;
  }
};
