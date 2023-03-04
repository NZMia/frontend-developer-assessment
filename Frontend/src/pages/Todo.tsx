import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Spin, List, Alert } from 'antd';
import { RootState } from '../store/store';
import { IBaseTodoItem, ITodoItem } from '../ts/interface';
import {
  useGetTodoItemsQuery,
  useCreateTodoItemMutation,
  useUpdateTodoItemMutation,
  useDeleteTodoItemMutation,
} from '../store/api/todoApi';
import { 
  getTodoItems,
  addTodoItem,
  updateTodoItemReduce,
  deleteTodoItemReduce
} from '../store/slice/todoSlice';

import TodoAdd from '../components/TodoAdd';
import TodoItem from '../components/TodoItem';

const ToDoPage: React.FC = () => {
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const { todoItems } = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch();

  const { 
    data: todoList = [],
    isSuccess,
    isLoading,
    refetch
  } = useGetTodoItemsQuery();

  const [createTodoItem] = useCreateTodoItemMutation();
  const [updateTodoItem] = useUpdateTodoItemMutation();
  const [deleteTodoItem] = useDeleteTodoItemMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(getTodoItems(todoList));
    }
  }, [todoList, dispatch, isSuccess]);

  console.log('todoList:', todoList);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setErrorMsg('');
  };

  const handleAddTodoItem = (e: React.MouseEvent) => {
    e.preventDefault();
    const todoItem: IBaseTodoItem = {
      description: inputValue,
      completed: false,
    };

    createTodoItem(todoItem)
      .unwrap()
      .then((payload) => addTodoItem(payload))
      .catch((error) => setErrorMsg(`${inputValue}: ${error.data}`));

    refetch();
  };
  const handleUpdate = (id: string, description: string, isCompleted: boolean) => {
    const updatedItem: ITodoItem = {
      id: id,
      description: description,
      completed: isCompleted,
    };

    updateTodoItem(updatedItem)
      .unwrap()
      .then((payload: ITodoItem) => updateTodoItemReduce(payload))
      .catch((error) => setErrorMsg(`${description}: ${error.data}`));

    refetch();
  };

  const handleDelete = (id: string) => {
    deleteTodoItem(id)
      .unwrap()
      .then((payload) => deleteTodoItemReduce(payload))
      .catch((error) => setErrorMsg(error.data));
    refetch();
  };

  if (isLoading) {
    return (
      <div className='todo__page'>
        <Spin size='large' />
      </div>
    );
  }

  return (
    <div className='todo__page'>
      <TodoAdd
        onInputChange={handleInputChange}
        button={
          <Button type='text' onClick={handleAddTodoItem}>
            ADD
          </Button>
        }
      />
      {errorMsg && <Alert message={errorMsg} type='error' showIcon />}
      <List
        bordered
        dataSource={todoItems}
        renderItem={(todoItem: ITodoItem) => (
          <TodoItem 
            todoItem={todoItem}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete} />
        )}
      />
    </div>
  );
};

export default ToDoPage;
