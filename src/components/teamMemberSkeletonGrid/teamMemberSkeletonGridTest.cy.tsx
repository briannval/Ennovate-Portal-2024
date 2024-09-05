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
