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
      compareResults: [],
      isLoggedIn: cookies.get("sessionId") ? true : false,
      username: null,
    };

    console.log(this.state.isLoggedIn);
  }

  setData = (data, compareData) => {
    console.log("changed");
    this.setState({
      results: data ? [...data] : [],
      compareResults: compareData ? [...compareData] : [],
    });
  };

  logIn = (username) => {
    const { cookies } = this.props;
    console.log("logged");
    const currentState = this.state.isLoggedIn;
    if (this.state.isLoggedIn) {
      console.log("removed");
      cookies.remove("sessionId", { path: "/" });
      cookies.remove("user_id", { path: "/" });
      cookies.remove("email", { path: "/" });
      this.setState({ isLoggedIn: !currentState, username: "" });
    } else {
      this.setState({ isLoggedIn: true, user: username });
    }
    console.log(cookies.getAll());
  };

  render() {
    return (
      <Switch>
        <Route path="/home">
          {this.state.results.length === 0 ? (
            <SearchPage
              setData={(data, compareData) => this.setData(data, compareData)}
              logIn={() => this.logIn()}
            />
          ) : (
            <Redirect to="/results" />
          )}
        </Route>
        <Route path="/register">
          {this.state.isLoggedIn ? (
            <Redirect to="/home" />
          ) : (
            <Register logIn={(username) => this.logIn(username)} />
          )}
        </Route>
        <Route path="/login" component={LoginPage}>
          {this.state.isLoggedIn ? (
            <Redirect to="/home" />
          ) : (
            <LoginPage logIn={() => this.logIn()} />
          )}
        </Route>
        <Route path="/results">
          {this.state.results.length === 0 ? (
            <Redirect to="/home" />
          ) : (
            <Results
              data={this.state.results}
              compareData={this.state.compareResults}
              setData={() => this.setData()}
              logIn={() => this.logIn()}
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

export default withCookies(App);
