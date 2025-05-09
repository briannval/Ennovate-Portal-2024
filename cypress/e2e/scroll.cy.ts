describe("Should scroll to top", () => {
    it("Scroll to top", () => {
        cy.visit("/");

        cy.scrollTo("bottom");

        cy.contains("BACK TO THE TOP").click();

        cy.wait(500);
        
        cy.window().its("scrollY").should("equal", 0);
    })
})