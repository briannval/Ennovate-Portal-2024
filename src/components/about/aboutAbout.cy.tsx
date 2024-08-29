import React from "react";
import About from "./about";

describe("<About />", () => {
  it("renders", () => {
    cy.mount(<About />);

    cy.get("h1").contains("About Us");

    cy.get("h2").contains("Why be a part of Ennovate?");
  });
});
