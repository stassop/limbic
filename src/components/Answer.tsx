import React from 'react';

import '../styles/Answer.css';

interface AnswerProps {
  text?: string,
}

const Answer: React.FC<AnswerProps> = ({
  text,
}: AnswerProps) => {
  const isAnswered: boolean = text !== undefined;

  return (
    <div className="Answer">
      { isAnswered
        ? <span>{text}</span>
        : <label>
            Your answer:&nbsp;
            <input
              type="text"
              name="answerText"
              required={true}
              size={50}
            />
          </label>
      }
    </div>
  );
};

export default Answer;
