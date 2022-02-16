import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import invalidChars from "../invalidChars";
import Alert from "react-bootstrap/Alert";
import { Switch, Link } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInput: "",
      passwordInput: "",
      confirmPasswordInput: "",
      passwordMatch: false,
      invalidChars: invalidChars,
      validRegister: true,
      success: false,
      error: false,
    };

    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleConfirmPasswordInput =
      this.handleConfirmPasswordInput.bind(this);
  }

  async registerUser(email, password) {
    const endpoint = "http://localhost:8080/register";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      if (response.status === 200) {
        this.handleLogIn();
        this.redirect();
      } else if (response.status >= 400 && response.status < 600) {
        throw new Error("Bad response from server.");
      } else {
        this.setState({ success: false, error: response.error });
      }
    } catch (e) {
      this.setState({ success: false, error: e.toString() });
    }
  }

  isEmailValid(email) {
    if (email.includes(this.state.invalidChars)) {
      return false;
    } else if (email.length > 30) {
      return false;
    } else if (!email) {
      return false;
    } else {
      return true;
    }
  }

  isPasswordValid(password) {
    if (password.length < 8) {
      return false;
    } else if (password.length > 25) {
      return false;
    } else if (!password) {
      return true;
    } else {
      return true;
    }
  }

  doPasswordsMatch(password, confirmedPassword) {
    if (password === confirmedPassword) {
      return true;
    } else {
      return false;
    }
  }

  isAccountValid() {
    if (
      this.isEmailValid(this.state.emailInput) &&
      this.isPasswordValid(this.state.passwordInput) &&
      this.doPasswordsMatch(
        this.state.passwordInput,
        this.state.confirmPasswordInput
      )
    ) {
      return true;
    } else {
      return false;
    }
  }

  getWarning(input) {
    return <Alert variant="danger">This {input} is not valid.</Alert>;
  }

  getPass(input) {
    return <Alert variant="success">This {input} is valid.</Alert>;
  }

  handleEmailInput(e) {
    this.setState({ emailInput: e.target.value });
  }

  handlePasswordInput(e) {
    this.setState({ passwordInput: e.target.value });
  }

  handleConfirmPasswordInput(e) {
    this.setState({ confirmPasswordInput: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.isAccountValid) {
      this.registerUser(this.state.emailInput, this.state.passwordInput);
    } else {
      this.setState({ validRegister: false });
    }
  }

  handleLogIn() {
    this.props.logIn(this.state.emailInput);
  }

  redirect() {
    <Switch></Switch>;
  }

  getRegister() {
    return (
      <Form onSubmit={(e) => this.handleSubmit(e)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={this.state.emailInput}
            onChange={(e) => this.handleEmailInput(e)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        {this.isEmailValid(this.state.emailInput)
          ? this.getPass("email")
          : this.getWarning("email")}

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={this.state.passwordInput}
            onChange={(e) => this.handlePasswordInput(e)}
          />
        </Form.Group>

        {this.isPasswordValid(this.state.passwordInput)
          ? this.getPass("password")
          : this.getWarning("password")}

        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={this.state.confirmPasswordInput}
            onChange={(e) => this.handleConfirmPasswordInput(e)}
          />
        </Form.Group>

        {this.doPasswordsMatch(
          this.state.passwordInput,
          this.state.confirmPasswordInput
        ) ? (
          <Alert variant="success">Passwords match!</Alert>
        ) : (
          <Alert variant="danger"> Passwords do not match.</Alert>
        )}

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="By ticking this box, you agree that you have read the Terms and Conditions."
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
        <Form.Group className="mb-3" controlId="formBasicButton">
          <Form.Text className="text">Already have an account? </Form.Text>
          <Link to="/login">
            <Button variant="secondary">Login</Button>
          </Link>
        </Form.Group>
      </Form>
    );
  }

  render() {
    return (
      <div>
        {this.getRegister()}
        {this.state.validRegister ? null : this.getWarning("account")}
        {this.state.error ? (
          <div class="alert alert-danger" role="alert">
            Oops! Something went wrong. Error: "{this.state.error}".
          </div>
        ) : null}
      </div>
    );
  }
}

export default Register;
