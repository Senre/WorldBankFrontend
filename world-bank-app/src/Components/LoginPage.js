import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInput: "",
      passwordInput: "",
    };
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
    const email = this.state.emailInput;
    const password = this.state.passwordInput;
    // const response = displayUser(email, password);
    // await this.props.setLogin(response);
    // for when we have a part that shows logged in people
    this.setState({ emailInput: "", passwordInput: "" });
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  loginPopup() {
    return (
      <div className="LoginPage">
        <Form className="form" onSubmit={(e) => this.handleSubmit(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => this.handleChange(e)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => this.handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Form.Group className="mb-3" controlId="formBasicButton">
            <Form.Text className="text-muted">Don't have an account?</Form.Text>
            <Button variant="secondary">Create an Account</Button>
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
