import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Question, PatientAnswer,  } from '../types';
import { deleteQuestion } from '../actions';
import Answer from './Answer';
import MultipleAnswer from './MultipleAnswer';
import QuestionForm from './QuestionForm';

interface QuestionListItemProps extends Question {
  patientAnswer?: PatientAnswer,
}

const QuestionListItem: React.FC<QuestionListItemProps> = ({
  id,
  text,
  isMultiple,
  answerOptions,
  patientAnswer,
}: QuestionListItemProps) => {
  const dispatch = useDispatch();
  const [ isEditing, setEditing ] = useState<boolean>(false);

  const toggleEditing = () => {
    setEditing(!isEditing);
  };

  const onDelete = () => {
    dispatch(deleteQuestion(id));
  };

  return (
    <div className="QuestionList-item">
      { isEditing
        ? <QuestionForm
            id={id}
            text={text}
            isMultiple={isMultiple}
            answerOptions={answerOptions}
            onClose={toggleEditing}
          />
        : <>
            <b>{text}</b>
            { isMultiple
              ? <MultipleAnswer
                  options={answerOptions!} // assert answerOptions when isMultiple
                  selectedOptionId={patientAnswer?.answerOptionId}
                />
              : <Answer text={patientAnswer?.text} />
            }
            <input type="button" value="Edit" onClick={toggleEditing} />
            <input type="button" value="Delete" onClick={onDelete} />
          </>
      }
    </div>
  );
};

export default QuestionListItem;
