import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from '../reducers';

import '../styles/App.css';

import QuestionList from './QuestionList';
import PatientList from './PatientList';

const store = createStore(rootReducer);

const App: React.FC = () => (
  <div className="App">
    <header className="App-header">
      <h1>Patient Questionnaires</h1>
    </header>
    <main className="App-main">
      <Provider store={store}>
        <PatientList />
        <QuestionList />
      </Provider>
    </main>
  </div>
);

export default App;
