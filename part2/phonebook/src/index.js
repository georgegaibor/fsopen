import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import people from './phoneData';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App phoneData={people}/>
  </React.StrictMode>
);

