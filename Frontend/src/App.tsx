import React from 'react';
import './App.scss';

import ToDoPage from './pages/Todo';

const App: React.FC = () => {
  
  return(
    <div className="myApp">
      <ToDoPage />
    </div>
  )
}

export default App
