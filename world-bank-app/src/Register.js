import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import invalidChars from "./invalidChars";
import Alert from "react-bootstrap/Alert";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInput: "",
      passwordInput: "",
      confirmPasswordInput: "",
      passwordMatch: false,
      invalidChars: invalidChars,
    };

    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleConfirmPasswordInput =
      this.handleConfirmPasswordInput.bind(this);
    this.handleSubmit = this.handleSubmit(this);
  }

  isEmailValid(email) {
    if (email.includes(this.state.invalidChars)) {
      return false;
    } else if (email.length > 30) {
      return false;
    } else if (!email) {
      return true;
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
    if (password !== confirmedPassword) {
      return false;
    } else {
      return true;
    }
  }

  getWarning(input) {
    return <Alert variant="danger">This {input} is not valid.</Alert>;
  }

  getPass(input) {
    return <Alert variant="success">This {input} is valid.</Alert>;
  }

  handleEmailInput(e) {
    this.setState({ usernameInput: e.target.value });
  }

  handlePasswordInput(e) {
    this.setState({ passwordInput: e.target.value });
  }

  handleConfirmPasswordInput(e) {
    this.setState({ confirmPasswordInput: e.target.value });
  }

  handleSubmit(e) {
    this.props.registerUser(this.state.emailInput, this.state.passwordInput);
  }

  // callback prop to log user in
  // check
  handleLogIn() {
    this.props.logIn(this.state.usernameInput);
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
            type="confirm-password"
            placeholder="Password"
            value={this.state.confirmPasswordInput}
            onChange={(e) => this.handleConfirmPasswordInput(e)}
          />
        </Form.Group>

        {this.doPasswordsMatch(
          this.state.passwordInput,
          this.state.confirmPasswordInput
        ) ? (
          <Alert variant="success">Passwords </Alert>
        ) : (
          <Alert variant="danger"> Passwords do not match</Alert>
        )}

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="By clicking register below, you agree to the Terms and Conditions."
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onChange={(e) => this.handleSubmit(e)}
        >
          Register
        </Button>
      </Form>
    );
  }

  getLogin() {
    return <div></div>;
  }

  redirect() {}

  render() {
    return (
      <div>
        {this.getRegister()}
        <div></div>
      </div>
    );
  }
}
