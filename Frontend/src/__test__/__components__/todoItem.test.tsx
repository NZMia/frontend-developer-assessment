import { render, fireEvent, screen } from '@testing-library/react';
import TodoItem from '../../components/TodoItem';
import { ITodoItem } from '../../ts/interface';

describe('TodoItem', () => {
  const setups = (testData: ITodoItem = { id: '1', description: 'Buy milk', completed: false }) => {
    const mockHandleUpdate = jest.fn();
    const mockHandleDelete = jest.fn();

    const { getByText, getByPlaceholderText, ...utils } = render(
      <TodoItem todoItem={testData} handleUpdate={mockHandleUpdate} handleDelete={mockHandleDelete} />
    );
    const itemDesc = screen.getByText(testData.description);
    const checkBox = screen.getByRole('checkbox');
    const deleteButton = screen.getByText('Delete');

    return {
      itemDesc,
      checkBox,
      deleteButton,
      mockHandleUpdate,
      mockHandleDelete,
      ...utils,
    };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders TodoItem with correct description', () => {
    const { itemDesc } = setups();

    expect(itemDesc).toBeInTheDocument();
  });

  it('renders TodoItem with unchecked checkbox when completed is false', () => {
    const { checkBox } = setups();

    expect(checkBox).not.toBeChecked();
  });

  it('renders TodoItem with checked checkbox when completed is true', () => {
    const newTest: ITodoItem = { id: '1', description: 'Buy milk', completed: true };
    const { checkBox } = setups(newTest);

    expect(checkBox).toBeChecked();
  });

  it('calls handleUpdate with correct arguments when checkbox is clicked', () => {
    const { checkBox, mockHandleUpdate } = setups();

    fireEvent.click(checkBox);

    expect(mockHandleUpdate).toHaveBeenCalledWith('1', 'Buy milk', true);
  });

  it('calls handleDelete with correct argument when delete button is clicked', () => {
    const { deleteButton, mockHandleDelete } = setups();

    fireEvent.click(deleteButton);

    expect(mockHandleDelete).toHaveBeenCalledWith('1');
  });
});
