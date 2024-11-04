describe('visit homepage', () => {
    beforeEach(() => {
      cy.visit('https://www.its4women.ie/');
      cy.get('#onetrust-accept-btn-handler').click();
      cy.get('.framer-1y09im0').click();
    });
  
    it('should display "Forename Required" error when pressing Enter in an empty field', () => {
      cy.get('#ctl00$Main$ProposerSurname')
        .should('be.visible') // Ensure the element is visible
        .focus()
        .type('{enter}');
  
      cy.contains('Surname Required')
        .should('be.visible')
        .and('have.css', 'color', 'rgb(224, 62, 49)');
    });
  
    //   it('should allow proceeding to the next field on Tab press', () => {
    //     // Focus on the forename input field
    //     cy.get('#ctl00_Main_ProposerForename').focus().type('{tab}');
  
    //     // Verify focus is on the next field
    //     cy.get('#ctl00_Main_ProposerSurname').should('be.focused');
    //   });
  
    it('should display "Surname Required" error on form submission without any details', () => {
      // Trigger form submission (adjust the selector as needed)
      cy.get('ctl00$Main$ProposerSurname')
        .should('be.visible') // Ensure the element is visible
        .focus()
        .type('{enter}');
  
      // Verify the error message
      cy.contains('Surname Required').should('be.visible');
    });
  
    it('should display "Please enter your full surname" error on inserting A', () => {
      // Type "A" into the forename field
      cy.get('#ctl00$Main$ProposerSurname').type('A{enter}');
  
      // Verify the error message
      cy.contains('Please enter your full surname').should('be.visible')
      .and('have.css', 'color', 'rgb(224, 62, 49)');
    });
  
    it('should display "Please enter your full surname" error on inserting 1', () => {
      cy.get('#ctl00$Main$ProposerSurname').type('1{enter}');
  
          // Verify the error message
      cy.contains('Please enter your full surname').should('be.visible')
      .and('have.css', 'color', 'rgb(224, 62, 49)');
    });
  
    it('should display "Please enter your full surname" error on inserting a special character', () => {
      cy.get('#ctl00$Main$ProposerSurname').type('*{enter}');
      
          // Verify the error message
      cy.contains('Please enter your full surname').should('be.visible')
      .and('have.css', 'color', 'rgb(224, 62, 49)');
    });
  
  
    it('should allow you proceed with a valid name', () => {
      cy.get('#ctl00$Main$ProposerSurname').type('Darragh{enter}');
      
    });
  
    it('should display "Please enter your full surname"a error on inserting an invalid name', () => {
      cy.get('#ctl00$Main$ProposerSurname').type('Darragh 1{enter}');
      
      cy.contains('Please enter your full surname').should('be.visible')
      .and('have.css', 'color', 'rgb(224, 62, 49)');;
    });
  
    it('should allow you proceed with a valid name with space', () => {
      cy.get('#ctl00$Main$ProposerSurname').type('Darragh Rooney{enter}');
      
    });
  
    it('should limit input to 30 characters', () => {
      cy.get('#ctl00$Main$ProposerSurname')
        .type('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNO') // Type 30 characters
        .should('have.value', 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNO') // Verify the input value
        .wait(500) // Add a short delay
        .type('P'); // Attempt to type the 31st character
    
      // Assert that the input value remains unchanged (30 characters)
      cy.get('#ctl00$Main$ProposerSurname').should('have.value', 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNO');
    });
  });
  