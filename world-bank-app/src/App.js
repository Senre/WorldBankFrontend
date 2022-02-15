import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Register from "./Register";
import LoginPage from "./Components/LoginPage";
import Results from "./Components/Results";
import { Route, Redirect, Switch } from "react-router-dom";
import SearchPage from "./Components/SearchPage";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      results: [],
    };
  }

  setData = (data) => {
    console.log("changed");
    this.setState({ results: data ? [...data] : [] });
  };

  render() {
    return (
      <Switch>
        <Route path="/home">
          {this.state.results.length === 0 ? (
            <SearchPage setData={(data) => this.setData(data)} />
          ) : (
            <Redirect to="/results" />
          )}
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/results">
          <Results data={this.state.results} setData={() => this.setData()} />
        </Route>
        <Route path="/">
          <Redirect to="/register" />
        </Route>
      </Switch>
    );
  }
}

export default App;
