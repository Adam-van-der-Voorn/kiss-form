/// <reference types="Cypress" />

describe('callbacks', () => {
    it('runs the onchange callback', () => {
        const input = '12345678 90123456 & some other stuff';
        const expected = '1234 5678 9012 3456';
        cy.visit('/');
        cy.get('input[name="bank.number"]')
            .type(input);
        cy.get('#form-state')
            .innerHTMLEqualsObj(expected, 'bank.number');
    });
    it('runs the onblur callback', () => {
        const input = 'apple';
        const expectedLink = `https://en.wikipedia.org/wiki/${input}`;

        cy.visit('/');
        cy.get('input[name="fav.fruit"]')
            .type(input);

        // unfocus input
        cy.get('body').click('bottomLeft', {force: true});
        
        cy.get('[data-cy=fruit-link]')
            .should('have.attr', 'href', expectedLink);
    });
});