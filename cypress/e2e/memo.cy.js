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
  it('only renders memoised component when needed - favs', () => {
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
  it('only renders memoised component when needed - email', () => {
    let renderCounts = {};


    cy.visit('/');
    cy.get('.render-count').then(counts => {
      renderCounts = getCounts(counts);
      cy.log(JSON.stringify(renderCounts));
    });

    cy.get('input[name="email.work"]')
      .type("a@v");
    cy.get('.render-count').then(counts => {
      const newRenderCounts = getCounts(counts);
      cy.log(JSON.stringify(newRenderCounts));
      expect(newRenderCounts.root).to.be.greaterThan(renderCounts.root);
      expect(newRenderCounts.email).to.be.greaterThan(renderCounts.email);
      renderCounts = newRenderCounts;
    });

    cy.get('input[name=name]')
      .type("someone");
    cy.get('.render-count').then(counts => {
      const newRenderCounts = getCounts(counts);
      cy.log(JSON.stringify(newRenderCounts));
      expect(newRenderCounts.root).to.be.greaterThan(renderCounts.root);
      expect(newRenderCounts.email).to.equal(newRenderCounts.email);
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
      .should('equal', "");
  });
  it('only renders memoised component when needed - edit array field', () => {
    const favHand = {
      a: "K♦",
      b: "A♠"
    };

    const emptyhand = { a: '', b: '' };
    cy.visit('/');

    // add items
    cy.get("[data-cy=push-hand]")
      .click()
      .click();

    // edit items
    cy.get(`[name^="fav.pokerHands.0.a"]`)
      .type(favHand.a);
    cy.get(`[name^="fav.pokerHands.0.b"]`)
      .type(favHand.b);
    cy.get("#favourites-state")
      .innerHTMLEqualsObj({ pokerHands: [favHand, emptyhand, emptyhand] });
  });
});

describe.only('only render memoised component when needed', () => {
  it('favs', () => {
    let renderCounts = {};

    cy.visit('/');
    getRenderCounts(['root', 'favs']).then(counts => {
      renderCounts = counts;
    });

    cy.get('input[name="fav.fruit"]')
      .type("apple");
    getRenderCounts(['root', 'favs']).then(newRenderCounts => {
      expect(newRenderCounts.root).to.be.greaterThan(renderCounts.root);
      expect(newRenderCounts.favs).to.be.greaterThan(renderCounts.favs);
      renderCounts = newRenderCounts;
    });

    cy.get('input[name=name]')
      .type("someone");
    getRenderCounts(['root', 'favs']).then(newRenderCounts => {
      expect(newRenderCounts.root).to.be.greaterThan(renderCounts.root);
      expect(newRenderCounts.favs).to.equal(newRenderCounts.favs);
    });
  });
  it('email', () => {
    let renderCounts = {};
    cy.visit('/');
    getRenderCounts(['root', 'email'])
      .then(counts => {
        renderCounts = counts;
      });

    cy.get('input[name="email.work"]')
      .type("a@v");
    getRenderCounts(['root', 'email']).then(newRenderCounts => {
      expect(newRenderCounts.root).to.be.greaterThan(renderCounts.root);
      expect(newRenderCounts.email).to.be.greaterThan(renderCounts.email);
      renderCounts = newRenderCounts;
    });

    cy.get('input[name=name]')
      .type("someone");
    getRenderCounts(['root', 'email']).then(newRenderCounts => {
      expect(newRenderCounts.root).to.be.greaterThan(renderCounts.root);
      expect(newRenderCounts.email).to.equal(renderCounts.email);
    });
  });
  it('edit array field', () => {
    const favHand = {
      a: "K♦",
      b: "A♠"
    };
    let renderCounts = {};
    cy.visit('/');
    cy.get("[data-cy=push-hand]")
      .click()
      .click();

    getRenderCounts(['poker-hand-0', 'poker-hand-1'])
      .then(counts => {
        renderCounts = counts;
      });

    // edit items
    cy.get(`[name="fav.pokerHands.0.a"]`)
      .type("K♦");
    cy.get(`[name="fav.pokerHands.0.b"]`)
      .type("A♠");

    getRenderCounts(['poker-hand-0', 'poker-hand-1'])
      .then(newRenderCounts => {
        expect(newRenderCounts['poker-hand-0']).to.be.greaterThan(renderCounts['poker-hand-0']);
        expect(newRenderCounts['poker-hand-1']).to.equal(renderCounts['poker-hand-1']);
      });
  });
});


/**
 * @param {string[]} ids
 */
const getRenderCounts = (ids) => {
  return cy.get('.render-count').then(counts => {
    const renderCounts = {};
    ids.forEach(id => {
      const count = parseInt(counts.filter(`#${id}`).text());
      renderCounts[id] = count;
    });
    cy.log("wrapped render counts: ");
    return cy.wrap(renderCounts);
  });
};