import React from "react";
// import { rest } from "msw";
// import { setupServer } from "msw/node";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
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

describe("Registration form should have corrects inputs", () => {
  it("Username placeholder", () => {
    const emailInput = screen.getByLabelText("Username");
    expect(emailInput).toHaveDisplayValue(/Enter username here/i);
  });

  it("Password placeholder", () => {
    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toHaveDisplayValue(/Enter password here/i);
  });

  it("Confirm password holder", () => {
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    expect(confirmPasswordInput).toHaveDisplayValue(/Enter password again/i);
  });

  it("Checkbox should be unchecked on load", () => {
    const checkboxUnchecked = screen.getByTestId("register-checkbox-unchecked");
    expect(checkboxUnchecked).not.toBeChecked();
  });
});

// test("Loads and displays register", async () => {
//   render(<Register logIn={(username) => this.logIn(username)} />);
//   fireEvent.click(screen.getByText("Load Greeting"));
//   await waitFor(() => screen.getByRole("heading")); // check error
//   expect(screen.getByRole("alert")).toHaveTextContent("Oops, failed to fetch!");
//   expect(screen.getByRole("button")).not.toBeDisabled();
// });
