import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
// import { rest } from "msw";
// import { setupServer } from "msw/node";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginPage from "../LoginPage";

describe("Login form should have corrects inputs", () => {
  test("Username placeholder", () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );
    const usernameInput = screen.getByLabelText("Username");
    expect(usernameInput).toHaveDisplayValue("");
  });

  test("Password placeholder should be filled", () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );
    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toHaveDisplayValue("");
  });
});
