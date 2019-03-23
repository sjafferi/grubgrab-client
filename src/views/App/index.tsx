import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { hot } from "react-hot-loader";
import { parse } from 'query-string';
import { LoginModal } from 'ui';
import { Header } from './Header';
import { Home } from "../Home";

import { inject, observer } from "mobx-react";
import { User, RouterStore } from 'stores';

import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import "normalize.css";
import "uikit/dist/js/uikit.min.js";
import "uikit/dist/css/uikit.min.css";

UIkit.use(Icons);

@inject("router")
@observer
class App extends React.Component<{ user?: User, router?: RouterStore }, {}>  {
  get params() { return parse(this.props.router!.location.search) || {}; }
  public render() {
    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route path="/home" component={Home} />
        </Switch>
        <>
          {this.params.login && <LoginModal />}
        </>
      </React.Fragment>
    );
  }
}

export default hot(module)(App);
