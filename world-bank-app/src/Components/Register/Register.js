import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import invalidChars from "../../invalidChars";
import { Link } from "react-router-dom";
import Network from "../Network";
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from "prop-types";

const network = new Network();

class Register extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      usernameInput: "",
      passwordInput: "",
      confirmPasswordInput: "",
      passwordMatch: false,
      invalidChars: invalidChars,
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
      const json = await network.registerUser(username, password);
      console.log(json);
      if (json.status === 200) {
        this.handleLogIn();
        this.setState({ success: true });
      } else if (json.status >= 400 && json.status < 600) {
        throw new Error("Bad response from server.");
      } else {
        this.setState({ success: false, error: json.error });
      }
    } catch (e) {
      this.setState({ success: false, error: e.toString() });
    }
  }

  isUsernameValid(username) {
    if (username.includes(this.state.invalidChars) || username.length < 8) {
      return false;
    } else {
      return true;
    }
  }

  isPasswordValid(password) {
    if (password.length < 8 || password.length > 25) {
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
    }
  }

  handleLogIn() {
    this.props.logIn(this.state.usernameInput);
  }

  getRegister() {
    return (
      <div>
        <div className="spacing" id="login">
          <h1>Register</h1>
        </div>
      <div className="spacing">
        <div className="registerPage">
          <Form noValidate onSubmit={(e) => this.handleSubmit(e)}>
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label className="username-label">Username</Form.Label>
              <Form.Control
                isInvalid={
                  !this.isUsernameValid(this.state.usernameInput) &&
                  this.state.usernameInput
                }
                data-testid="username-control"
                type="text"
                placeholder="Enter username"
                minLength="8"
                maxLength="20"
                required
                value={this.state.usernameInput}
                onChange={(e) => this.handleUsernameInput(e)}
              />
              <Form.Text className="text-muted">
                We'll never share your details with anyone else. <br />
                Your username must be 8-20 characters long, contain letters and
                numbers, and must not contain special characters.
              </Form.Text>
            </Form.Group>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

            <Form.Group className="mb-3" controlId="validationCustom02">
              <Form.Label className="password-label">Password</Form.Label>
              <Form.Control
                isInvalid={
                  !this.isPasswordValid(this.state.passwordInput) &&
                  this.state.passwordInput
                }
                data-testid="password-control"
                type="password"
                placeholder="Enter password"
                minLength="8"
                maxLength="20"
                required
                value={this.state.passwordInput}
                onChange={(e) => this.handlePasswordInput(e)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Text id="passwordHelpBlock" muted>
                Your password must be 8-20 characters long, contain letters and
                numbers, and must not contain spaces, special characters, or
                emoji.
              </Form.Text>
            </Form.Group>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

            <Form.Group className="mb-3" controlId="validationCustom03">
              <Form.Label className="password-label">
                Confirm Password
              </Form.Label>
              <Form.Control
                isInvalid={
                  !this.doPasswordsMatch(
                    this.state.passwordInput,
                    this.state.confirmPasswordInput
                  ) &&
                  this.state.passwordInput &&
                  this.state.confirmPasswordInput
                }
                data-testid="confirm-password-control"
                type="password"
                placeholder="Confirm password"
                minLength="8"
                maxLength="20"
                required
                value={this.state.confirmPasswordInput}
                onChange={(e) => this.handleConfirmPasswordInput(e)}
              />
            </Form.Group>

            <Form.Group
              data-testid="register-checkbox-unchecked"
              className="mb-3"
            >
              <Form.Check
                required
                label="By ticking this box, you agree that you have read the Terms and Conditions."
                feedback="You must agree before submitting."
                feedbackType="invalid"
              />
            </Form.Group>
            <Button
              data-testid="register-button"
              variant="primary"
              type="submit"
            >
              Register
            </Button>
            <Form.Group className="mb-3" controlId="formBasicButton">
              <Form.Text className="text">Already have an account? </Form.Text>
              <Link to="/login">
                <Button data-testid="login-button" variant="secondary">
                  Login
                </Button>
              </Link>
            </Form.Group>
          </Form>
        </div>
      </div>
              </div>
    );
  }

  render() {
    return (
      <div>
        {this.getRegister()}
        {this.state.error ? (
          <div class="alert alert-danger" role="alert">
            Oops! Something went wrong. {this.state.error}.
          </div>
        ) : null}
      </div>
    );
  }
}

export default withCookies(Register);
