export interface ITodoItem {
  id: string;
  description: string;
  completed: boolean;
}

export interface IBaseTodoItem {
  description: string;
  completed?: boolean;
}

export interface ITodoAddProps {
  onInputChange: (inputValue: string) => void;
  button: React.ReactNode;
  errorMsg?: string
}
