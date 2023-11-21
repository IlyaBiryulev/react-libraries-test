import React, { useEffect, useState } from 'react';
import './App.scss';
import Main from '../../pages/Main/Main';
import { Route, Routes } from 'react-router-dom';
import FlowDrop from '../../pages/FlowDrop/FlowDrop';

import 'reactflow/dist/style.css';

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<FlowDrop />}/>
      </Routes>
      <Main />
    </div>
  );
}

export default App;
