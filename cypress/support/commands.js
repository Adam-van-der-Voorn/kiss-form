/// <reference types="cypress" />

import getNestedValue from '../../src/lib/object-state/util/getNestedValue';

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('innerHTMLEqualsObj', { prevSubject: true }, (subject, obj, key) => {
    const innerHTML = subject.text();

    console.log('innerHTMLEqualsObj:');
    try {
        let innerObj = JSON.parse(innerHTML);
        if (key) {
            innerObj = getNestedValue(innerObj, key);
        }
        console.log({ innerHTML, innerObj, inputObj: obj, key });
        expect(innerObj).to.deep.equal(obj);
        return subject;
    }
    catch (e) {
        throw Error('innerHTMLEqualsObj: innerHTML cannot be parsed.');
    }
});