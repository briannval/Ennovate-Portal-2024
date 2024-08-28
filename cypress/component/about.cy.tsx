import About from "@/components/about";

describe("<AboutPage />", () => {
  it("should render and display expected content", () => {
    cy.mount(<About />);

    cy.get("h1").contains("About Us");
  });
});
