import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Network from "./Network";

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
    if (email && password) {
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
      <div className="LoginPage">
        <Form className="form" onSubmit={(e) => this.handleSubmit(e)}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={this.state.email}
              id="email"
              onChange={(e) => this.handleChange(e)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={this.state.password}
              id="password"
              onChange={(e) => this.handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Form.Group className="mb-3">
            <Form.Text className="text-muted">
              Don't have an account?{" "}
            </Form.Text>
            <Link to="/register">
              <Button variant="secondary">Create an Account</Button>
            </Link>
          </Form.Group>
        </Form>
      </div>
    );
  }

  render() {
    return <div>{this.loginPopup()}</div>;
  }
}

export default LoginPage;
