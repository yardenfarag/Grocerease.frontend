import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './store';
import App from './App'
import DarkModeProvider from './DarkModeProvider';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  </Provider>
)
