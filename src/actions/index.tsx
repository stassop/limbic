import { Action, ActionCreator } from 'redux';
import { Question } from '../types';

export enum Actions {
  CREATE_QUESTION = 'CREATE_QUESTION',
  EDIT_QUESTION = 'EDIT_QUESTION',
  DELETE_QUESTION = 'DELETE_QUESTION',
  SELECT_PATIENT = 'SELECT_PATIENT',
}

// Action types

interface CreateQuestion extends Action {
  type: Actions.CREATE_QUESTION,
  question: Question,
}

interface EditQuestion extends Action {
  type: Actions.EDIT_QUESTION,
  question: Question,
}

interface DeleteQuestion extends Action {
  type: Actions.DELETE_QUESTION,
  id: number,
}

interface SelectPatient extends Action {
  type: Actions.SELECT_PATIENT,
  id: number | null,
}

export type ActionType =
  CreateQuestion
  | EditQuestion
  | DeleteQuestion
  | SelectPatient;

// Action creators

export const createQuestion: ActionCreator<CreateQuestion> = (
  question: Question,
): CreateQuestion => ({
  type: Actions.CREATE_QUESTION,
  question,
});

export const editQuestion: ActionCreator<EditQuestion> = (
  question: Question,
): EditQuestion => ({
  type: Actions.EDIT_QUESTION,
  question,
});

export const deleteQuestion: ActionCreator<DeleteQuestion> = (
  id: number,
): DeleteQuestion => ({
  type: Actions.DELETE_QUESTION,
  id,
});

export const selectPatient: ActionCreator<SelectPatient> = (
  id: number | null,
): SelectPatient => ({
  type: Actions.SELECT_PATIENT,
  id,
});
