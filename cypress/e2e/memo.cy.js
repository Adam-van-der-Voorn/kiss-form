/// <reference types="Cypress" />

describe('memo', () => {
  it('updates local state in a memoised component', () => {
    const expected = { fruit: "apples" };
    cy.visit('/');
    cy.get('input[name="fav.fruit"]')
      .type(expected.fruit);
    cy.get('#favourites-state')
      .contains(JSON.stringify(expected));
  });
  it('only renders memoised component when needed', () => {
    let renderCounts = {};
    const getCounts = (counts) => ({
      root: parseInt(counts.filter('#root').text()),
      favs: parseInt(counts.filter('#favs').text())
    });

    cy.visit('/');
    cy.get('.render-count').then(counts => {
      renderCounts = getCounts(counts);
      cy.log(JSON.stringify(renderCounts));
    });

    cy.get('input[name="fav.fruit"]')
      .type("apple");
    cy.get('.render-count').then(counts => {
      const newRenderCounts = getCounts(counts);
      cy.log(JSON.stringify(newRenderCounts));
      expect(newRenderCounts.root).to.be.greaterThan(renderCounts.root);
      expect(newRenderCounts.favs).to.be.greaterThan(renderCounts.favs);
      renderCounts = newRenderCounts;
    });

    cy.get('input[name=name]')
      .type("someone");
    cy.get('.render-count').then(counts => {
      const newRenderCounts = getCounts(counts);
      cy.log(JSON.stringify(newRenderCounts));
      expect(newRenderCounts.root).to.be.greaterThan(renderCounts.root);
      expect(newRenderCounts.favs).to.equal(newRenderCounts.favs);
    });
  });
  it('memoised input recieved state change', () => {
    cy.visit('/');
    cy.get('input[name="email.work"]')
      .type("anything");
    cy.get('[data-cy=clear-email]')
      .click();
    cy.get('input[name="email.work"]')
      .invoke('attr', 'value')
      .should('equal', "")
  });
});