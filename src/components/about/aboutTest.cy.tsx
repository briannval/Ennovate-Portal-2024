import React from "react";
import About from "./about";

describe("<About />", () => {
  it("renders", () => {
    cy.mount(<About />);

    cy.get("h1").contains("About Us");

    cy.get("h2").contains("Why be a part of Ennovate?");
  });
});

describe("Responsive mobile", () => {
  beforeEach(() => {
    cy.viewport("iphone-se2");
    cy.mount(<About />);
  });

  it("photo should go under", () => {
    cy.get('[data-cy="about-grid"]').children().should("have.length", 2);
    cy.checkGridColumns("about-grid", 1);
  });
});

describe("Responsive desktop", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
    cy.mount(<About />);
  });

  it("photo should go beside", () => {
    cy.get('[data-cy="about-grid"]').children().should("have.length", 2);
    cy.checkGridColumns("about-grid", 2);
  });
});
