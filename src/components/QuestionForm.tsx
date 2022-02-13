import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Patient, AnswerOption } from '../types';
import { State } from '../reducers';
import { createQuestion, editQuestion } from '../actions';

interface QuestionFormProps {
  id?: number,
  text?: string,
  isMultiple?: boolean,
  answerOptions?: AnswerOption[],
  onClose: () => void,
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  id,
  text,
  isMultiple = false,
  answerOptions = [...Array(3)], // default to empty array
  onClose,
}: QuestionFormProps) => {
  const dispatch = useDispatch();
  const patients: Patient[] = useSelector((state: State) => state.patients);
  const [ isMultipleEditing, setMultipleEditing ] = useState<boolean>(isMultiple);

  const onMultipleChange = ({ target: checkbox }: React.ChangeEvent<HTMLInputElement>) => {
    setMultipleEditing(checkbox.checked);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form: HTMLFormElement = event.target as HTMLFormElement;
    const questionId: number = id !== undefined ? id : patients.length; // id is same as index
    const question = {
      id: questionId,
      text: form.questionText.value,
      isMultiple: isMultipleEditing,
      ...(isMultipleEditing && {answerOptions: [ // ugly but simple
        {id: 0, text: form.answerOption0.value},
        {id: 1, text: form.answerOption1.value},
        {id: 2, text: form.answerOption2.value},
      ]}),
    };
    if (text) {
      dispatch(editQuestion(question));
    } else {
      dispatch(createQuestion(question));
    }
    onClose();
  }

  return (
    <div className="QuestionForm">
      <form onSubmit={onSubmit}>
        <label>
          Question:&nbsp;
          <input
            type="text"
            name="questionText"
            defaultValue={text}
            required={true}
            size={40}
            autoFocus={true}
          />
        </label>
        <label>
          &nbsp;Multiple:&nbsp;
          <input
            type="checkbox"
            name="isMultiple"
            checked={isMultipleEditing}
            onChange={onMultipleChange}
          />
        </label><br />
        { isMultipleEditing &&
          answerOptions.map((option: AnswerOption | undefined, index: number) => (
            <label key={index}>
              Option {index + 1}:&nbsp;
              <input
                type="text"
                name={`answerOption${index}`}
                defaultValue={option?.text}
                required={true}
                size={40}
              /><br />
            </label>
          ))
        }
        <br />
        <input type="submit" value="Save" />
        <input type="button" value="Cancel" onClick={onClose} />
      </form>
    </div>
  );
};

export default QuestionForm;