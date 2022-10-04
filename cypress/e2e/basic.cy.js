/// <reference types="Cypress" />

describe('basic 1', () => {
    it('types and submits', () => {
        const expected = {
            name: 'john doe',
            age: '32'
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
            name: 'john doe',
        };
        cy.visit('/');
        cy.get('input[name=name]')
            .type(expected.name);
        cy.get('#form-state')
            .innerHTMLEqualsObj(expected);
    });
    it('types and submits nested input', () => {
        const expected = {
            name: 'I need to be here as this field is now required :)',
            email: {
                work: '123',
                personal: '456',
            }
        };
        cy.visit('/');
        cy.get('input[name="name"]')
            .type(expected.name);
        cy.get('input[name="email.work"]')
            .type(expected.email.work);
        cy.get('input[name="email.personal"]')
            .type(expected.email.personal);
        cy.get('input[type=submit]')
            .click();
        cy.get('#submitted-data')
            .innerHTMLEqualsObj(expected);
    });
    it('updates state via a button', () => {
        cy.visit('/');
        cy.get('input[name="email.work"]')
            .type('anything');
        cy.get('[data-cy=clear-email]')
            .click();
        cy.get('#form-state')
            .innerHTMLEqualsObj({});
    });
});

describe('basic 2', () => {
    it('types and submits', () => {
        const expected = {
            addr: '123 Fake street',
            cart: {
                couponNo: '875859097',
                items: [
                    { item: 'bread knife', quantity: '1' },
                    { item: 'steak knife', quantity: '5' },
                    { item: 'box grater', quantity: '2' }
                ]
            }
        };
        cy.visit('/form2');
        cy.get('input[name=addr]')
            .type(expected.addr);
        cy.get('input[name="cart.couponNo"]')
            .type(expected.cart.couponNo);

        for (let i = 0; i < expected.cart.items.length; i++) {
            cy.get('[data-cy="push-item"]')
                .click();
            cy.get(`input[name="cart.items.${i}.item"]`)
                .clear()
                .type(expected.cart.items[i].item);
            cy.get(`input[name="cart.items.${i}.quantity"]`)
                .clear()
                .type(expected.cart.items[i].quantity);
        }

        cy.get('input[type=submit]')
            .click();
        cy.get('#submitted-data')
            .innerHTMLEqualsObj(expected);
    });
});

describe('initial state', () => {
    const initialState = {
        'name': 'Joan of arc',
        'age': '14',
        'email': {
            'personal': 'joan@god.nz',
            'work': 'joan@france.fr'
        },
        'fav': {
            'fruit': 'Apple',
            'pokerHands': [
                {
                    'a': '2♦',
                    'b': '7♦'
                },
                {
                    'a': 'K♦',
                    'b': 'A♠'
                }
            ]
        }
    };

    it('has the correct state', () => {
        cy.visit(`/?state=${encodeURIComponent(JSON.stringify(initialState))}`);
        cy.get('#form-state')
            .innerHTMLEqualsObj(initialState);
    });

    it('has filled the inputs', () => {
        cy.visit(`/?state=${encodeURIComponent(JSON.stringify(initialState))}`);

        cy.get('[name="name"]')
            .invoke('attr', 'value').should('equal', initialState.name);
        cy.get('[name="age"]')
            .invoke('attr', 'value').should('equal', initialState.age);

        cy.get('[name="email.personal"]')
            .invoke('attr', 'value').should('equal', initialState.email.personal);
        cy.get('[name="email.work"]')
            .invoke('attr', 'value').should('equal', initialState.email.work);

        cy.get('[name="fav.fruit"]')
            .invoke('attr', 'value').should('equal', initialState.fav.fruit);

        cy.get('[name^="fav.pokerHands.0.a"]')
            .invoke('attr', 'value').should('equal', initialState.fav.pokerHands[0].a);
        cy.get('[name^="fav.pokerHands.0.b"]')
            .invoke('attr', 'value').should('equal', initialState.fav.pokerHands[0].b);
        cy.get('[name^="fav.pokerHands.1.a"]')
            .invoke('attr', 'value').should('equal', initialState.fav.pokerHands[1].a);
        cy.get('[name^="fav.pokerHands.1.b"]')
            .invoke('attr', 'value').should('equal', initialState.fav.pokerHands[1].b);
    });
});

describe('touched and dirty', () => {
    it('can register a field being touched', () => {
        cy.visit('/');

        cy.get('#form-touched')
            .innerHTMLEqualsObj(false, 'name')
            .innerHTMLEqualsObj(false, 'age');


        cy.log('clicking in and out of name field');
        cy.get('[name="name"]')
            .click();
        cy.get('body')
            .click(3, 3);

        cy.get('#form-touched')
            .innerHTMLEqualsObj(true, 'name')
            .innerHTMLEqualsObj(false, 'age');

    });
});
