import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { InputForm, Success, Failure } from './containers';
import address, { initialState, sagas } from "./ducks/address";

const allSagas = [ ...sagas, ];

function* rootSaga() {
  yield all(allSagas.map(f => f()));
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  address,
  initialState,
  applyMiddleware(sagaMiddleware, createLogger()),
);

sagaMiddleware.run(rootSaga);

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <Switch>
        <Route exact path="/" component={ InputForm } />
        <Route exact path="/success" component={ Success } />
        <Route exact path="/failure" component={ Failure } />
      </Switch>
    </Provider>
  </BrowserRouter>
);

render(<App />, document.querySelector('#app'));
