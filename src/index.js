import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { createBrowserHistory as createHistory } from 'history'
import { InputForm, Success, Failure } from './containers';
import address, { initialState, sagas } from "./ducks/address";

const allSagas = [ ...sagas, ];

function* rootSaga(context) {
  yield all(allSagas.map(f => f(context)));
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  address,
  initialState,
  applyMiddleware(sagaMiddleware, createLogger()),
);

const history = createHistory();

sagaMiddleware.run(rootSaga, { history });

const App = () => (
  <Router history={history}>
    <Provider store={store}>
      <Switch>
        <Route exact path="/" component={ InputForm } />
        <Route exact path="/success" component={ Success } />
        <Route exact path="/failure" component={ Failure } />
      </Switch>
    </Provider>
  </Router>
);

render(<App />, document.querySelector('#app'));
