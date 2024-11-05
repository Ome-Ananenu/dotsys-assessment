describe('Filling out Your Details section and proceeding', () => {
  beforeEach(() => {
    // Visit the homepage and accept any consent pop-ups
    cy.visit('https://www.its4women.ie/');
    cy.get('#onetrust-accept-btn-handler').click();
    cy.get('.framer-1y09im0').click();
  });

  it('should fill out the Your Details form and proceed to the Your Information section', () => {
    // Fill out the title dropdown
    cy.get('#ctl00_Main_ProposerTitle').select('Mr').should('have.value', 'Mr');

    // Fill out the telephone number
    cy.get('#ctl00_Main_ProposerTelephone')
      .type('07922343359')
      .should('have.value', '07922343359');

    // Fill out the forename
    cy.get('#ctl00_Main_ProposerForename')
      .type('Colin')
      .should('have.value', 'Colin');

    // Fill out the surname
    cy.get('#ctl00_Main_ProposerSurname')
      .type('Darragh')
      .should('have.value', 'Darragh');

    // Fill out the email
    cy.get('#ctl00_Main_ProposerEmail')
      .type('test@dotsys.com')
      .should('have.value', 'test@dotsys.com');

    // Click the Continue button to proceed
    cy.get('#ctl00_Main_Continue1').click();

    // Verify transition to Your Information page
  cy.get('#ctl00_Main_UpdatePanel11 > a > .ellipsed > .panel-title')
  .should('be.visible')
  .and('have.text', '2. Your Information');
  });
});
