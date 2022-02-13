import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import '../styles/QuestionList.css';

import { Question, Patient, PatientAnswer } from '../types';
import { State } from '../reducers';
import QuestionForm from './QuestionForm';
import QuestionListItem from './QuestionListItem';

const QuestionList: React.FC = () => {
  const [ isAdding, setAdding ] = useState<boolean>(false);
  const questions: Question[] = useSelector((state: State) => state.questions);
  const patients: Patient[] = useSelector((state: State) => state.patients);
  const selectedPatientId: number | null = useSelector((state: State) => state.selectedPatientId);

  const getPatientAnswer = useCallback((questionId: number): PatientAnswer | undefined => {
    const selectedPatient: Patient | undefined = patients.find((patient: Patient) => patient.id === selectedPatientId);
    return selectedPatient?.answers.find((answer: PatientAnswer) => answer.questionId === questionId);
  }, [patients, selectedPatientId]);

  const toggleAdding = () => {
    setAdding(!isAdding);
  }

  return (
    <div className="QuestionList">
      <h3>
        My Questions&nbsp;
        <input type="button" value="Add a question" onClick={toggleAdding} />
      </h3>
      { isAdding &&
        <div className="QuestionList-item">
          <QuestionForm onClose={toggleAdding} />
        </div>
      }
      <ul>
        { questions.map((question: Question) => (
            <li key={question.id}>
              <QuestionListItem
                { ...question }
                patientAnswer={getPatientAnswer(question.id)}
              />
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default QuestionList;
