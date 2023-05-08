import "@4tw/cypress-drag-drop";

describe("Constructor is available", () => {
  beforeEach(function () {
    cy.visit("/");
  });

  it("should show ingredient modal window", function () {
    cy.get('[data-ingredient="ingredient"]').first().click();

    cy.get('[id="modal"]').as("modal");

    cy.get("@modal").contains("Детали ингредиента");
    cy.get("@modal").find('[id="modal-close"]').click();
  });

  it("should add new ingredient to constructor with dnd", function () {
    cy.get('[data-ingredient="ingredient"]').as("ingredients");
    cy.get('[id="drop-top"]').as("constructor-top");
    cy.get('[id="drop-center"]').as("constructor-center");
    cy.get('[id="drop-bottom"]').as("constructor-bottom");

    cy.get("@ingredients").eq(0).drag("@constructor-top");
    cy.get("@ingredients").eq(2).drag("@constructor-center");
    cy.get("@ingredients").eq(5).drag("@constructor-center");
    cy.get("@ingredients").eq(1).drag("@constructor-bottom");
  });

  it("should create a new order", function () {
    cy.get('[data-ingredient="ingredient"]').as("ingredients");
    cy.get('[id="drop-top"]').as("constructor-top");
    cy.get('[id="drop-center"]').as("constructor-center");
    cy.get('[id="drop-bottom"]').as("constructor-bottom");
    cy.get('[id="checkout"]').as("checkout");

    cy.get("@ingredients").eq(0).drag("@constructor-top");
    cy.get("@ingredients").eq(2).drag("@constructor-center");
    cy.get("@ingredients").eq(5).drag("@constructor-center");
    cy.get("@ingredients").eq(1).drag("@constructor-bottom");

    cy.get("@checkout").click();

    cy.get('[name="email"]').as("email");
    cy.get('[name="password"]').as("password");
    cy.get('[id="button-login"]').as("login");

    cy.get("@email").type("sadigzade.hi@mail.ru");
    cy.get("@password").type("12345678");

    cy.get("@login").click();
    cy.get("@checkout").click();

    cy.get('[id="modal"]').as("modal");

    cy.wait(16000).get("@modal").find('[id="modal-close"]').click();
  });
});
