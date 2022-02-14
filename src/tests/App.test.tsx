// import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen, within } from '@testing-library/react';

const questionMocks = [
  {
    id: 0,
    text: 'dolor culpa dolore exercitation culpa?',
    isMultiple: true,
    answerOptions: [
      {
        id: 0,
        text: 'ex quis laborum id quis'
      },
      {
        id: 1,
        text: 'ex sunt dolor nulla Lorem'
      },
      {
        id: 2,
        text: 'fugiat aliquip labore laborum aliquip'
      }
    ]
  },
  {
    id: 1,
    text: 'enim id laboris ullamco duis?',
    isMultiple: false
  },
];

const patientMocks = [
  {
    id: 0,
    isActive: true,
    name: 'Cunningham Rose',
    gender: 'male',
    lastActive: '2022-01-17',
    answers: [
      {
        questionId: 0,
        answerOptionId: 1
      },
      {
        questionId: 1,
        text: 'voluptate proident sunt duis esse'
      },
    ]
  }
];

jest.mock('../data/questions.json', () => questionMocks);
jest.mock('../data/patients.json', () => patientMocks);

import App from '../components/App';
import { Question, Patient } from '../types';

describe('App', () => {
  test('renders questions correctly', async () => {
    render(<App />);

    const data = questionMocks[0] as Question;

    const questions = await screen.findAllByTestId(/^question-\d+$/);
    const question = await screen.findByTestId(`question-${data.id}`);

    expect(questions).toHaveLength(2);
    expect(question).toBeInTheDocument();

    const questionText = await within(question).findByText(data.text);
    const answerOption0 = await within(question).findByLabelText(data.answerOptions![0].text);
    const answerOption1 = await within(question).findByLabelText(data.answerOptions![1].text);
    const answerOption2 = await within(question).findByLabelText(data.answerOptions![2].text);
    const editButton = await within(question).findByDisplayValue('Edit');
    const deleteButton = await within(question).findByDisplayValue('Delete');

    expect(questionText).toBeInTheDocument();
    expect(answerOption0).toBeInTheDocument();
    expect(answerOption1).toBeInTheDocument();
    expect(answerOption2).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  test('renders patients correctly', async () => {
    render(<App />);

    const data = patientMocks[0] as Patient;

    const patients = await screen.findAllByTestId(/^patient-\d+$/);
    const patient = await screen.findByTestId(`patient-${data.id}`);

    expect(patients).toHaveLength(1);
    expect(patient).toBeInTheDocument();

    const patientName = await within(patient).findByText(data.name);
    const activityIndicator = await within(patient).findByText('Active now');

    expect(patientName).toBeInTheDocument();
    expect(activityIndicator).toBeInTheDocument();
  });

  test('handles user selection', async () => {
    render(<App />);

    const patientData = patientMocks[0] as Patient;
    const questionData = questionMocks[0] as Question;

    const patient = await screen.findByTestId(`patient-${patientData.id}`);
    const question = await screen.findByTestId(`question-${questionData.id}`);

    fireEvent.click(patient);

    const answerOption0 = await within(question).findByText(questionData.answerOptions![0].text);
    const answerOption1 = await within(question).findByText(questionData.answerOptions![1].text);
    const answerOption2 = await within(question).findByText(questionData.answerOptions![2].text);

    expect(answerOption0).toHaveClass('MultipleAnswer-option');
    expect(answerOption1).toHaveClass('MultipleAnswer-option-selected');
    expect(answerOption2).toHaveClass('MultipleAnswer-option');

    fireEvent.click(patient); // deselect
  });

  test('handles edit button click', async () => {
    render(<App />);

    const data = questionMocks[0] as Question;

    const question = await screen.findByTestId(`question-${data.id}`);

    const editButton = await within(question).findByDisplayValue('Edit');

    fireEvent.click(editButton);

    // These are now <input/> elements
    const questionText = await within(question).findByDisplayValue(data.text);
    const answerOption0 = await within(question).findByDisplayValue(data.answerOptions![0].text);
    const answerOption1 = await within(question).findByDisplayValue(data.answerOptions![1].text);
    const answerOption2 = await within(question).findByDisplayValue(data.answerOptions![2].text);
    const saveButton = await within(question).findByDisplayValue('Save');
    const cancelButton = await within(question).findByDisplayValue('Cancel');

    expect(questionText).toBeInTheDocument();
    expect(questionText).toHaveFocus();
    expect(answerOption0).toBeInTheDocument();
    expect(answerOption1).toBeInTheDocument();
    expect(answerOption2).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();

    fireEvent.click(cancelButton); // cancel editing
  });

  test('handles delete button click', async () => {
    render(<App />);

    const data = questionMocks[0] as Question;

    const question = await screen.findByTestId(`question-${data.id}`);

    const deleteButton = await within(question).findByDisplayValue('Delete');

    fireEvent.click(deleteButton);

    expect(question).not.toBeInTheDocument();
  });
});
