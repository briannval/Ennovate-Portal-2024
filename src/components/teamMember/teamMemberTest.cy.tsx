import React from "react";
import TeamMember from "./teamMember";
import { MockAuthProvider } from "../../../cypress/mocks/auth/auth";

describe("<TeamMember />", () => {
  it("renders", () => {
    cy.fixture("components/teamMember").then((teamMember) => {
      cy.mount(
        <MockAuthProvider isAuthenticated>
          <TeamMember teamMember={teamMember} />
        </MockAuthProvider>
      );
    });
  });

  it("renders unauthenticated", () => {
    cy.fixture("components/teamMember").then((teamMember) => {
      cy.mount(
        <MockAuthProvider isAuthenticated={false}>
          <TeamMember teamMember={teamMember} />
        </MockAuthProvider>
      );
    });
  });
});
