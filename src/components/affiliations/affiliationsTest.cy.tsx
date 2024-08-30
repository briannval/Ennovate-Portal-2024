import React from "react";
import Affiliations from "./affiliations";

describe("<Affiliations />", () => {
  it("renders", () => {
    cy.mount(<Affiliations />);

    cy.get("h1").contains("Affiliations & Sponsors");

    cy.get("h2").contains("Who we work with.");
  });
});
