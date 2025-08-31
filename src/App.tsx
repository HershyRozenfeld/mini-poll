import React, { useState } from "react";
import "./App.css";

// הגדרת הפונקציה כקומפוננטת React
const MiniPoll: React.FC = () => {
  // הגדרת סוגי המשתנים ב-useState
  const [options, setOptions] = useState<string[]>(["React", "Vue", "Svelte"]);
  const [votes, setVotes] = useState<number[]>(new Array(3).fill(0));
  const [showResults, setShowResults] = useState<boolean>(false);
  const [newOption, setNewOption] = useState<string>("");
  const [inputError, setInputError] = useState<boolean>(false);

  // הגדרת סוגי הארגומנטים בפונקציות
  const handleVote = (index: number) => {
    const newVotes = [...votes];
    newVotes[index]++;
    setVotes(newVotes);
  };

  const handleAddOption = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // מונע התנהגות ברירת מחדל של טופס
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

  // הגדרת סוג ההחזר של הפונקציה
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
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        maxWidth: "400px",
        margin: "20px auto",
      }}
    >
      <h2>Mini Poll</h2>
      {showResults && options.length > 0 && (
        <div style={{ textAlign: "center", marginBottom: "15px" }}>
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>
            {leaderText}
          </span>
        </div>
      )}

      {options.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {options.map((option, index) => (
            <li
              key={option}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px",
                borderBottom: "1px solid #eee",
              }}
            >
              <span>{option}</span>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <button onClick={() => handleVote(index)}>Vote</button>
                {showResults && <span>Votes: {votes[index]}</span>}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No options available. Please add a new option to start the poll.</p>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "20px",
        }}
      >
        <button onClick={handleToggleResults}>Toggle Results</button>
        <button onClick={handleReset}>Reset Votes</button>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        <h4>Add Option</h4>
        <input
          type="text"
          value={newOption}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNewOption(e.target.value);
            setInputError(false);
          }}
          placeholder="Enter new option"
          style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
        />
        {inputError && (
          <p style={{ color: "red", fontSize: "12px", margin: "5px 0 0" }}>
            Please enter a name.
          </p>
        )}
        <button
          onClick={handleAddOption}
          style={{ marginTop: "10px", width: "100%" }}
        >
          Add Option
        </button>
      </div>
    </div>
  );
};

export default MiniPoll;
