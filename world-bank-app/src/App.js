import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React from "react";
import LoginPage from "./Components/LoginPage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInput: "",
      passwordInput: "",
    };
  }
  render() {
    return (
      <div className="App">
        <LoginPage />
      </div>
    );
  }
}

export default App;
