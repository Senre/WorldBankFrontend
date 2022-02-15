import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";
import Register from "./Register";
import LoginPage from "./Components/LoginPage";
import SearchPage from "./Components/SearchPage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  render() {
    return (
      <Switch>
        <Route path="/home">
          <SearchPage />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login" component={LoginPage}>
          <LoginPage />
        </Route>
        <Route path="/">
          {this.state.isLoggedIn ? (
            <Redirect to="/home" />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
      </Switch>
    );
  }
}

export default App;
