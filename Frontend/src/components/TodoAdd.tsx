import React, { useState } from 'react';
import { Input } from 'antd';
import { ITodoAddProps } from "../ts/interface";

const TodoAdd: React.FC<ITodoAddProps> = 
({ 
  onInputChange,
  button
 }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const handleOnChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onInputChange(e.target.value);
  };
  return (
    <Input
      placeholder='Type todo item description here'
      value={inputValue}
      size="large"
      onChange={handleOnChange}
      addonAfter={button}
    />
  )
};

export default TodoAdd;
