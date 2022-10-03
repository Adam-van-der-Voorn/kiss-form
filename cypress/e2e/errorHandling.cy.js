/// <reference types="Cypress" />

describe('basic', () => {
    it('does not allow the user to submit if validation has failed', () => {
        const intendedInput = {
            name: 'john doe',
            age: '32'
        };
        cy.visit('/');

        cy.log('missing required input');
        cy.get('input[name=age]')
            .type(intendedInput.age);
        cy.get('input[type=submit]')
            .click();
        cy.get('#submitted-data')
            .innerHTMLEqualsObj(null);

        cy.log('inputting required input');
        cy.get('input[name=name]')
            .type(intendedInput.name);
        cy.get('input[type=submit]')
            .click();
        cy.get('#submitted-data')
            .innerHTMLEqualsObj(intendedInput);
    });
    it('displays the appropriate error message', () => {
        cy.visit('/');

        cy.get('input[type=submit]')
            .click();

        cy.get('[data-cy=name-err]')
            .should('not.have.text', '');
 
    });
});
