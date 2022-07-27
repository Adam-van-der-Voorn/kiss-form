describe('basic', () => {
  it('types and submits', () => {
    const expected = {
      name: "john doe",
      age: "32"
    }
    cy.visit('/');
    cy.get('input[name=name]')
      .type(expected.name)
    cy.get('input[name=age]')
      .type(expected.age)
    cy.get('input[type=submit]')
      .click()
    cy.get('#submitted-data')
      .contains(JSON.stringify(expected))
  });
});