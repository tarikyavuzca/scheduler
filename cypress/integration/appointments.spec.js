describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });

  it("Should book an interview", () => {
    cy.get("[alt=Add]").first().click();

    cy.get("[data-testid=student-name-input]").type("Yavuz Tarik Dengiz");
    cy.get("[alt='Sylvia Palmer']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Yavuz Tarik Dengiz");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("Should edit an interview", () => {
    cy.get("[alt=Edit]").first().click({ force: true });

    cy.get("[data-testid=student-name-input]").clear().type("YTD");

    cy.get("[alt='Sylvia Palmer']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "YTD");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should cancel an interview", () => {
    cy.get("[alt='Delete']").first().click({ force: true });
    cy.contains(/Confirm/i).click();
    cy.contains(/Deleting/i).should("not.exist");
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
