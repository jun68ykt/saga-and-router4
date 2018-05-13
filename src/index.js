import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { InputForm, Success, Failure } from './containers';
import address, { initialState } from "./ducks/address";

const store = createStore(
  address,
  initialState,
  applyMiddleware(createLogger()),
);

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
