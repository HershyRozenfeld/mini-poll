import React from 'react';
import type { AddOptionProps } from '../types';

const AddOption: React.FC<AddOptionProps> = ({ 
  newOption, 
  inputError, 
  onNewOptionChange, 
  onAddOption 
}) => {
  return (
    <div className="add-option-container">
      <h4>Add Option</h4>
      <input
        type="text"
        value={newOption}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onNewOptionChange(e.target.value);
        }}
        placeholder="Enter new option"
        className="add-option-input"
      />
      {inputError && (
        <p className="add-option-error">
          Please enter a name.
        </p>
      )}
      <button
        onClick={onAddOption}
        className="add-option-button"
      >
        Add Option
      </button>
    </div>
  );
};

export default AddOption;