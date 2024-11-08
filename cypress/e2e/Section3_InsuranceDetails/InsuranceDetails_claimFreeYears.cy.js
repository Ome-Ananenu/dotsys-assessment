describe('Tests for Claim Free Years Dropdown', () => {
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
      cy.get('#ctl00_Main_YearsNCB').select("1")
    });
  
    it('Should check values in the "Consecutive Claims Free Years" dropdown', () => {
        const expectedOptions = [
          "--",
          "0",
          "1",
          "2",
          "3",
          "4",
          "5+"
        ];
    
        cy.get("#ctl00_Main_OtherVehicleYearsNCB2")
          .find('option')
          .then(options => {
            const actualOptions = [...options].map(option => option.innerText);
            expect(actualOptions).to.deep.equal(expectedOptions);
          });
      });
    
      it('Should not allow proceeding without selecting a value', () => {
        cy.get('#ctl00_Main_Continue3').click();
        cy.get('#ctl00_Main_RF_YearsNamed')
          .should('be.visible')
          .and('contain', '* How many years?');
      });
    
      it('Should not display dropdown options when typing invalid characters ("A")', () => {
        cy.get('#ctl00_Main_OtherVehicleYearsNCB2').type('A');
        cy.get("#ctl00_Main_OtherVehicleYearsNCB2")
          .find('option')
          .should('not.exist'); // No dropdown options should appear
      });
    
      it('Should not display dropdown options when typing invalid characters ("*")', () => {
        cy.get('#ctl00_Main_OtherVehicleYearsNCB2').type('*');
        cy.get("#ctl00_Main_OtherVehicleYearsNCB2")
          .find('option')
          .should('not.exist'); // No dropdown options should appear
      });
    
      it('Should not allow proceeding with no value entered and pressing Tab', () => {
        cy.get('#ctl00_Main_OtherVehicleYearsNCB2').focus().tab();
        cy.get('#ctl00_Main_Continue3').click();
        cy.get('#ctl00_Main_RF_YearsNamed')
          .should('be.visible')
          .and('contain', '* How many years?');
      });
    
      it('Should display 0 when "0" is typed in the dropdown', () => {
        cy.get('#ctl00_Main_OtherVehicleYearsNCB2').type('0');
        cy.get('#ctl00_Main_OtherVehicleYearsNCB2').should('have.value', '0');
      });
    
      it('Should display 3 when "3" is typed in the dropdown', () => {
        cy.get('#ctl00_Main_OtherVehicleYearsNCB2').type('3');
        cy.get('#ctl00_Main_OtherVehicleYearsNCB2').should('have.value', '3');
      });
    
      it('Should display 5+ when "5+" is typed in the dropdown', () => {
        cy.get('#ctl00_Main_OtherVehicleYearsNCB2').type('5+');
        cy.get('#ctl00_Main_OtherVehicleYearsNCB2').should('have.value', '5+');
      });
    
      it('Should use arrow keys to select 2 and display a follow-up dropdown', () => {
        cy.get('#ctl00_Main_OtherVehicleYearsNCB2').click(); // Ensure dropdown is open
        cy.get('#ctl00_Main_OtherVehicleYearsNCB2').type('{downarrow}{downarrow}{enter}'); // Select "2"
        cy.get('#ctl00_Main_OtherVehicleYearsNCB2').should('have.value', '2');
        
        // Verify two new dropdowns appear
        cy.contains("How many no claims bonus years have you earned on a private car policy?")
          .should('be.visible');
      });
    
      it('Should use arrow keys to select 0 and not display any new dropdown', () => {
        cy.get('#ctl00_Main_OtherVehicleYearsNCB2').click(); // Ensure dropdown is open
        cy.get('#ctl00_Main_OtherVehicleYearsNCB2').type('{downarrow}{enter}'); // Select "0"
        cy.get('#ctl00_Main_OtherVehicleYearsNCB2').should('have.value', '0');
        
        // Verify no new dropdown appears
        cy.contains("How many no claims bonus years have you earned on a private car policy?")
          .should('not.exist');
      });
    
      it('Should show a pop-up when the info button is clicked', () => {
        cy.get('.btn-primary').click(); // Click the info button
        cy.get('.modal')
          .should('be.visible')
          .and('contain', 'Driving experience');
      });
    
      it('Should check the heading of the pop-up', () => {
        cy.get('.btn-primary').click(); // Click the info button
        cy.get('.modal-header h4')
          .should('be.visible')
          .and('contain', 'Driving experience');
      });
    
      it('Should check the text in the pop-up', () => {
        const expectedText = "Named driving experience must be consecutive and earned on a private car policy in Ireland or the UK immediately prior or within 30 days of taking insurance in your own name. Proof of named driving experience, obtained from previous broker(s) / insurer(s) must confirm the dates in which you were a named driver and that you were claim/accident free. We require proof of your named driving experience in writing, including a copy of all sections of the driving licence for all drivers within 7 days of the policy inception. 'Open Driving' or ‘Commercial Driving’ experience is not acceptable.";
        cy.get('.btn-primary').click(); // Click the info button
        cy.get('.modal-body')
          .should('be.visible')
          .and('contain', expectedText);
      });
    
      it('Should close the pop-up when the X button is clicked', () => {
        cy.get('.btn-primary').click(); // Open the modal
        cy.get('.close').click(); // Close the modal
        cy.get('.modal').should('not.be.visible'); // Ensure the modal is closed
        cy.get('#ctl00_Main_YearsNamed').should('be.visible'); // Ensure the form is still visible
      });
    
      it('Should close the pop-up when the "Close" button is clicked', () => {
        cy.get('.btn-primary').click(); // Open the modal
        cy.get('.btn-default').click(); // Click the close button
        cy.get('.modal').should('not.be.visible'); // Ensure the modal is closed
        cy.get('#ctl00_Main_YearsNamed').should('be.visible'); // Ensure the form is still visible
      });
    
      it('Should restrict typing when the pop-up is open', () => {
        cy.get('.btn-primary').click(); // Open the modal
        cy.get('.modal').should('be.visible');
        cy.get('#ctl00_Main_OtherVehicleYearsNCB2').type('3').should('not.have.value', '3'); // Typing is restricted
      });
    
      it('Should not close the pop-up when pressing Enter inside the pop-up', () => {
        cy.get('.btn-primary').click(); // Open the modal
        cy.get('.modal').should('be.visible');
        cy.get('body').type('{enter}'); // Press Enter inside modal
        cy.get('.modal').should('be.visible'); // Ensure the modal remains open
      });
    
      it('Should close the pop-up when clicking outside the modal', () => {
        cy.get('.btn-primary').click(); // Open the modal
        cy.get('.modal').should('be.visible');
        cy.get('body').click(0, 0); // Click outside the modal
        cy.get('.modal').should('not.be.visible'); // Ensure the modal is closed
        cy.get('#ctl00_Main_YearsNamed').should('be.visible'); // Ensure the form is still visible
      });
    
    });