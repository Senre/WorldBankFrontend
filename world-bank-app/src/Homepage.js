import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Register from "./Register";
import LoginPage from "./Components/LoginPage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameInput: "",
      passwordInput: "",
    };
  }

  render() {
    return (
      <div className="App">
        <Register />
        <LoginPage />
      </div>
    );
  }
}

export default App;
