/// <reference types="cypress" />

export {};
// https://stackoverflow.com/questions/57132428/augmentations-for-the-global-scope-can-only-be-directly-nested-in-external-modul

Cypress.Commands.add(
  "checkGridColumns",
  (dataCy: string, expectedColumns: number) => {
    cy.get(`[data-cy="${dataCy}"]`)
      .should("have.css", "grid-template-columns")
      .then((gridTemplateColumns) => {
        const columns: number = (
          gridTemplateColumns as unknown as string
        ).split(" ").length;
        expect(columns).to.equal(expectedColumns);
      });
  }
);

declare global {
  namespace Cypress {
    interface Chainable {
      checkGridColumns(
        dataCy: string,
        expectedColumns: number
      ): Chainable<void>;
    }
  }
}
