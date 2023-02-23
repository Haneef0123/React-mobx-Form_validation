import React from 'react';
import ReactDOM from 'react-dom';
import { StoresProvider } from './hooks/useStores';
import ValidationStore from './stores/ValidationStore';
import MyForm from './components/MyForm';

const validationStore = new ValidationStore(['email1', 'email2']);

ReactDOM.render(
  <React.StrictMode>
    <StoresProvider value={{ validationStore }}>
      <MyForm />
    </StoresProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
