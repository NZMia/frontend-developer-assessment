import { waitFor } from '@testing-library/react';
import  {
  getTodoItems,
  addTodoItem,
  updateTodoItemReduce,
  deleteTodoItemReduce,
  setErrorMsg,
} from '../store/slice/todoSlice';
import { ITodoItem } from '../ts/interface';
import { rootStore } from '../store/store';

describe('todoSlice', () => {
  let store: typeof rootStore;

  beforeEach(() => {
    store = rootStore
  });

  it('should get todo items correctly', () => {
    const mockTodoItems: ITodoItem[] = [
      {
        id: '1',
        description: 'This is the first todo item',
        completed: false,
      },
      {
        id: '2',
        description: 'This is the second todo item',
        completed: true,
      },
    ];

    store.dispatch(getTodoItems(mockTodoItems));
    expect(store.getState().todo.todoItems).toEqual(mockTodoItems);
  });

  it('should add the state with todo items', () => {
    const mockInitialState: ITodoItem[] = [
      {
        id: '1',
        description: 'This is the first todo item',
        completed: false,
      },
    ];
    store.dispatch(getTodoItems(mockInitialState));

    const todoItem: ITodoItem = {
      id: '2',
      description: 'This is the second todo item',
      completed: true,
    };

    store.dispatch(addTodoItem(todoItem));
    const state = store.getState().todo;
    expect(state.todoItems.length).toEqual(2);
    expect(state.todoItems[1]).toEqual(todoItem);
  });

  it('should update a todo item to the state', () => {
    const mockInitialState: ITodoItem[] = [
      {
        id: '1',
        description: 'This is the first todo item',
        completed: false,
      },
    ];
    store.dispatch(getTodoItems(mockInitialState));

    const mockTodoItem: ITodoItem = {
      id: '1',
      description: 'This is the updated first todo item',
      completed: true,
    };

    store.dispatch(updateTodoItemReduce(mockTodoItem));
    const todoItems = store.getState().todo.todoItems;
    expect(todoItems[0]).toEqual(mockTodoItem);
  });

  it('should delete a todo item from items', () => {
    const mockInitialState: ITodoItem[] = [
      {
        id: '1',
        description: 'This is the first todo item',
        completed: false,
      },
      {
        id: '2',
        description: 'This is the second todo item',
        completed: true,
      },
    ];
    store.dispatch(getTodoItems(mockInitialState));

    const todoItem: ITodoItem = {
      id: '2',
      description: 'This is the second todo item',
      completed: true,
    };

    store.dispatch(deleteTodoItemReduce(todoItem.id));
    const state = store.getState().todo;
    expect(state.todoItems.length).toEqual(1);
    expect(state.todoItems[0]).toEqual(mockInitialState[0]);
  });

  it('should render an error message', async () => {
    const essMsg: string = 'An error occurred.'
    store.dispatch(setErrorMsg(essMsg));
    await waitFor(() => {
      expect(store.getState().todo.errorMsg).toEqual(essMsg);
    });
  });
});
