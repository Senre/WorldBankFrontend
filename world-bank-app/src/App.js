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
      compareResults: [],
      isLoggedIn: false,
      user: null,
    };
  }

  setData = (data, compareData) => {
    console.log("changed");
    this.setState({
      results: data ? [...data] : [],
      compareResults: compareData ? [...compareData] : [],
    });
  };

  logIn(email) {
    this.setState({ loggedIn: true, user: email });
  }

  render() {
    return (
      <Switch>
        <Route path="/home">
          {this.state.results.length === 0 ? (
            <SearchPage
              setData={(data, compareData) => this.setData(data, compareData)}
            />
          ) : (
            <Redirect to="/results" />
          )}
        </Route>
        <Route path="/register">
          <Register logIn={(email) => this.LogIn(email)} />
        </Route>
        <Route path="/login" component={LoginPage}>
          <LoginPage />
        </Route>
        <Route path="/results">
          {this.state.results.length === 0 ? (
            <Redirect to="/home" />
          ) : (
            <Results
              data={this.state.results}
              compareData={this.state.compareResults}
              setData={() => this.setData()}
            />
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
