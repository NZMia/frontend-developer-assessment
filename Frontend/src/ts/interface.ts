export interface ITodoItem {
  id: string;
  description: string;
  completed: boolean;
}

export interface IBaseTodoItem {
  description: string;
  completed?: boolean;
}
