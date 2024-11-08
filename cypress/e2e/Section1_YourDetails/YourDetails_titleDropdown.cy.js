describe('Tests for Title dropdown', () => {
  beforeEach(() => {
    cy.visit('https://www.its4women.ie/');
    cy.get('#onetrust-accept-btn-handler').click(); // Accept cookies
    cy.get('.framer-1y09im0').click(); // Interact with necessary page element
  });

  it('should check all dropdown options', () => {
    const expectedOptions = ['', 'Mrs', 'Miss', 'Ms', 'Mr', 'Dr'];
    cy.get('#ctl00_Main_ProposerTitle option')
      .should('have.length', 6)
      .each(($option, index) => {
        cy.wrap($option)
          .invoke('text')
          .should('equal', expectedOptions[index].trim());
      });
  });

  it('should navigate through dropdown options using select command', () => {
    const options = ['Mrs', 'Miss', 'Ms'];
    options.forEach(option => {
      cy.get('#ctl00_Main_ProposerTitle')
        .select(option)
        .should('have.value', option);
    });
  });

  it('should select the correct title when typed or clicked', () => {
    const titles = ['Mrs', 'Dr', 'Miss', 'Ms', 'Mr'];
    
    titles.forEach(title => {
      cy.get('#ctl00_Main_ProposerTitle').select(title).should('have.value', title);
      cy.get('#ctl00_Main_ProposerTitle').type(title.charAt(0)).should('have.value', title);
    });
  });

  it('should not select a value for invalid inputs', () => {
    const invalidInputs = ['A', '1', '!'];

    invalidInputs.forEach(input => {
      cy.get('#ctl00_Main_ProposerTitle').select(' ').should('have.value', ' ');
      cy.get('#ctl00_Main_ProposerTitle').type(input).should('have.value', ' ');
    });
  });

  it('should show an error when selecting the blank option', () => {
    cy.get('#ctl00_Main_ProposerTitle').select(' ').should('have.value', ' ');
    fillFormAndSubmit();

    cy.get('#ctl00_Main_RF_ProposerTitle').should('have.text', '* Title Required');
  });

  it('should show an error when submitting without selecting a title', () => {
    fillFormAndSubmit();

    cy.get('#ctl00_Main_RF_ProposerTitle').should('have.text', '* Title Required');
  });

  // Helper function to fill in the form and submit
  function fillFormAndSubmit() {
    cy.get('#ctl00_Main_ProposerTelephone').type('07922343359');
    cy.get('#ctl00_Main_ProposerForename').type('Colin');
    cy.get('#ctl00_Main_ProposerSurname').type('Darragh');
    cy.get('#ctl00_Main_ProposerEmail').type('test@dotsys.com');
    cy.get('#ctl00_Main_Continue1').click();
  }
});
