import React from 'react';
import './App.css';
import CounterContainer from './components/CounterContainer';
import Counter from './components/Counter';
import TodosContainer from './components/TodosContainer';


function App() {
  return (
    <div>
      <CounterContainer />
      <hr />
      <TodosContainer />
    </div>
  );
}

export default App;
