import { useState, useEffect } from 'react';
import './App.css';

import io from 'socket.io-client';

const socket = io('http://localhost:5000');
// Create a counter and a button. Every time someone presses the button the counter should increase for everyone as fast as possible.
// Counter can persist in backend memory only, so no need to worry about long-term storage like DBMS.
// You need to worry about are problems arising when multiple users use the site at the same time
// Your code can involve only the backend and the frontend. Please don't implement silly solutions like talking to the backend through cloud services.
// Tip: start with thinking how you will update clients that didn't press the button and build your code from there.

function App() {
  const [counter, setCounter] = useState(0);

  const handleCounter = () => {
    socket.emit('clicked');
  };

  socket.on('connect', () => {
    socket.emit('clicked', counter);
    console.log("I'm connected!");
  });

  return (
    <>
      <button id="counterId" onClick={handleCounter}>
        Increase
      </button>
      <label name="counter" id="counter">{counter}</label>
    </>
  );
}

export default App;
