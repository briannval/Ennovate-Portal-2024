describe("Team user view", () => {
    beforeEach(() => {
        cy.viewport("macbook-16");


        cy.intercept("POST", "/api/team/paginate", {
            body: null
        })

        cy.visit("/team");
    })
})