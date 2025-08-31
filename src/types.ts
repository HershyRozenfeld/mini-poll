export interface PollOptionProps {
  option: string;
  index: number;
  votes: number;
  showResults: boolean;
  onVote: (index: number) => void;
}

export interface AddOptionProps {
  newOption: string;
  inputError: boolean;
  onNewOptionChange: (value: string) => void;
  onAddOption: (e: React.MouseEvent<HTMLButtonElement>) => void;
}