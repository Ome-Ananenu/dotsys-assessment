describe('Tests for NCB Years Dropdown', () => {
    beforeEach(() => {
      // Visit the homepage and accept any consent pop-ups
      cy.visit('https://www.its4women.ie/');
      cy.get('#onetrust-accept-btn-handler').click();
      cy.get('.framer-1y09im0').click();
  
      // Fill out the "Your Details" form
      cy.get('#ctl00_Main_ProposerTitle').select('Mr').should('have.value', 'Mr');
      cy.get('#ctl00_Main_ProposerTelephone')
        .type('07922343359')
        .should('have.value', '07922343359');
      cy.get('#ctl00_Main_ProposerForename')
        .type('Colin')
        .should('have.value', 'Colin');
      cy.get('#ctl00_Main_ProposerSurname')
        .type('Darragh')
        .should('have.value', 'Darragh');
      cy.get('#ctl00_Main_ProposerEmail')
        .type('test@dotsys.com')
        .should('have.value', 'test@dotsys.com');
  
      // Proceed to the next section
      cy.get('#ctl00_Main_Continue1').click();
  
      //Fill out your information section
      cy.get('#ctl00_Main_AddressSearch').type('D18H683{enter}');
  
      // Wait for the address suggestions to appear. You can adjust the selector
      // based on how the suggestions are displayed. Here we assume the suggestions
      // are displayed in a dropdown or a list.
      // Adjust this selector as needed based on the page's structure.
      cy.get('.ui-autocomplete .ui-menu-item').should(
        'have.length.greaterThan',
        0
      ); // Ensure results are shown
  
      // Select the first address in the dropdown or suggestions
      cy.get('.ui-autocomplete .ui-menu-item').first().click(); // Click on the first result
  
      cy.get('#ctl00_Main_btnConfirmAddress').click();
      cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(1) > label').click();
      cy.get('#ctl00_Main_DobDay').select('1').should('have.value', '1');
      cy.get('#ctl00_Main_LicenceYearsHeld')
        .select('2 Years', { force: true })
        .should('have.value', '2');
      cy.get('#ctl00_Main_DobMonth').select('Jan').should('have.value', '01');
      cy.get('#ctl00_Main_DobYear').select('1991').should('have.value', '1991');
      cy.get('#ctl00_Main_ProposerSexList > :nth-child(2) > label').click();
      cy.get('#ctl00_Main_ProposerMaritalStatus')
        .select('Married')
        .should('have.value', 'M');
      cy.get('#ctl00_Main_EmploymentStatus')
        .select('Retired')
        .should('have.value', 'R');
      cy.get('#ctl00_Main_LicenceType')
        .select('Full Irish / UK')
        .should('have.value', 'F');
  
      cy.wait(500); // Adjust wait time if needed
  
      //   cy.get('#ctl00_Main_LicenceYearsHeld')
  
      // Proceed to the next section
      cy.get('#ctl00_Main_Continue2').click();
  
      // Wait for the page to reload (You can use `cy.reload()` to simulate a manual reload if needed)
      cy.url().should('not.include', '/form'); // Assuming the URL changes after reload
  
      // After the page reloads, verify the selection is still saved
  
      cy.get('#ctl00_Main_LicenceYearsHeld')
        .select('2 Years', { force: true })
        .should('have.value', '2');
      cy.get('#ctl00_Main_Continue2').click();
      cy.get("#ctl00_Main_ddlDrivingExperience").select("I currently have insurance in my own name");
    
    });
  
    it('Should check values in the "No Claims Bonus Years" dropdown', () => {
        const expectedOptions = [
          "--",
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10"
        ];
    
        cy.get("#ctl00_Main_YearsNCB")
          .find('option')
          .then(options => {
            const actualOptions = [...options].map(option => option.innerText);
            expect(actualOptions).to.deep.equal(expectedOptions);
          });
      });
    
      it('Should prevent proceeding without selecting a value', () => {
        cy.get('#ctl00_Main_Continue3').click();
        cy.get('#ctl00_Main_RF_YearsNCB')
          .should('be.visible')
          .and('contain', '* Please Enter NCB Amount in Years');
      });

    
      it('Should display an information box when the info button is clicked', () => {
        cy.get('#popoverNCB').click();
        cy.get('.tooltip-inner')
          .should('be.visible')
          .and('contain', 'Each year you drive without making a claim qualifies you for another year\'s No Claim bonus (NCB), up to a maximum of 10 years depending on insurer.');
      });
    
    it('Should display the correct tooltip content', () => {
        const expectedText = 'Each year you drive without making a claim qualifies you for another year\'s No Claim bonus (NCB), up to a maximum of 10 years depending on insurer. You\'ll be able to see this on your renewal notice from your current insurer. Your NCB is valid for 2 years after the expiry of your last motor insurance policy. We accept 1. An NCB earned on a private car policy in your name 2. It must be earned in Ireland or UK or the EU. 3. If your NCB is earned in the EU we require an English translation or we cannot accept it. Please note you can only use your NCB on one policy. The car registration on your NCB must match the car you wish to insure.';
        cy.get('#popoverNCB').click();
        cy.get('.tooltip-inner').should(
            'contain',
            expectedText  )  });
          
    });