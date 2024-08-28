describe("Navigation on lg viewport", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
  });

  it("should navigate to appropriate pages", () => {
    cy.visit("/");

    cy.get('a[href*="team"]').click();

    cy.url().should("include", "/team");

    cy.get('a[href*="comp"]').click();

    cy.url().should("include", "/comp");

    cy.get('a[href*="resources"]').click();

    cy.url().should("include", "/resources");
  });
});
