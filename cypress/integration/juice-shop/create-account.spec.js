/// <reference types="cypress" />

describe("Test registration and login via Juice-Shop", () => {
  beforeEach(() => {
    cy.visit("https://juice-shop-online-store.herokuapp.com/");
    cy.get(".close-dialog").click();
    cy.get(".cc-btn").click();
    cy.get("#navbarAccount").click();
    cy.get("#navbarLoginButton").click();
  });
  it("Acces registration route and create a new account", () => {
    cy.get("#newCustomerLink a").click();
    cy.get("#emailControl").type("bgd2@email.ro");
    cy.get("#passwordControl").type("aaaaaa");
    cy.get("#repeatPasswordControl").type("aaaaaa");
    cy.get("#mat-select-2").click();
    cy.get("#mat-option-4 > .mat-option-text").click();
    cy.get("[data-placeholder='Answer to your security question']").type(
      "magdi"
    );
    cy.get("#registerButton > .mat-button-wrapper").click();
    cy.get(".mat-simple-snack-bar-content").should(
      "contain",
      "Registration completed"
    );
  });
  it("Test Login user into account", () => {
    cy.get("#email").type("bgd2@email.ro");
    cy.get("#password").type("aaaaaa");
    cy.get("#loginButton").click();
    cy.get(".mat-toolbar-row > .mat-focus-indicator.ng-star-inserted").should(
      "contain",
      "Your Basket"
    );
  });
});

describe.only("Login via API (non-UI)", () => {
  const userCredentials = { email: "bgd2@email.ro", password: "aaaaaa" };
  it("Login via API ", () => {
    cy.request(
      "POST",
      "https://juice-shop-online-store.herokuapp.com/rest/user/login",
      userCredentials
    );
  });
  it("Login via Token (non-UI)", () => {
    cy.request(
      "POST",
      "https://juice-shop-online-store.herokuapp.com/rest/user/login",
      userCredentials
    ).then((body) => {
      const token = body.body.authentication.token;
      cy.wrap(token).as("userToken");
      cy.visit("https://juice-shop-online-store.herokuapp.com", {
        onBeforeLoad: (window) => {
          window.localStorage.setItem("token", token);
        },
      });
      cy.get(".mat-toolbar-row > .mat-focus-indicator.ng-star-inserted").should(
        "contain",
        "Your Basket"
      );
    });
  });
});
