import React from "react";
import NoTeam from "./noTeam";

describe("<NoTeam />", () => {
  it("renders", () => {
    cy.mount(<NoTeam />);

    cy.get("h1").contains("No team members found.");
  });
});
