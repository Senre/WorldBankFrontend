import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import invalidChars from "../invalidChars";
import Alert from "react-bootstrap/Alert";
import { Switch, Link } from "react-router-dom";
import Network from "./Network";

const network = new Network();

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameInput: "",
      passwordInput: "",
      confirmPasswordInput: "",
      passwordMatch: false,
      invalidChars: invalidChars,
      validRegister: true,
      success: false,
      error: false,
    };

    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleConfirmPasswordInput =
      this.handleConfirmPasswordInput.bind(this);
  }
  async registerUser(username, password) {
    try {
      const response = await network.registerUser(username, password);
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

  isUsernameValid(username) {
    if (username.includes(this.state.invalidChars)) {
      return false;
    } else if (!username) {
      return false;
    } else {
      return true;
    }
  }

  isPasswordValid(password) {
    if (password.length > 25) {
      return false;
    } else if (!password) {
      return false;
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
      this.isUsernameValid(this.state.usernameInput) &&
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

  handleUsernameInput(e) {
    this.setState({ usernameInput: e.target.value });
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
      this.registerUser(this.state.usernameInput, this.state.passwordInput);
      this.setState({ validRegister: true });
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
            required
            value={this.state.usernameInput}
            onChange={(e) => this.handleUsernameInput(e)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        {this.isUsernameValid(this.state.usernameInput)
          ? this.getPass("username")
          : this.getWarning("username")}

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            minlength="8"
            maxLength="20"
            required
            value={this.state.passwordInput}
            onChange={(e) => this.handlePasswordInput(e)}
          />
          <Form.Text id="passwordHelpBlock" muted>
            Your password must be 8-20 characters long, contain letters and
            numbers, and must not contain spaces, special characters, or emoji.
          </Form.Text>
        </Form.Group>

        {this.isPasswordValid(this.state.passwordInput)
          ? this.getPass("password")
          : this.getWarning("password")}

        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            minLength="8"
            required
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
            Oops! Something went wrong. "{this.state.error}".
          </div>
        ) : null}
      </div>
    );
  }
}

export default Register;
