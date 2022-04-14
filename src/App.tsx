import React from 'react';
import './App.css';
import { history } from './features/util/history';
import TokenExpirationPopup from './features/auth/token-expiration-popup/TokenExpirationPopup';
import HistoryRouter from './features/shared/history-router';
import IndexRoutes from './features/routes/index-routes';

function App() {
  return (
    <>
      <TokenExpirationPopup />
      <HistoryRouter history={history}>
        <IndexRoutes />
      </HistoryRouter>
    </>
  );
}

export default App;
