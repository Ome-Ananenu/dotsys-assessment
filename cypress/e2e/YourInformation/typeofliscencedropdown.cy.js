escribe('Filling out Your Details and testing Republic of Ireland or UK section', () => {
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

    it('should display all valid dropdown values', () => {
        const expectedOptions = [
            '--',
            'Full Irish / UK',
            'Provisional Irish / Learner Permit',
            'Full EU',
            'Provisional EU Licence',
            'Non EU',
            'International'
        ];

        cy.get('#ctl00_Main_LicenceType option').then(options => {
            const actual = [...options].map(o => o.text.trim());
            expect(actual).to.deep.equal(expectedOptions);
        });
    });

    it('should not allow proceeding with enter without selection', () => {
        cy.get('#ctl00_Main_LicenceType').focus().type('{enter}');
        cy.get('#ctl00_Main_RF_LicenceType').should('be.visible').and('contain', 'Licence Type Required');
    });

    it('should display error message when trying to proceed without entering details', () => {
        cy.get('#ctl00_Main_LicenceType').focus().blur();
        cy.get('#ctl00_Main_RF_LicenceType').should('be.visible').and('contain', 'Licence Type Required');
    });

    it('should highlight the correct option when entering "A"', () => {
        cy.get('#ctl00_Main_LicenceType').type('A');
        cy.get('#ctl00_Main_LicenceType').find('option:selected').should('contain', 'Full EU');
    });

    it('should highlight the correct option when entering "1"', () => {
        cy.get('#ctl00_Main_LicenceType').type('1');
        cy.get('#ctl00_Main_LicenceType').find('option:selected').should('contain', 'Full EU');
    });

    it('should highlight the correct option when entering "*"', () => {
        cy.get('#ctl00_Main_LicenceType').type('*');
        cy.get('#ctl00_Main_LicenceType').find('option:selected').should('contain', 'Full EU');
    });

    it('should highlight Full Irish licence when entering "f"', () => {
        cy.get('#ctl00_Main_LicenceType').type('f');
        cy.get('#ctl00_Main_LicenceType').find('option:selected').should('contain', 'Full Irish / UK');
    });

    it('should highlight Provisional licence when entering "Pr"', () => {
        cy.get('#ctl00_Main_LicenceType').type('Pr');
        cy.get('#ctl00_Main_LicenceType').find('option:selected').should('contain', 'Provisional Irish / Learner Permit');
    });

    it('should show Full Irish licence in dropdown when clicked', () => {
        cy.get('#ctl00_Main_LicenceType').select('Full Irish / UK');
        cy.get('#ctl00_Main_LicenceType').should('have.value', 'F');
    });

    it('should show Full EU licence in dropdown when clicked', () => {
        cy.get('#ctl00_Main_LicenceType').select('Full EU');
        cy.get('#ctl00_Main_LicenceType').should('have.value', 'E');
        cy.get('#ctl00_Main_LicenceType').next('.validationError').should('not.exist'); // Ensure no new dropdown appears
    });

    it('should allow selection using arrow keys and enter', () => {
        cy.get('#ctl00_Main_LicenceType').focus().type('{downarrow}').type('{enter}');
        cy.get('#ctl00_Main_LicenceType').should('have.value', 'F'); // Assuming the first option is selected
    });

    it('should display the information box when clicked', () => {
        cy.get('#popover4').trigger('mouseover');
        cy.get('.tooltip-inner').should('contain', 'Please select the type of Driving licence you hold. If your licence type is not listed here, we may not be able to insure you. Please note as a learner permit or provisional licenceholder you must adhere to your obligations under the Road Traffic Act.');
    });
});
