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
import Register from "../Register";

// const server = setupServer(
//   rest.get("/greeting", (req, res, ctx) => {
//     return res(ctx.json({ greeting: "hello there" }));
//   })
// );

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

// try cleanup to stop re-render every test run

describe("Registration form should include all elements", () => {
  render(
    <Router>
      <Register />
    </Router>
  );
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

// test("Loads and displays register", async () => {
//   render(<Register logIn={(username) => this.logIn(username)} />);
//   fireEvent.click(screen.getByText(""));
//   await waitFor(() => screen.getByRole("")); // check error
//   expect(screen.getByRole("alert")).toHaveTextContent("Oops");
//   expect(screen.getByRole("button")).not.toBeDisabled();
// });
