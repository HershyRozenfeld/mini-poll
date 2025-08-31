import React, { useState } from "react";
import PollOption from "./PollOption";
import AddOption from "./AddOption";
import "../Poll.css";

const Poll: React.FC = () => {
  // Exactly the same state as in the original code
  const [options, setOptions] = useState<string[]>(["React", "Vue", "Svelte"]);
  const [votes, setVotes] = useState<number[]>(new Array(3).fill(0));
  const [showResults, setShowResults] = useState<boolean>(false);
  const [newOption, setNewOption] = useState<string>("");
  const [inputError, setInputError] = useState<boolean>(false);

  // Exactly the same functions as in the original code
  const handleVote = (index: number) => {
    const newVotes = [...votes];
    newVotes[index]++;
    setVotes(newVotes);
  };

  const handleAddOption = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (newOption.trim() === "") {
      setInputError(true);
      return;
    }
    setOptions([...options, newOption]);
    setVotes([...votes, 0]);
    setNewOption("");
    setInputError(false);
  };

  const handleReset = () => {
    setVotes(new Array(votes.length).fill(0));
  };

  const handleToggleResults = () => {
    setShowResults(!showResults);
  };

  const handleNewOptionChange = (value: string) => {
    setNewOption(value);
    setInputError(false);
  };

  // Exactly the same getLeader function
  const getLeader = (): string | null => {
    if (options.length === 0) return null;

    const maxVotes = Math.max(...votes);
    const leaders = options.filter((_, index) => votes[index] === maxVotes);

    if (maxVotes === 0 && options.length > 0) return "No votes yet!";
    if (leaders.length > 1) return "It's a tie!";

    return `${leaders[0]} is the leader!`;
  };

  const leaderText = getLeader();

  return (
    <div className="poll-container">
      <h2>Mini Poll</h2>
      {showResults && options.length > 0 && (
        <div className="poll-leader">
          <span className="poll-leader-text">
            {leaderText}
          </span>
        </div>
      )}

      {options.length > 0 ? (
        <ul className="poll-options-list">
          {options.map((option, index) => (
            <PollOption
              key={option}
              option={option}
              index={index}
              votes={votes[index]}
              showResults={showResults}
              onVote={handleVote}
            />
          ))}
        </ul>
      ) : (
        <p>No options available. Please add a new option to start the poll.</p>
      )}

      <div className="poll-controls">
        <button onClick={handleToggleResults}>Toggle Results</button>
        <button onClick={handleReset}>Reset Votes</button>
      </div>

      <AddOption
        newOption={newOption}
        inputError={inputError}
        onNewOptionChange={handleNewOptionChange}
        onAddOption={handleAddOption}
      />
    </div>
  );
};

export default Poll;