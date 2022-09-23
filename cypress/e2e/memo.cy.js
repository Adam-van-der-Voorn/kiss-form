/// <reference types="Cypress" />

describe('memo', () => {
    it('updates local state in a memoised component', () => {
        const expected = { fruit: 'apples' };
        cy.visit('/');
        cy.get('input[name="fav.fruit"]')
            .type(expected.fruit);
        cy.get('#favourites-state')
            .contains(JSON.stringify(expected));
    });
    it('memoised input recieved state change', () => {
        cy.visit('/');
        cy.get('input[name="email.work"]')
            .type('anything');
        cy.get('[data-cy=clear-email]')
            .click();
        cy.get('input[name="email.work"]')
            .invoke('attr', 'value')
            .should('equal', '');
    });
});

describe('only render memoised component when needed', () => {
    it('favs', () => {
        let renderCounts = {};

        cy.visit('/');
        getRenderCounts(['root', 'favs']).then(counts => {
            renderCounts = counts;
        });

        cy.get('input[name="fav.fruit"]')
            .type('apple');
        getRenderCounts(['root', 'favs']).then(newRenderCounts => {
            expect(newRenderCounts.root).to.be.greaterThan(renderCounts.root);
            expect(newRenderCounts.favs).to.be.greaterThan(renderCounts.favs);
            renderCounts = newRenderCounts;
        });

        cy.get('input[name=name]')
            .type('someone');
        getRenderCounts(['root', 'favs']).then(newRenderCounts => {
            expect(newRenderCounts.root).to.be.greaterThan(renderCounts.root);
            expect(newRenderCounts.favs).to.equal(newRenderCounts.favs);
        });
    });
    // temp broken, requires api change
    it.skip('email', () => {
        let renderCounts = {};
        cy.visit('/');
        getRenderCounts(['root', 'email'])
            .then(counts => {
                renderCounts = counts;
            });

        cy.get('input[name="email.work"]')
            .type('a@v');
        getRenderCounts(['root', 'email']).then(newRenderCounts => {
            expect(newRenderCounts.root).to.be.greaterThan(renderCounts.root);
            expect(newRenderCounts.email).to.be.greaterThan(renderCounts.email);
            renderCounts = newRenderCounts;
        });

        cy.get('input[name=name]')
            .type('someone');
        getRenderCounts(['root', 'email']).then(newRenderCounts => {
            expect(newRenderCounts.root).to.be.greaterThan(renderCounts.root);
            expect(newRenderCounts.email).to.equal(renderCounts.email);
        });
    });
    it('edit array field', () => {
        let renderCounts = {};
        cy.visit('/');
        cy.get('[data-cy=push-hand]')
            .click()
            .click();

        getRenderCounts(['poker-hand-0', 'poker-hand-1'])
            .then(counts => {
                renderCounts = counts;
            });

        // edit items
        cy.get('[name="fav.pokerHands.0.a"]')
            .type('K♦');
        cy.get('[name="fav.pokerHands.0.b"]')
            .type('A♠');

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
        cy.log('wrapped render counts: ');
        return cy.wrap(renderCounts);
    });
};