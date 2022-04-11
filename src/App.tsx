import React, { VFC } from 'react';
import './App.css';
import { IndexRoutes } from './features/routes';
import { HistoryRouter } from './features/shared/history-router/HistoryRouter';
import { history } from './features/util/history';

const App: VFC = () => (
  <HistoryRouter history={history}>
    <IndexRoutes />
  </HistoryRouter>
);

export default App;
