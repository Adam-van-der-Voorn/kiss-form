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
    it('validates on input blur, and displays the appropriate error message for a nested input', () => {
        const expectedErr = 'Card must be a number followed by a suit, e.g K♥ (♦♠♣♥)';
        const inputKey = 'fav.pokerHands.0.a';

        cy.visit('/');

        cy.get('[data-cy="push-hand"]')
            .click();

        cy.get('[data-cy=hand-a-err]')
            .should('have.text', '');

        cy.log('Entering invalid input...');
        cy.get(`input[name="${inputKey}"]`)
            .type('not a card');
        
        // unfocus input so that validation runs
        cy.get('body')
            .click('bottomRight', { force: true });

        cy.get('[data-cy=hand-a-err]')
            .should('have.text', expectedErr);

        
        cy.log('Entering valid input...');
        cy.get(`input[name="${inputKey}"]`)
            .clear()
            .type('K♥');

        // unfocus input so that validation runs
        cy.get('body')
            .click('bottomRight', { force: true });
    
        cy.get('[data-cy=hand-a-err]')
            .should('have.text', '');
    });
});
