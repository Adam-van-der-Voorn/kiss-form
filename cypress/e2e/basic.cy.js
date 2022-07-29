/// <reference types="Cypress" />

describe('basic', () => {
  it('types and submits', () => {
    const expected = {
      name: "john doe",
      age: "32"
    };
    cy.visit('/');
    cy.get('input[name=name]')
      .type(expected.name);
    cy.get('input[name=age]')
      .type(expected.age);
    cy.get('input[type=submit]')
      .click();
    cy.get('#submitted-data')
      .innerHTMLEqualsObj(expected);
  });
  it('updates state as it types', () => {
    const expected = {
      name: "john doe",
    };
    cy.visit('/');
    cy.get('input[name=name]')
      .type(expected.name);
    cy.get('#form-state')
      .innerHTMLEqualsObj(expected);
  });
  it('types and submits nested input', () => {
    const expected = {
      email: {
        work: "123",
        personal: "456",
      }
    };
    cy.visit('/');
    cy.get('input[name="email.work"]')
      .type(expected.email.work);
    cy.get('input[name="email.personal"]')
      .type(expected.email.personal);
    cy.get('input[type=submit]')
      .click();
    cy.get('#submitted-data')
      .innerHTMLEqualsObj(expected);
  });
});