import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodoItem } from "../../ts/interface";

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todoItems: [] as ITodoItem[],
    errorMsg: ''
  },

  reducers: {
    getTodoItems: (state, action:PayloadAction<ITodoItem[]>) => {
      state.todoItems = action.payload;
    },
    addTodoItem: (state, action: PayloadAction<ITodoItem>) => {
      state.todoItems = [...state.todoItems, action.payload];
    },
    updateTodoItemReduce: (state, action: PayloadAction<ITodoItem>) => {
      state.todoItems = state.todoItems.map(todoItem =>
        todoItem.id === action.payload.id ? action.payload : todoItem
      );
    },
    deleteTodoItemReduce: (state, action: PayloadAction<string>) => {
      state.todoItems = state.todoItems.filter((todoItem) => todoItem.id !== action.payload);
    },
    setErrorMsg: (state, action:PayloadAction<string>) => {
      state.errorMsg = action.payload;
    }
  },
})

export const { 
  getTodoItems, 
  addTodoItem, 
  updateTodoItemReduce, 
  deleteTodoItemReduce, 
  setErrorMsg 
} = todoSlice.actions;

export default todoSlice.reducer;
