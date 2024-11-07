describe('Years Licence Held Dropdown Tests', () => {
  beforeEach(() => {
    // Visit the homepage and accept any consent pop-ups
    cy.visit('https://www.its4women.ie/');
    cy.get('#onetrust-accept-btn-handler').click();
    cy.get('.framer-1y09im0').click();

    // Fill out the "Your Details" form
    cy.get('#ctl00_Main_ProposerTitle').select('Mr').should('have.value', 'Mr');
    cy.get('#ctl00_Main_ProposerTelephone').type('07922343359').should('have.value', '07922343359');
    cy.get('#ctl00_Main_ProposerForename').type('Colin').should('have.value', 'Colin');
    cy.get('#ctl00_Main_ProposerSurname').type('Darragh').should('have.value', 'Darragh');
    cy.get('#ctl00_Main_ProposerEmail').type('test@dotsys.com').should('have.value', 'test@dotsys.com');

    // Proceed to the next section
    cy.get('#ctl00_Main_Continue1').click();
  });

  it('should display correct values in the dropdown', () => {
    cy.get('#ctl00_Main_LicenceYearsHeld').find('option').then(options => {
      const actual = [...options].map(option => option.innerText.trim());
      const expected = [
        '--',
        '0 Years',
        '1 Year',
        '2 Years',
        '3 Years',
        '4 Years',
        '5 Years',
        '6 Years',
        '7 Years',
        '8 Years',
        '9 Years',
        '10 Years or more'
      ];
      expect(actual).to.deep.equal(expected);
    });
  });

  it('should not allow proceeding when pressing enter with no selection', () => {
    cy.get('#ctl00_Main_LicenceYearsHeld').type('{enter}');
    cy.get('#ctl00_Main_RF_LicenceYearsHeld').should('be.visible')
      .and('contain', 'How long have you held your licence');
  });

  it('should show an error message when attempting to proceed without selecting a value', () => {
    cy.get('#ctl00_Main_LicenceYearsHeld').focus().tab();
    cy.get('#ctl00_Main_RF_LicenceYearsHeld').should('be.visible')
      .and('contain', 'How long have you held your licence');
  });

  it('should show no details in the dropdown when entering invalid characters', () => {
    cy.get('#ctl00_Main_LicenceYearsHeld').type('A');
    cy.get('#ctl00_Main_LicenceYearsHeld').should('have.value', '');

    cy.get('#ctl00_Main_LicenceYearsHeld').clear().type('*');
    cy.get('#ctl00_Main_LicenceYearsHeld').should('have.value', '');
  });

  it('should allow selecting a valid number and show the corresponding option', () => {
    const validInputs = ['0', '3', '10'];
    validInputs.forEach(input => {
      cy.get('#ctl00_Main_LicenceYearsHeld').clear().type(input);
      cy.get('#ctl00_Main_LicenceYearsHeld').should('have.value', input);
    });
  });

  it('should allow using arrow keys to select values', () => {
    cy.get('#ctl00_Main_LicenceYearsHeld').focus().type('{downarrow}');
    cy.get('#ctl00_Main_LicenceYearsHeld').type('{downarrow}'); // Select the next option
    cy.get('#ctl00_Main_LicenceYearsHeld').type('{downarrow}').type('{enter}'); // Select 4 Years
    cy.get('#ctl00_Main_LicenceYearsHeld').should('have.value', '4'); // Verify selection
  });
});
