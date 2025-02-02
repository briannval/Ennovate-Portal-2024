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

    cy.get('a[href*="resources"]').first().click();

    cy.url().should("include", "/resources");
  });
});

describe("Navigation on base viewport", () => {
  beforeEach(() => {
    cy.viewport("iphone-se2");
  });

  it("should navigate to appropriate pages", () => {
    cy.visit("/");

    cy.get('[data-cy="toggle-navbar-menu"]').click();

    cy.get('a[href*="team"]').click();

    cy.url().should("include", "/team");

    cy.get('[data-cy="toggle-navbar-menu"]').click();

    cy.get('a[href*="comp"]').click();

    cy.url().should("include", "/comp");

    cy.get('[data-cy="toggle-navbar-menu"]').click();

    cy.get('a[href*="resources"]').first().click();

    cy.url().should("include", "/resources");
  });
});
