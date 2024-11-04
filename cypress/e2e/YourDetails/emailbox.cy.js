describe('visit homepage', () => {
    beforeEach(() => {
      cy.visit('https://www.its4women.ie/');
      cy.get('#onetrust-accept-btn-handler').click();
      cy.get('.framer-1y09im0').click();
    });
  
    it('should display information box on clicking the info icon', () => {
        // Click the information icon (adjust the selector as needed)
        cy.get('#email-info-icon').click();
      
        // Verify the information box is visible (adjust the selector as needed)
        cy.get('.info-box').should('be.visible');
      
        // Optionally, verify the content of the information box
        cy.get('.info-box').should('contain', 'This is an example information message'); // Replace with the expected content
      });
  
      it('should display correct information message', () => {
        // Click the information icon
        cy.get('#email-info-icon').click();
      
        // Verify the information box is visible and contains the correct text
        cy.get('.info-box').should('be.visible').and('have.text', 'If you purchase a policy with us we will send all initial an future documentation to you via email. Therefore it is important that you enter an email address that you regularly use.');
      });
  
      it('should display "Please enter your email address" error on trying to proceed without entering any details', () => {
        // Focus on the email input field
        cy.get('#ctl00_Main_ProposerEmail').focus();
      
        // Press Enter
        cy.focused().type('{enter}');
      
        // Verify the error message
        cy.contains('please enter your email address').should('be.visible');
      });
  
      it('should display "Please enter a valid e-mail address" error on inserting A', () => {
        cy.get('#ctl00_Main_ProposerEmail').type('A{enter}');
        cy.get('#ctl00_Main_RF_ProposerEmail.validationError').should('be.visible').and('have.css', 'color', 'rgb(224, 62, 49)');
      });
  
  
    it('should display "Please enter your full e-mail address" error on inserting 1', () => {
      cy.get('#ctl00$Main$ProposerEmail').type('1{enter}');
  
          // Verify the error message
      cy.contains('Please enter your full e-mail address').should('be.visible')
      .and('have.css', 'color', 'rgb(224, 62, 49)');
    });
  
    it('should display "Please enter your full e-mail address" error on inserting a special character', () => {
      cy.get('#ctl00$Main$ProposerEmail').type('*{enter}');
      
          // Verify the error message
      cy.contains('Please enter your full e-mail address').should('be.visible')
      .and('have.css', 'color', 'rgb(224, 62, 49)');
    });
  
  
    it('should allow you proceed with a valid e-mail address', () => {
      cy.get('#ctl00$Main$ProposerEmail').type('test@dotsys.co.uk{enter}');
      
    });
  
    it('should allow you proceed with another valid e-mail address', () => {
        cy.get('#ctl00$Main$ProposerEmail').type('test@dotsys.com{enter}');
        
      });

      it('should allow proceeding with valid email (UK)', () => {
        cy.get('#ctl00_Main_ProposerEmail').type('test@dotsys.co.uk');
        // Optional assertion: Check if there are no error messages visible
        cy.get('.validationError').should('not.exist');
      });
    
      it('should allow proceeding with valid email (US)', () => {
        cy.get('#ctl00_Main_ProposerEmail').clear().type('test@dotsys.com');
        // Optional assertion: Check if there are no error messages visible
        cy.get('.validationError').should('not.exist');
      });
    
      it('should allow proceeding with valid email (Ireland)', () => {
        cy.get('#ctl00_Main_ProposerEmail').clear().type('test@dotsys.ie');
        // Optional assertion: Check if there are no error messages visible
        cy.get('.validationError').should('not.exist');
      });
    
      it('should allow proceeding with valid email (France)', () => {
        cy.get('#ctl00_Main_ProposerEmail').clear().type('test@dotsys.fr');
        // Optional assertion: Check if there are no error messages visible
        cy.get('.validationError').should('not.exist');
      });
    
      // Negative Test (Invalid Email Address)
      it('should display "Please enter a valid e-mail address" error for invalid input', () => {
        cy.get('#ctl00_Main_ProposerEmail').clear().type('A{enter}');
        cy.get('#ctl00_Main_RF_ProposerEmail.validationError').should('be.visible');
      });
    
      // Test for Email Length Limit
      it('should limit input to 80 characters', () => {
        cy.get('#ctl00_Main_ProposerEmail')
          .type('ThisIsAReallyLongEmailAddressThatShouldHopefullyBeTruncated@verylongemaildomain.com')
          .should('have.value', 'ThisIsAReallyLongEmailAddressThatShouldHopefullyBeTruncated@verylongemaildomain.com'.substring(0, 80)); // Truncate to 80 characters
      });
  });
  