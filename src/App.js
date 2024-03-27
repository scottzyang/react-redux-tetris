import React from 'react';
import './App.css';

import GridBoard from './components/GridBoard.js'
import NextBlock from './components/NextBlock.js'
import ScoreBoard from './components/ScoreBoard.js'
import Controls from './components/Controls.js'
import MessagePopup from './components/MessagePopup.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Tetris Redux</h1>
      </header>
      <GridBoard />
      <NextBlock />
      <ScoreBoard />
      <Controls />
      <MessagePopup />
    </div>
  );
}

export default App;
