import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Network from "../Network";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.network = new Network();
  }

  async displayUser(email, password) {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    return await response.json();
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    if (email === "admin" && password === "admin") {
      this.props.setAdmin();
      this.props.logIn();
    } else if (email && password) {
      const response = await this.network.loggingIn(email, password);
      console.log(response);
      if (response.ok) {
        this.props.logIn();
      } else {
        console.log("Incorrect Email or Password");
      }
    } else {
      console.log("error");
    }
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  loginPopup() {
    return (
      <div>
        <header className="spacing">
          <div className="login-header">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/The_World_Bank_logo.svg/1280px-The_World_Bank_logo.svg.png"
              alt="WBD logo"
              width="260"
              height="60"
            ></img>
            <h1>Welcome to the World Bank Dashboard!</h1>
          </div>
        </header>
        <div className="spacing">
          <h5>Please login to search through the World Bank Database.</h5>
        </div>
        <div className="spacing">
          <div className="loginPage">
            <div></div>
            <div>
              <Form className="form" onSubmit={(e) => this.handleSubmit(e)}>
                <Form.Group className="mb-3">
                  <Form.Label className="username-label">Username</Form.Label>
                  <Form.Control
                    data-testid="username-control"
                    className="username-input"
                    type="text"
                    placeholder="Enter email"
                    value={this.state.email}
                    id="email"
                    onChange={(e) => this.handleChange(e)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="password-label">Password</Form.Label>
                  <Form.Control
                    data-testid="password-control"
                    className="password-input"
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    id="password"
                    onChange={(e) => this.handleChange(e)}
                  />
                </Form.Group>
                <Button
                  data-testid="login-button"
                  className="example"
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
                <Form.Group className="mb-3" id="register-redirect">
                  <Form.Label className="register-label">
                    Don't have an account?
                  </Form.Label>
                  <Link to="/register">
                    <Button data-testid="register-button" variant="primary">
                      Create an Account
                    </Button>
                  </Link>
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return <div>{this.loginPopup()}</div>;
  }
}

export default LoginPage;
