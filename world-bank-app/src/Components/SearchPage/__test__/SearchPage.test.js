import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchPage from "../SearchPage";

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

describe("Search page form should include all elements", () => {
  test("Country search page form element must load", () => {
    act(() => {
      render(
        <Router>
          <SearchPage />
        </Router>,
        container
      );
    });
    const countryInput = screen.getByPlaceholderText("Enter country here..");
    expect(countryInput).toBeInTheDocument();
  });
  test("Password form element must load", () => {
    render(
      <Router>
        <SearchPage />
      </Router>
    );
    const usernameForm = screen.getByPlaceholderText("Password");
    expect(usernameForm).toBeInTheDocument();
  });

  test("Submit button must load", () => {
    render(
      <Router>
        <SearchPage />
      </Router>
    );
    const registerButton = screen.getByTestId("submit-button");
    expect(registerButton).toBeInTheDocument();
  });
  test("Add another country button must load", () => {
    render(
      <Router>
        <SearchPage />
      </Router>
    );
    const loginButton = screen.getByTestId("add-country-button");
    expect(loginButton).toBeInTheDocument();
  });
});

describe("Country search form should have corrects inputs", () => {
  test("Country search placeholder should not be filled", () => {
    render(
      <Router>
        <SearchPage />
      </Router>
    );
    const usernameInput = screen.getByPlaceholderText("Enter username");
    expect(usernameInput).toHaveDisplayValue("");
  });

  test("Password placeholder should not be filled", () => {
    render(
      <Router>
        <SearchPage />
      </Router>
    );
    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toHaveDisplayValue("");
  });
});

// describe("Country search form input fields must all be required and load properly", () => {
//   test("First country field must be required", () => {
//     render(
//       <Router>
//         <SearchPage />
//       </Router>
//     );
//     const countryInput = screen.getByTestId("username-control");
//     expect(countryInput).toBeRequired();
//   });

//   test("Indicator field must be required", () => {
//     render(
//       <Router>
//         <SearchPage />
//       </Router>
//     );
//     const indicatorInput = screen.getByTestId("password-control");
//     expect(indicatorInput).toBeRequired();
//   });
// });
