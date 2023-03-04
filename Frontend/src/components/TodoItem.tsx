import React, { useState } from 'react';
import { Button, List, Checkbox } from 'antd';
import { ITodoItemProps } from '../ts/interface';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

/**
 * An List item component that allows the user to modify the item.
 * @param {ITodoItemProps} props
 * @action: {handleUpdate}: to change the check state.
 * @action: {handleDelete}: to delete the item from list.
 * @returns
 */
const TodoItem: React.FC<ITodoItemProps> = 
({ 
  todoItem,
  handleUpdate,
  handleDelete
 }) => {
  const { id, description } = todoItem;
  const [checkedState, setCheckState] = useState<boolean>(todoItem.completed);

  const onChange = (e: CheckboxChangeEvent) => {
    handleUpdate(id, description, e.target.checked);
    setCheckState(e.target.checked);
  };
  const onDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDelete(id);
  }
  return (
    <List.Item
        className={`todo__item ${checkedState ? 'todo--checked' : 'todo--unChecked'}`}
        actions={[ 
          <Button 
            type={checkedState ? 'dashed' : 'primary'} 
            onClick={onDelete}>
              Delete
          </Button>
        ]}
      >
        <Checkbox 
          onChange={onChange} 
          checked={checkedState}>
            {description}
        </Checkbox> 
    </List.Item>
  )
};

export default TodoItem;
