import React from "react";
import TeamMemberGrid from "./teamMemberGrid";
import { MockAuthProvider } from "../../../cypress/mocks/auth/auth";
import { ITeamMember } from "@/models/TeamMember";

describe("<TeamMemberGrid /> authenticated", () => {
  it("cta should exist outside grid", () => {
    cy.viewport("macbook-16");
    cy.fixture("components/teamMemberGrid").then((teamMemberGrid) => {
      cy.mount(
        <MockAuthProvider isAuthenticated={true}>
          <TeamMemberGrid teamMembers={teamMemberGrid} />
        </MockAuthProvider>
      );
    });
    cy.get('[data-cy="add-team-member-cta"]').should("exist");
    cy.get('[data-cy="team-member-grid"]').within(() => {
      cy.get('[data-cy="add-team-member-cta"]').should("not.exist");
    }); // exists outside grid
  });

  it("cta should exist inside grid", () => {
    cy.viewport("macbook-16");
    cy.fixture("components/teamMemberGrid").then(
      (teamMemberGrid: ITeamMember[]) => {
        cy.mount(
          <MockAuthProvider isAuthenticated={true}>
            <TeamMemberGrid teamMembers={teamMemberGrid.slice(0, -1)} />
          </MockAuthProvider>
        );
      }
    );
    cy.get('[data-cy="add-team-member-cta"]').should("exist");
    cy.get('[data-cy="team-member-grid"]').within(() => {
      cy.get('[data-cy="add-team-member-cta"]').should("exist");
    }); // exists inside grid
  });
});

describe("<TeamMemberGrid /> unauthenticated", () => {
  it("cta should not exist", () => {
    cy.viewport("macbook-16");
    cy.fixture("components/teamMemberGrid").then((teamMemberGrid) => {
      cy.mount(
        <MockAuthProvider isAuthenticated={false}>
          <TeamMemberGrid teamMembers={teamMemberGrid} />
        </MockAuthProvider>
      );
    });
    cy.get('[data-cy="add-team-member-cta"]').should("not.exist");
  });
});

describe("Responsiveness", () => {
  it("1 col base breakpoint", () => {
    cy.viewport("iphone-se2");
    cy.fixture("components/teamMemberGrid").then((teamMemberGrid) => {
      cy.mount(
        <MockAuthProvider isAuthenticated={false}>
          <TeamMemberGrid teamMembers={teamMemberGrid} />
        </MockAuthProvider>
      );
    });
    cy.get('[data-cy="team-member-grid"]')
      .should("have.css", "grid-template-columns", "311px")
      .children()
      .should("have.length", 12);
  });
  it("2 col md breakpoint", () => {
    cy.viewport("ipad-mini");
    cy.fixture("components/teamMemberGrid").then((teamMemberGrid) => {
      cy.mount(
        <MockAuthProvider isAuthenticated={false}>
          <TeamMemberGrid teamMembers={teamMemberGrid} />
        </MockAuthProvider>
      );
    });
    cy.get('[data-cy="team-member-grid"]')
      .should("have.css", "grid-template-columns", "352px 352px")
      .children()
      .should("have.length", 12);
  });
  it("3 col lg breakpoint", () => {
    cy.viewport(1024, 800);
    cy.fixture("components/teamMemberGrid").then((teamMemberGrid) => {
      cy.mount(
        <MockAuthProvider isAuthenticated={false}>
          <TeamMemberGrid teamMembers={teamMemberGrid} />
        </MockAuthProvider>
      );
    });
    cy.get('[data-cy="team-member-grid"]')
      .should("have.css", "grid-template-columns", "320px 320px 320px")
      .children()
      .should("have.length", 12);
  });
  it("4 col xl breakpoint", () => {
    cy.viewport("macbook-16");
    cy.fixture("components/teamMemberGrid").then((teamMemberGrid) => {
      cy.mount(
        <MockAuthProvider isAuthenticated={false}>
          <TeamMemberGrid teamMembers={teamMemberGrid} />
        </MockAuthProvider>
      );
    });
    cy.get('[data-cy="team-member-grid"]')
      .should("have.css", "grid-template-columns", "368px 368px 368px 368px")
      .children()
      .should("have.length", 12);
  });
});
