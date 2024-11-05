describe('Filling out Your Details and testing Republic of Ireland or UK section', () => {
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
  
    describe('Republic of Ireland or UK radio buttons', () => {
        // it('should check that the "Yes" and "No" buttons are visible and active', () => {
        //   cy.get('#ctl00_Main_rblBornInROIorUK_0').should('be.visible').and('be.enabled'); // Yes button
        //   cy.get('#ctl00_Main_rblBornInROIorUK_1').should('be.visible').and('be.enabled'); // No button
        // });
      
        // it('should display an error message when attempting to proceed without selecting an option', () => {
        //   cy.get('#ctl00_Main_btnBornROIorUK').click(); // Adjust selector for submit action
        //   cy.get('#ctl00_Main_RequiredFieldValidator11')
        //     .should('be.visible')
        //     .and('have.text', '* Were you born in ROI or UK?');
        // });
      
        // it('should change "Yes" button to blue with white font when clicked', () => {
        //     cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(1) > label').click();
        //     cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(1) > label').next('label').should('have.css', 'background-color', 'rgb(0, 174, 186)')
        //     .and('have.css', 'color', 'rgb(255, 255, 255)');
        // });
      
        it('should keep the "Yes" button selected when re-clicked', () => {
            cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(1)').click();
            cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(1)').click();
            cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(1)').should('have.css', 'background-color', 'rgb(0, 174, 186)') 
            .and('have.css', 'color', 'rgb(255, 255, 255)');
        });
      
        it('should change "No" button to blue with white font when clicked', () => {
            cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(2) ').click();
            cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(2) ').next('label').should('have.css', 'background-color', 'rgb(0, 174, 186)')
            .and('have.css', 'color', 'rgb(255, 255, 255)');
        });
      
        it('should keep the "No" button selected when re-clicked', () => {
          cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(2) ').click().should('be.checked');
          cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(2) ').click().should('be.checked');
        });
      
        it('should switch selection from "Yes" to "No"', () => {
            cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(1) > label').click().should('be.checked');
            cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(2) > label').click().should('be.checked');
            cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(1) > label').should('not.be.checked');
        });
      
        it('should switch selection from "No" to "Yes"', () => {
            cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(2) > label').click().should('be.checked');
            cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(1) > label').click().should('be.checked');
            cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(2) > label').should('not.be.checked');
        });
      
        // Placeholder for verifying the title of the new dropdown when "No" is selected
        it('should check the title of the new dropdown when "No" is selected', () => {
          cy.get('#ctl00_Main_rblBornInROIorUK_1').click();
          // Add assertions to verify the title of the new dropdown
        });
      
        // Placeholder for checking the details in the information box
        it('should check the details in the information box', () => {
          // Add assertions to verify the information box content
        });
      });      
  });
  