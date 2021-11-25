import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

ReactDOM.render(
  <>
    <DndProvider
      backend={HTML5Backend}
      options={{
        enableMouseEvents: true,
        enableTouchEvents: true
      }}
    >
      <App />
    </DndProvider>
  </>,
  document.getElementById('root')
);
