import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Register from "../Register";
import { act } from "react-dom/test-utils";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("Registration form should include all elements", () => {
  test("Username form element must load", () => {
    act(() => {
      render(
        <Router>
          <Register />
        </Router>,
        container
      );
    });
    const usernameForm = screen.getByPlaceholderText("Enter email");
    expect(usernameForm).toBeInTheDocument();
  });
  test("Password form element must load", () => {
    render(
      <Router>
        <Register />
      </Router>
    );
    const usernameForm = screen.getByPlaceholderText("Enter password");
    expect(usernameForm).toBeInTheDocument();
  });
  test("Confirm password form element must load", () => {
    render(
      <Router>
        <Register />
      </Router>
    );
    const usernameForm = screen.getByPlaceholderText("Confirm password");
    expect(usernameForm).toBeInTheDocument();
  });
  test("Register button must load", () => {
    render(
      <Router>
        <Register />
      </Router>
    );
    const registerButton = screen.getByTestId("register-button");
    expect(registerButton).toBeInTheDocument();
  });
  test("Login button must load", () => {
    render(
      <Router>
        <Register />
      </Router>
    );
    const loginButton = screen.getByTestId("login-button");
    expect(loginButton).toBeInTheDocument();
  });
});

describe("Registration form should have corrects inputs", () => {
  test("Username placeholder", () => {
    render(
      <Router>
        <Register />
      </Router>
    );
    const usernameInput = screen.getByLabelText("Email address");
    expect(usernameInput).toHaveDisplayValue("");
  });

  test("Password placeholder should be filled", () => {
    render(
      <Router>
        <Register />
      </Router>
    );
    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toHaveDisplayValue("");
  });

  test("Confirm password placeholder should be filled", () => {
    render(
      <Router>
        <Register />
      </Router>
    );
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    expect(confirmPasswordInput).toHaveDisplayValue("");
  });

  test("Checkbox should be unchecked on load", () => {
    render(
      <Router>
        <Register />
      </Router>
    );
    const checkboxUnchecked = screen.getByTestId("register-checkbox-unchecked");
    expect(checkboxUnchecked).not.toBeChecked();
  });
});

describe("Form input fields must all be required", () => {
  test("Username field must be required", () => {
    render(
      <Router>
        <Register />
      </Router>
    );
    const usernameInput = screen.getByTestId("username-control");
    expect(usernameInput).toBeRequired();
  });

  test("Password field must be required", () => {
    render(
      <Router>
        <Register />
      </Router>
    );
    const usernameInput = screen.getByTestId("password-control");
    expect(usernameInput).toBeRequired();
  });

  test("Confirm password field must be required", () => {
    render(
      <Router>
        <Register />
      </Router>
    );
    const usernameInput = screen.getByTestId("confirm-password-control");
    expect(usernameInput).toBeRequired();
  });
});

// describe("Buttons must be firing correctly", () => {
//   test("Register button handleSubmit must fire", () => {
//     handleSubmit = jest.fn();
//     act(() => {
//       render(
//         <Router>
//           <Register />
//         </Router>,
//         container
//       );
//     });

//     const registerButton = document.querySelector(
//       "[data-testid=register-button]"
//     );
//     expect(registerButton.innerHTML).toBe("Register");

//     expect(handleSubmit).toHaveBeenCalledTimes(1);
//   });

//   test("Log in button handleSubmit must fire", () => {
//     act(() => {
//       render(
//         <Router>
//           <Register />
//         </Router>,
//         container
//       );
//     });
//   });
// });
