import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Spin } from 'antd';
import { RootState } from "../store/store";
import { 
  useGetTodoItemsQuery,
  useCreateTodoItemMutation
} from "../store/api/todoApi";
import { 
  getTodoItems, 
  addTodoItem
} from "../store/slice/todoSlice";

import TodoAdd from "../components/TodoAdd";
import { IBaseTodoItem } from "../ts/interface";



const ToDoPage: React.FC = () => {

  const [ errorMsg, setErrorMsg ] = useState<string>('')
  const [ inputValue, setInputValue ] = useState<string>('');
  const dispatch = useDispatch()

  const {
    data: todoList =[],
    isSuccess,
    isLoading,
  } = useGetTodoItemsQuery();

  const [ createTodoItem ] = useCreateTodoItemMutation()

  useEffect(() => {
    if(isSuccess) {
      dispatch(getTodoItems(todoList))
    }
  }, [todoList, dispatch, isSuccess])

  console.log('todoList:', todoList);
  
  const handleInputChange = (value: string) => {
    setInputValue(value);
    setErrorMsg('')
  }

  const handleAddTodoItem = (e: React.MouseEvent) => {
    e.preventDefault();
    const todoItem:IBaseTodoItem = {
      description: inputValue,
      completed: false,
    }

    createTodoItem(todoItem)
      .unwrap()
      .then((payload) => addTodoItem(payload))
      .catch((error) => setErrorMsg(`${error.data}`));
  }

  if(isLoading) {
    return <div className="todo__page"><Spin size="large" /></div>
  }

  return (
    <div className="todo__page">
      <TodoAdd 
        onInputChange = {handleInputChange}
        button={<Button type='text' onClick={handleAddTodoItem}>ADD</Button>}
        />
      {
        errorMsg && <p>{errorMsg}</p>
      }
    </div>
  )
}

export default ToDoPage