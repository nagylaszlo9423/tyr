
context('Register', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('HOST'));
  });

  it('should log in', () => {
    cy.get('button#registrationButton')
      .click();

    cy.get('input#email')
      .type('asdqwe@asdqwe.hu')
      .should('have.value', 'asdqwe@asdqwe.hu');

    cy.get('input#password')
      .type('Asdqwe123')
      .should('have.value', 'Asdqwe123');

    cy.get('input#confirm-password')
      .type('Asdqwe123')
      .should('have.value', 'Asdqwe123');

    cy.get('button#registerButton')
      .click();

    cy.location().should((location) => expect(location.pathname).to.eq('/login'))
  });

});
