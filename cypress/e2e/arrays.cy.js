describe('arrays', () => {
    const favHand = {
      a: "K♦",
      b: "A♠"
    };
  
    const emptyhand = { a: '', b: '' };
    it('can add, edit, and remove an item in the array, and clear the whole array', () => {
      cy.visit('/');
  
      // add items
      cy.get("[data-cy=push-hand]")
        .click()
        .click()
        .click();
      cy.get(`[name^="fav.pokerHands"]`)
        // two fields each array entry
        .should('have.length', 6);
  
      // edit items
      cy.get(`[name^="fav.pokerHands.0.a"]`)
        .type(favHand.a);
      cy.get(`[name^="fav.pokerHands.0.b"]`)
        .type(favHand.b);
      cy.get("#favourites-state")
        .innerHTMLEqualsObj({ pokerHands: [favHand, emptyhand, emptyhand] });
  
      // remove items
      cy.get("[data-cy=remove-hand-0]")
        .click();
      cy.get(`[name^="fav.pokerHands"]`)
        // two fields each array entry
        .should('have.length', 4);
      cy.get("#favourites-state")
        .innerHTMLEqualsObj({ pokerHands: [emptyhand, emptyhand] });
  
      // clear items
      cy.get("[data-cy=clear-hands]")
        .click();
      cy.get(`[name^="fav.pokerHands"]`)
        .should('have.length', 0);
    });
  
    it('can add, edit, and insert items into the  array', () => {
      cy.visit('/');
  
      // add items
      cy.get("[data-cy=push-hand]")
        .click()
        .click();
      cy.get(`[name^="fav.pokerHands"]`)
        // two fields each array entry
        .should('have.length', 4);
  
      // edit items
      cy.get(`[name^="fav.pokerHands.0.a"]`)
        .type(favHand.a);
      cy.get(`[name^="fav.pokerHands.0.b"]`)
        .type(favHand.b);
      cy.get("#favourites-state")
        .innerHTMLEqualsObj({ pokerHands: [favHand, emptyhand] });
  
      // insert items
      cy.get("[data-cy=insert-above-hand-0]")
        .click();
      cy.get(`[name^="fav.pokerHands.0"]`)
        .invoke('attr', 'value')
        .should('equal', '');
      cy.get(`[name^="fav.pokerHands.1.a"]`)
        .invoke('attr', 'value')
        .should('equal', favHand.a);
      cy.get(`[name^="fav.pokerHands.1.b"]`)
        .invoke('attr', 'value')
        .should('equal', favHand.b);
      cy.get(`[name^="fav.pokerHands"]`)
        // two fields each array entry
        .should('have.length', 6);
  
      cy.get("[data-cy=insert-above-hand-2]")
        .click();
      cy.get(`[name^="fav.pokerHands.2"]`)
        .invoke('attr', 'value')
        .should('equal', '');
      cy.get(`[name^="fav.pokerHands.1.a"]`)
        .invoke('attr', 'value')
        .should('equal', favHand.a);
      cy.get(`[name^="fav.pokerHands.1.b"]`)
        .invoke('attr', 'value')
        .should('equal', favHand.b);
      cy.get(`[name^="fav.pokerHands"]`)
        // two fields each array entry
        .should('have.length', 8);
    });
  });