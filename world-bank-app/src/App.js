import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Register from "./Components/Register";
import LoginPage from "./Components/LoginPage";
import Results from "./Components/Results";
import SearchPage from "./Components/SearchPage";
import { Switch, Route, Redirect } from "react-router-dom";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      results: [],
      isLoggedIn: false,
      username: null,
    };
  }

  setData = (data) => {
    console.log("changed");
    this.setState({ results: data ? [...data] : [] });
  };

  logIn(username) {
    this.setState({ loggedIn: true, user: username });
  }

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
          <Register logIn={(username) => this.LogIn(username)} />
          {this.state.isLoggedIn ? <Redirect to="home" /> : null}
        </Route>
        <Route path="/login" component={LoginPage}>
          <LoginPage />
        </Route>
        <Route path="/results">
          {this.state.results.length === 0 ? (
            <Redirect to="/home" />
          ) : (
            <Results data={this.state.results} setData={() => this.setData()} />
          )}
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
