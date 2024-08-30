import React from "react";
import TeamMember from "./teamMember";
import { MockAuthProvider } from "../../../cypress/mocks/auth/auth";

describe("<TeamMember /> authenticated", () => {
  beforeEach(() => {
    cy.fixture("components/teamMember").then((teamMember) => {
      cy.mount(
        <MockAuthProvider isAuthenticated>
          <TeamMember teamMember={teamMember} />
        </MockAuthProvider>
      );
    });
  });

  it("should have delete and update button", () => {
    cy.get('[data-cy="delete-button"]').should("exist");
    cy.get('[data-cy="update-button"]').should("exist");
  });

  it("opening and closing delete modal cancel button", () => {
    cy.get('[data-cy="delete-button"]').click();
    cy.get('[data-cy="delete-modal"]').should("exist").and("be.visible");
    cy.get('[data-cy="cancel-delete-button"]').click();
    cy.get('[data-cy="delete-modal"]').should("not.exist");
  });

  it("opening and closing delete modal x button", () => {
    cy.get('[data-cy="delete-button"]').click();
    cy.get('[data-cy="delete-modal"]').should("exist").and("be.visible");
    cy.get('[data-cy="close-modal-button"]').click();
    cy.get('[data-cy="delete-modal"]').should("not.exist");
  });
});

describe("<TeamMember /> unauthenticated", () => {
  beforeEach(() => {
    cy.fixture("components/teamMember").then((teamMember) => {
      cy.mount(
        <MockAuthProvider isAuthenticated={false}>
          <TeamMember teamMember={teamMember} />
        </MockAuthProvider>
      );
    });
  });

  it("should not have delete and update button", () => {
    cy.get('[data-cy="delete-button"]').should("not.exist");
    cy.get('[data-cy="update-button"]').should("not.exist");
  });
});
