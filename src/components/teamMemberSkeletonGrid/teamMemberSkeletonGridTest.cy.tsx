import React from "react";
import TeamMemberSkeletonGrid from "./teamMemberSkeletonGrid";

describe("<TeamMemberSkeletonGrid />", () => {
  it("has 12 children", () => {
    cy.mount(<TeamMemberSkeletonGrid />);

    cy.get('[data-cy="team-member-skeleton-grid"]')
      .children()
      .should("have.length", 12);
  });
});

describe("Responsiveness", () => {
  it("1 col base breakpoint", () => {
    cy.viewport("iphone-se2");
    cy.mount(<TeamMemberSkeletonGrid />);
    cy.checkGridColumns("team-member-skeleton-grid", 1);
  });
  it("2 col md breakpoint", () => {
    cy.viewport("ipad-mini");
    cy.mount(<TeamMemberSkeletonGrid />);
    cy.checkGridColumns("team-member-skeleton-grid", 2);
  });
  it("3 col lg breakpoint", () => {
    cy.viewport(1024, 800);
    cy.mount(<TeamMemberSkeletonGrid />);
    cy.checkGridColumns("team-member-skeleton-grid", 3);
  });
  it("4 col xl breakpoint", () => {
    cy.viewport("macbook-16");
    cy.mount(<TeamMemberSkeletonGrid />);
    cy.checkGridColumns("team-member-skeleton-grid", 4);
  });
});
