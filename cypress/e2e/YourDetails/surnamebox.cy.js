describe('visit homepage', () => {
  beforeEach(() => {
    cy.visit('https://www.its4women.ie/');
    cy.get('#onetrust-accept-btn-handler').click();
    cy.get('.framer-1y09im0').click();
  });

  it('should display "Surname Required" error when pressing Enter in an empty field', () => {
    cy.get('#ctl00_Main_ProposerSurname')
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
    cy.get('#ctl00_Main_ProposerTelephone').type('07922343359{enter}');
    cy.get('#ctl00_Main_ProposerTitle')
      .select('Mrs')
      .should('have.value', 'Mrs');
    cy.get('#ctl00_Main_ProposerForename').type('Darragh{enter}');
    cy.get('#ctl00_Main_ProposerEmail').type('test@dotsys.com{enter}');
    cy.get('#ctl00_Main_Continue1').click();

    // Verify the error message
    cy.contains('Surname Required').should('be.visible');
  });

  it('should display "Please enter your full surname" error on inserting A', () => {
    // Type "A" into the forename field
    cy.get('#ctl00_Main_ProposerSurname').type('A{enter}');

    // Verify the error message
    cy.contains('Please enter your full surname')
      .should('be.visible')
      .and('have.css', 'color', 'rgb(255, 0, 0)');
  });

  it('should display "Please enter your full surname" error on inserting 1', () => {
    cy.get('#ctl00_Main_ProposerSurname').type('1{enter}');

    // Verify the error message
    cy.contains('Please enter your full surname')
      .should('be.visible')
      .and('have.css', 'color', 'rgb(255, 0, 0)');
  });

  it('should display "Please enter your full surname" error on inserting a special character', () => {
    cy.get('#ctl00_Main_ProposerSurname').type('*{enter}');

    // Verify the error message
    cy.contains('Please enter your full surname')
      .should('be.visible')
      .and('have.css', 'color', 'rgb(255, 0, 0)');
  });

  it('should allow you proceed with a valid name', () => {
    cy.get('#ctl00_Main_ProposerSurname').type('Darragh{enter}');
  });

  it('should display "Please enter your full surname" error on inserting an invalid name', () => {
    cy.get('#ctl00_Main_ProposerSurname').type('Darragh 1{enter}');

    cy.contains('Please enter your full surname')
      .should('be.visible')
      .and('have.css', 'color', 'rgb(255, 0, 0)');
  });

  it('should allow you proceed with a valid name with space', () => {
    cy.get('#ctl00_Main_ProposerSurname').type('Darragh Rooney{enter}');
    cy.get('#ctl00_Main_ProposerForename').type('Colin Christopher{enter}');

    cy.get('#ctl00_Main_ProposerTelephone').type('07922343359{enter}');
    cy.get('#ctl00_Main_ProposerTitle')
      .select('Mrs')
      .should('have.value', 'Mrs');
    cy.get('#ctl00_Main_ProposerEmail').type('test@dotsys.com{enter}');
    cy.get('#ctl00_Main_Continue1').click().wait(500);

    // Verify transition to Your Information page
    cy.get('#ctl00_Main_UpdatePanel11 > a > .ellipsed > .panel-title')
      .should('be.visible')
      .and('have.text', '2. Your Information');
  });

  it('should limit input to 30 characters', () => {
    cy.get('#ctl00_Main_ProposerSurname')
      .type('abcdefghijklmnopqrstuvwxyzABCD') // Type 30 characters
      .wait(500) // Add a short delay
      .type('E'); // Attempt to type the 31st character

    // Assert that the input value remains unchanged (30 characters)
    cy.get('#ctl00_Main_ProposerSurname').should(
      'have.value',
      'abcdefghijklmnopqrstuvwxyzABCD'
    );
  });
});
