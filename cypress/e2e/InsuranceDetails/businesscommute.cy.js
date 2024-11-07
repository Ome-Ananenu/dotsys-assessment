describe('Commute to work question tests', () => {
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
        cy.get('#ctl00_Main_AddressSearch').type('6 HEYWARD MEWS, ROGANSTOWN GOLF AND COUNTRY CLUB, ROGANSTOWN, BALCARTIE, SWORDS, DUBLIN, K67VF21{enter}');
        cy.get('#ctl00_Main_rblBornInROIorUK_0').select('Yes');
        cy.get('#ctl00_Main_DobDay').select('1');
        cy.get('#ctl00_Main_DobMonth').select('Jan');
        cy.get('#ctl00_Main_DobYear').select('1999');
        cy.get('#ctl00_Main_ProposerSexList').select('Male');
        cy.get('#ctl00_Main_ProposerMaritalStatus').select('Married');
        cy.get('#ctl00_Main_EmploymentStatus').select('Retired');
        cy.get('#ctl00_Main_LicenceType').select('Full Irish / UK');
        cy.get('#ctl00_Main_LicenceYearsHeld').select('2');

        // Proceed to the next section
        cy.get('#ctl00_Main_Continue2').click();
      });

    it('should have active and viewable Yes and No buttons', () => {
        cy.get('#ctl00_Main_rblCommuting_0').should('be.visible').and('not.be.disabled');
        cy.get('#ctl00_Main_rblCommuting_1').should('be.visible').and('not.be.disabled');
    });

    it('should show a red error message if no option is selected and trying to proceed', () => {
        cy.get('#ctl00_Main_Continue2').click(); // Assume this is the continue button
        cy.get('#ctl00_Main_RF_Commuting')
            .should('be.visible')
            .and('contain', '* Will you use the vehicle to commute to work?');
    });

    it('should turn the Yes button green and text white when clicked', () => {
        cy.get('#ctl00_Main_rblCommuting_0 + label').click();
        cy.get('#ctl00_Main_rblCommuting_0').should('be.checked');
        cy.get('#ctl00_Main_rblCommuting_0 + label')
            .should('have.css', 'background-color', 'rgb(0, 128, 0)') // Replace with actual green color in RGB or HEX
            .and('have.css', 'color', 'rgb(255, 255, 255)'); // Check for white text
    });

    it('should remain selected when Yes button is re-clicked', () => {
        cy.get('#ctl00_Main_rblCommuting_0 + label').click().click();
        cy.get('#ctl00_Main_rblCommuting_0').should('be.checked');
    });

    it('should turn the No button red and text white when clicked', () => {
        cy.get('#ctl00_Main_rblCommuting_1 + label').click();
        cy.get('#ctl00_Main_rblCommuting_1').should('be.checked');
        cy.get('#ctl00_Main_rblCommuting_1 + label')
            .should('have.css', 'background-color', 'rgb(255, 0, 0)') // Replace with actual red color in RGB or HEX
            .and('have.css', 'color', 'rgb(255, 255, 255)'); // Check for white text
    });

    it('should remain selected when No button is re-clicked', () => {
        cy.get('#ctl00_Main_rblCommuting_1 + label').click().click();
        cy.get('#ctl00_Main_rblCommuting_1').should('be.checked');
    });

    it('should switch to No when clicked after Yes was selected', () => {
        cy.get('#ctl00_Main_rblCommuting_0 + label').click(); // Select Yes
        cy.get('#ctl00_Main_rblCommuting_1 + label').click(); // Select No
        cy.get('#ctl00_Main_rblCommuting_0').should('not.be.checked');
        cy.get('#ctl00_Main_rblCommuting_1').should('be.checked');
    });

    it('should switch to Yes when clicked after No was selected', () => {
        cy.get('#ctl00_Main_rblCommuting_1 + label').click(); // Select No
        cy.get('#ctl00_Main_rblCommuting_0 + label').click(); // Select Yes
        cy.get('#ctl00_Main_rblCommuting_1').should('not.be.checked');
        cy.get('#ctl00_Main_rblCommuting_0').should('be.checked');
    });

    it('should display the information box when clicking the info button', () => {
        cy.get('#popoverCommute').click();
        cy.get('.modal-content')
            .should('be.visible')
            .and('contain', 'Select "Yes" only if you are commuting to one permanent place of work. If you are travelling to a number of locations then you will need to answer "Yes" to limited business as well.');
    });
});
