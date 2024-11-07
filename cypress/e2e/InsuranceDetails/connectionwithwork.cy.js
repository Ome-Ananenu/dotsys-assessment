describe('Tests for "Will you use this car in connection with your work?" question', () => {
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

        //Fill out your information section
        cy.get('#ctl00_Main_AddressSearch')
      .type('D18H683{enter}');

    // Wait for the address suggestions to appear. You can adjust the selector
    // based on how the suggestions are displayed. Here we assume the suggestions 
    // are displayed in a dropdown or a list.
    // Adjust this selector as needed based on the page's structure.
    cy.get('.ui-autocomplete .ui-menu-item').should('have.length.greaterThan', 0); // Ensure results are shown

    // Select the first address in the dropdown or suggestions
    cy.get('.ui-autocomplete .ui-menu-item')
      .first()
      .click(); // Click on the first result

        cy.get('#ctl00_Main_btnConfirmAddress').click();
        cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(1) > label').click();
        cy.get('#ctl00_Main_DobDay').select('1').should('have.value', '1');
        cy.get('#ctl00_Main_LicenceYearsHeld').select('2 Years', { force: true }).should('have.value', '2');
        cy.get('#ctl00_Main_DobMonth').select('Jan').should('have.value', '01');
        cy.get('#ctl00_Main_DobYear').select('1999').should('have.value', '1999');
        cy.get('#ctl00_Main_ProposerSexList > :nth-child(2) > label').click();
        cy.get('#ctl00_Main_ProposerMaritalStatus').select('Married').should('have.value', 'M');
        cy.get('#ctl00_Main_EmploymentStatus').select('Retired').should('have.value', 'R');
        cy.get('#ctl00_Main_LicenceType').select('Full Irish / UK').should('have.value', 'F');
        
        cy.wait(500) // Adjust wait time if needed



//   cy.get('#ctl00_Main_LicenceYearsHeld')


        // Proceed to the next section
        cy.get('#ctl00_Main_Continue2').click();

          // Wait for the page to reload (You can use `cy.reload()` to simulate a manual reload if needed)
    cy.url().should('not.include', '/form');  // Assuming the URL changes after reload

    // After the page reloads, verify the selection is still saved
    
    cy.get('#ctl00_Main_LicenceYearsHeld').select('2 Years', { force: true }).should('have.value', '2');
    cy.get('#ctl00_Main_Continue2').click();

        cy.get('#ctl00_Main_ddlDrivingExperience').select('I currently have insurance in my own name');
      });

    it('should have active and viewable Yes and No buttons', () => {
        cy.get('#ctl00_Main_rblBusinessUse_0').should('be.visible').and('not.be.disabled');
        cy.get('#ctl00_Main_rblBusinessUse_1').should('be.visible').and('not.be.disabled');
    });

    it('should show a red error message when trying to proceed without selecting any option', () => {
        cy.get('#ctl00_Main_Continue2').click(); // Assume this is the continue button
        cy.get('#ctl00_Main_RF_BusinessUse')
            .should('be.visible')
            .and('contain', 'Will you use the vehicle for limited Business use?');
    });

    it('should display the error message when Yes button is clicked', () => {
        cy.get('#ctl00_Main_rblBusinessUse_0 + label').click();
        cy.get('#ctl00_Main_RF_BusinessUse')
            .should('be.visible')
            .and('contain', 'Will you use the vehicle for limited Business use?');
    });

    it('should display the error message when Yes button is re-clicked', () => {
        cy.get('#ctl00_Main_rblBusinessUse_0 + label').click().click();
        cy.get('#ctl00_Main_RF_BusinessUse')
            .should('be.visible')
            .and('contain', 'Will you use the vehicle for limited Business use?');
    });

    it('should display the error message when No button is clicked', () => {
        cy.get('#ctl00_Main_rblBusinessUse_1 + label').click();
        cy.get('#ctl00_Main_RF_BusinessUse')
            .should('be.visible')
            .and('contain', 'Will you use the vehicle for limited Business use?');
    });

    it('should display the error message when No button is re-clicked', () => {
        cy.get('#ctl00_Main_rblBusinessUse_1 + label').click().click();
        cy.get('#ctl00_Main_RF_BusinessUse')
            .should('be.visible')
            .and('contain', 'Will you use the vehicle for limited Business use?');
    });

    it('should switch to No when clicked after Yes was selected and show error message', () => {
        cy.get('#ctl00_Main_rblBusinessUse_0 + label').click(); // Select Yes
        cy.get('#ctl00_Main_rblBusinessUse_1 + label').click(); // Select No
        cy.get('#ctl00_Main_rblBusinessUse_0').should('not.be.checked');
        cy.get('#ctl00_Main_rblBusinessUse_1').should('be.checked');
        cy.get('#ctl00_Main_RF_BusinessUse')
            .should('be.visible')
            .and('contain', 'Will you use the vehicle for limited Business use?');
    });

    it('should switch to Yes when clicked after No was selected and show error message', () => {
        cy.get('#ctl00_Main_rblBusinessUse_1 + label').click(); // Select No
        cy.get('#ctl00_Main_rblBusinessUse_0 + label').click(); // Select Yes
        cy.get('#ctl00_Main_rblBusinessUse_1').should('not.be.checked');
        cy.get('#ctl00_Main_rblBusinessUse_0').should('be.checked');
        cy.get('#ctl00_Main_RF_BusinessUse')
            .should('be.visible')
            .and('contain', 'Will you use the vehicle for limited Business use?');
    });

    it('should display the information box when clicking the info button', () => {
        cy.get('#popoverBusinessUse').click();
        cy.get('.modal-content')
            .should('be.visible')
            .and('contain', 'Business use. If you will use your car to travel to multiple locations and this is in connection with your work you must answer "Yes" to this question. However if you will use your car to carry tools, goods or samples you must answer "Yes" to the next question.');
    });
});
