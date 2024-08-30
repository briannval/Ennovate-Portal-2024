import React from "react";
import Navbar from "./navbar";
import { MockAuthProvider } from "../../../cypress/mocks/auth/auth";

describe("<Navbar />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    /*
    cy.mount(
      <MockAuthProvider isAuthenticated>
        <Navbar />
      </MockAuthProvider>
    );
    */
  });

  it("renders unauthenticated", () => {
    // see: https://on.cypress.io/mounting-react
    /*
    cy.mount(
      <MockAuthProvider isAuthenticated={false}>
        <Navbar />
      </MockAuthProvider>
    );
    */
  });
});
