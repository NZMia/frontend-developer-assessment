import { render, fireEvent, screen } from '@testing-library/react';
import TodoAdd from "../../components/TodoAdd";

const setups = () => {
  const mockInputChange = jest.fn();
  const mockOnClick = jest.fn();
  const { 
    getByText,
    getByPlaceholderText,
    ...utils
  } = render(
    <TodoAdd 
      onInputChange={mockInputChange} 
      button={<button onClick={mockOnClick}>Add</button>} />
  )
  const buttonAdd = screen.getByText('Add')
  const input = screen.getByPlaceholderText('Type todo item description here');
  return {
    buttonAdd,
    input,
    mockInputChange,
    mockOnClick,
    ...utils,
  };
};

describe('TodoAdd', ()=> {
  it('renders the button with text "Add"', () => {
    const { buttonAdd } = setups();
    expect(buttonAdd).toBeInTheDocument();
  });
  it('calls onInputChange when input value changes', () => {
    const { input, mockInputChange } = setups()

    fireEvent.change(input, { target: { value: 'Buy milk' } });
    expect(mockInputChange).toHaveBeenCalledWith('Buy milk');
  });

  it('calls button onClick prop when clicked', () => {
    const { buttonAdd, mockOnClick } = setups();
    fireEvent.click(buttonAdd);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
})
