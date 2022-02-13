import React from 'react';

import '../styles/MultipleAnswer.css';

import { AnswerOption } from '../types';

interface MultipleAnswerProps {
  options: AnswerOption[],
  selectedOptionId?: number,
}

const MultipleAnswer: React.FC<MultipleAnswerProps> = ({
  options,
  selectedOptionId,
}: MultipleAnswerProps) => {
  const isAnswered: boolean = selectedOptionId !== undefined;

  return (
    <div className="MultipleAnswer">
      <ul>
        { options.map((option: AnswerOption) => (
            <li key={option.id}>
              { isAnswered &&
                <span className={
                  option.id === selectedOptionId
                  ? 'MultipleAnswer-option-selected'
                  : 'MultipleAnswer-option'
                }>
                  {option.text}
                </span>
              }
              { !isAnswered &&
                <label>
                  <input
                    type="radio"
                    value={option.id}
                    name="answerOptionId"
                    required={true}
                  />&nbsp;
                  {option.text}
                </label>
              }
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default MultipleAnswer;
