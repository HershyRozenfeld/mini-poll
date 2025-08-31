import React from 'react';
import type { PollOptionProps } from '../types';

const PollOption: React.FC<PollOptionProps> = ({ 
  option, 
  index, 
  votes, 
  showResults, 
  onVote 
}) => {
  return (
    <li className="poll-option">
      <span>{option}</span>
      <div className="poll-option-actions">
        <button onClick={() => onVote(index)}>Vote</button>
        {showResults && <span>Votes: {votes}</span>}
      </div>
    </li>
  );
};

export default PollOption;