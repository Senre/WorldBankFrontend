import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginPage from "../LoginPage";

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

describe("Login page form should include all elements", () => {
  test("Username form element must load", () => {
    act(() => {
      render(
        <Router>
          <LoginPage />
        </Router>,
        container
      );
    });
    const usernameInput = screen.getByPlaceholderText("Enter username");
    expect(usernameInput).toBeInTheDocument();
  });
  test("Password form element must load", () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );
    const usernameForm = screen.getByPlaceholderText("Password");
    expect(usernameForm).toBeInTheDocument();
  });

  test("Register button must load", () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );
    const registerButton = screen.getByTestId("register-button");
    expect(registerButton).toBeInTheDocument();
  });
  test("Login button must load", () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );
    const loginButton = screen.getByTestId("login-button");
    expect(loginButton).toBeInTheDocument();
  });
});

describe("Login form should have corrects inputs", () => {
  test("Username placeholder", () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );
    const usernameInput = screen.getByPlaceholderText("Enter username");
    expect(usernameInput).toHaveDisplayValue("");
  });

  test("Password placeholder should be filled", () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );
    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toHaveDisplayValue("");
  });
});

describe("Login form input fields must all be required and load properly", () => {
  test("Username field must be required", () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );
    const usernameInput = screen.getByTestId("username-control");
    expect(usernameInput).toBeRequired();
  });

  test("Password field must be required", () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );
    const usernameInput = screen.getByTestId("password-control");
    expect(usernameInput).toBeRequired();
  });
});
