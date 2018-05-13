import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { InputForm, Success, Failure } from './containers'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ InputForm } />
      <Route exact path="/success" component={ Success } />
      <Route exact path="/failure" component={ Failure } />
    </Switch>
  </BrowserRouter>
);

render(<App />, document.querySelector('#app'));
