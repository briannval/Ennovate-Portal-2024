import React from "react";
import TeamMemberGrid from "./teamMemberGrid";
import { MockAuthProvider } from "../../../cypress/mocks/auth/auth";
import { ITeamMember } from "@/models/TeamMember";

describe("<TeamMemberGrid /> authenticated", () => {
  it("cta should exist outside grid last page", () => {
    cy.viewport("macbook-16");
    cy.fixture("components/teamMemberGrid").then((teamMemberGrid: ITeamMember[]) => {
      cy.mount(
        <MockAuthProvider isAuthenticated={true}>
          <TeamMemberGrid teamMembers={teamMemberGrid} isLastPage />
        </MockAuthProvider>
      );
    });
    cy.get('[data-cy="add-team-member-cta"]').should("exist");
    cy.get('[data-cy="team-member-grid"]').within(() => {
      cy.get('[data-cy="add-team-member-cta"]').should("not.exist");
    }); // exists outside grid
  });

  it("cta should not exist not last page", () => {
    cy.viewport("macbook-16");
    cy.fixture("components/teamMemberGrid").then((teamMemberGrid: ITeamMember[]) => {
      cy.mount(
        <MockAuthProvider isAuthenticated={true}>
          <TeamMemberGrid teamMembers={teamMemberGrid} isLastPage={false} />
        </MockAuthProvider>
      );
    });
    cy.get('[data-cy="add-team-member-cta"]').should("not.exist");
    cy.get('[data-cy="team-member-grid"]').within(() => {
      cy.get('[data-cy="add-team-member-cta"]').should("not.exist");
    }); // exists outside grid
  });

  it("cta should exist inside grid last page", () => {
    cy.viewport("macbook-16");
    cy.fixture("components/teamMemberGrid").then(
      (teamMemberGrid: ITeamMember[]) => {
        cy.mount(
          <MockAuthProvider isAuthenticated={true}>
            <TeamMemberGrid teamMembers={teamMemberGrid.slice(0, -1)} isLastPage />
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
  it("cta should not exist last page 11 members", () => {
    cy.viewport("macbook-16");
    cy.fixture("components/teamMemberGrid").then((teamMemberGrid: ITeamMember[]) => {
      cy.mount(
        <MockAuthProvider isAuthenticated={false}>
          <TeamMemberGrid teamMembers={teamMemberGrid.slice(0, -1)} isLastPage />
        </MockAuthProvider>
      );
    });
    cy.get('[data-cy="add-team-member-cta"]').should("not.exist");
  });

  it("cta should not exist last page 12 members", () => {
    cy.viewport("macbook-16");
    cy.fixture("components/teamMemberGrid").then((teamMemberGrid: ITeamMember[]) => {
      cy.mount(
        <MockAuthProvider isAuthenticated={false}>
          <TeamMemberGrid teamMembers={teamMemberGrid} isLastPage />
        </MockAuthProvider>
      );
    });
    cy.get('[data-cy="add-team-member-cta"]').should("not.exist");
  });

  it("cta not exist not last page", () => {
    cy.viewport("macbook-16");
    cy.fixture("components/teamMemberGrid").then((teamMemberGrid: ITeamMember[]) => {
      cy.mount(
        <MockAuthProvider isAuthenticated={false}>
          <TeamMemberGrid teamMembers={teamMemberGrid} isLastPage={false} />
        </MockAuthProvider>
      );
    });
    cy.get('[data-cy="add-team-member-cta"]').should("not.exist");
  });
});

describe("Responsiveness", () => {
  it("1 col base breakpoint", () => {
    cy.viewport("iphone-se2");
    cy.fixture("components/teamMemberGrid").then((teamMemberGrid: ITeamMember[]) => {
      cy.mount(
        <MockAuthProvider isAuthenticated={false}>
          <TeamMemberGrid teamMembers={teamMemberGrid} isLastPage />
        </MockAuthProvider>
      );
    });
    cy.get('[data-cy="team-member-grid"]').children().should("have.length", 12);
    cy.checkGridColumns("team-member-grid", 1);
  });
  it("2 col md breakpoint", () => {
    cy.viewport("ipad-mini");
    cy.fixture("components/teamMemberGrid").then((teamMemberGrid: ITeamMember[]) => {
      cy.mount(
        <MockAuthProvider isAuthenticated={false}>
          <TeamMemberGrid teamMembers={teamMemberGrid} isLastPage />
        </MockAuthProvider>
      );
    });
    cy.get('[data-cy="team-member-grid"]').children().should("have.length", 12);
    cy.checkGridColumns("team-member-grid", 2);
  });
  it("3 col lg breakpoint", () => {
    cy.viewport(1024, 800);
    cy.fixture("components/teamMemberGrid").then((teamMemberGrid: ITeamMember[]) => {
      cy.mount(
        <MockAuthProvider isAuthenticated={false}>
          <TeamMemberGrid teamMembers={teamMemberGrid} isLastPage />
        </MockAuthProvider>
      );
    });
    cy.get('[data-cy="team-member-grid"]').children().should("have.length", 12);
    cy.checkGridColumns("team-member-grid", 3);
  });
  it("4 col xl breakpoint", () => {
    cy.viewport("macbook-16");
    cy.fixture("components/teamMemberGrid").then((teamMemberGrid: ITeamMember[]) => {
      cy.mount(
        <MockAuthProvider isAuthenticated={false}>
          <TeamMemberGrid teamMembers={teamMemberGrid} isLastPage />
        </MockAuthProvider>
      );
    });
    cy.get('[data-cy="team-member-grid"]').children().should("have.length", 12);
    cy.checkGridColumns("team-member-grid", 4);
  });
});
