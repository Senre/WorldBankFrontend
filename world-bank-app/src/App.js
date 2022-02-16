import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Register from "./Components/Register";
import LoginPage from "./Components/LoginPage";
import Results from "./Components/Results";
import SearchPage from "./Components/SearchPage";
import { Switch, Route, Redirect } from "react-router-dom";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";

class App extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      results: [],
      isLoggedIn: cookies.get("sessionId") ? true : false,
      user: null,
    };
  }

  setData = (data) => {
    console.log("changed");
    this.setState({ results: data ? [...data] : [] });
  };

  logIn = () => {
    const { cookies } = this.props;

    const currentState = this.state.isLoggedIn;
    if (this.state.isLoggedIn) {
      cookies.remove("sessionId");
      cookies.remove("user_id");
    }
    console.log(cookies.getAll());
    this.setState({ isLoggedIn: !currentState });
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
          <Register logIn={(email) => this.LogIn(email)} />
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

export default withCookies(App);
