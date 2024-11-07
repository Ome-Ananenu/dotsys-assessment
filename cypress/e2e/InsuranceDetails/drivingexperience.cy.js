describe('Tests for "Your latest driving experience" input', () => {
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

    it('should have the correct options in the dropdown', () => {
        const expectedOptions = [
            '--',
            'I currently have insurance in my own name',
            'This is my first time',
            'I have been a named driver',
            'I have been insured on a company car'
        ];

        cy.get('#ctl00_Main_ddlDrivingExperience')
            .find('option')
            .then(($options) => {
                const actualOptions = [...$options].map(option => option.innerText.trim());
                expect(actualOptions).to.deep.equal(expectedOptions);
            });
    });

    it('should show the dropdown menu on pressing enter without proceeding', () => {
        cy.get('#ctl00_Main_ddlDrivingExperience').focus().type('{enter}');
        cy.get('#ctl00_Main_ddlDrivingExperience').should('be.visible');
    });

    it('should show an error message when trying to proceed without selecting any details', () => {
        cy.get('#ctl00_Main_Continue').click(); // Assuming this is the continue button
        cy.get('#ctl00_Main_RF_DrivingExperience')
            .should('be.visible')
            .and('contain', '* Please Select Your Driving Experience');
    });

    it('should not display any dropdown details when inserting "A", "1", or "*"', () => {
        cy.get('#ctl00_Main_ddlDrivingExperience').type('A');
        cy.get('#ctl00_Main_ddlDrivingExperience').should('have.value', '');
        
        cy.get('#ctl00_Main_ddlDrivingExperience').clear().type('1');
        cy.get('#ctl00_Main_ddlDrivingExperience').should('have.value', '');

        cy.get('#ctl00_Main_ddlDrivingExperience').clear().type('*');
        cy.get('#ctl00_Main_ddlDrivingExperience').should('have.value', '');
    });

    it('should show an error message when selecting "--"', () => {
        cy.get('#ctl00_Main_ddlDrivingExperience').select('--');
        cy.get('#ctl00_Main_RF_DrivingExperience')
            .should('be.visible')
            .and('contain', '* Please Select Your Driving Experience');
    });

    it('should show relevant options when typing "I"', () => {
        cy.get('#ctl00_Main_ddlDrivingExperience').type('I');
        cy.get('#ctl00_Main_ddlDrivingExperience').should('contain', 'I currently have insurance in my own name');
    });

    it('should show relevant options when typing "No"', () => {
        cy.get('#ctl00_Main_ddlDrivingExperience').type('No');
        cy.get('#ctl00_Main_ddlDrivingExperience').should('contain', 'No previous experience');
    });

    it('should select "I have been a named driver" using arrow keys and enter, displaying a new question', () => {
        cy.get('#ctl00_Main_ddlDrivingExperience').select('I have been a named driver');
        cy.get('#ctl00_Main_ddlDrivingExperience').should('have.value', '3');
        cy.get('.form-group').should('contain', 'How many consecutive claims free years have you been named under a private car policy?');
        cy.get('.modal-content').should('exist'); // Assuming this displays the info box
    });

    it('should close the information popup when clicking the close button', () => {
        cy.get('#popoverCommute').click();
        cy.get('.modal-content').should('be.visible');
        cy.get('.modal-content .close').click();
        cy.get('.modal-content').should('not.exist');
    });

    it('should show a new question when selecting "I currently have insurance in my own name"', () => {
        cy.get('#ctl00_Main_ddlDrivingExperience').select('I currently have insurance in my own name');
        cy.get('.form-group').should('contain', 'How many no claims bonus years have you earned on a private car policy?');
    });

    it('should display the correct message when selecting the information box', () => {
        cy.get('#popoverBusinessUse').click();
        cy.get('.modal-content').should('contain', 'Each year you drive without making a claim qualifies you for another year\'s No Claims Bonus (NCB)');
    });

    it('should have the correct options for the number of NCB years', () => {
        const expectedNCBOptions = [
            '--',
            '0',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10'
        ];

        cy.get('#ctl00_Main_ddlNCBYears')
            .find('option')
            .then(($options) => {
                const actualOptions = [...$options].map(option => option.innerText.trim());
                expect(actualOptions).to.deep.equal(expectedNCBOptions);
            });
    });

    it('should show an error message when proceeding without selecting NCB values', () => {
        cy.get('#ctl00_Main_Continue').click(); // Assume continue button
        cy.get('#ctl00_Main_RF_NCBYears')
            .should('be.visible')
            .and('contain', '* Please Enter NCB Amount in Years');
    });

    it('should display correct values when inserting 0, 3, and 10', () => {
        cy.get('#ctl00_Main_ddlNCBYears').select('0');
        cy.get('#ctl00_Main_ddlNCBYears').should('have.value', '0');

        cy.get('#ctl00_Main_ddlNCBYears').select('3');
        cy.get('#ctl00_Main_ddlNCBYears').should('have.value', '3');

        cy.get('#ctl00_Main_ddlNCBYears').select('10');
        cy.get('#ctl00_Main_ddlNCBYears').should('have.value', '10');
    });

    it('should display 4 when using arrow keys to select and pressing enter', () => {
        cy.get('#ctl00_Main_ddlNCBYears').focus().type('{downarrow}{downarrow}{downarrow}{downarrow}{enter}');
        cy.get('#ctl00_Main_ddlNCBYears').should('have.value', '4');
    });
});
