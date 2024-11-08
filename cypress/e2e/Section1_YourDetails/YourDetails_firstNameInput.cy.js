describe('Tests for First Name Input Field', () => {
  beforeEach(() => {
    cy.visit('https://www.its4women.ie/');
    cy.get('#onetrust-accept-btn-handler').click();
    cy.get('.framer-1y09im0').click();
  });

  it('displays "Forename Required" error when submitting an empty forename field', () => {
    cy.get('#ctl00_Main_ProposerForename')
      .should('be.visible')
      .focus()
      .type('{enter}');
    
    cy.contains('Forename Required')
      .should('be.visible')
      .and('have.css', 'color', 'rgb(224, 62, 49)');
  });

  it('displays "Forename Required" error on form submission without forename', () => {
    cy.get('#ctl00_Main_ProposerTelephone').type('07922343359{enter}');
    cy.get('#ctl00_Main_ProposerTitle').select('Mrs').should('have.value', 'Mrs');
    cy.get('#ctl00_Main_ProposerSurname').type('Darragh{enter}');
    cy.get('#ctl00_Main_ProposerEmail').type('test@dotsys.com{enter}');
    cy.get('#ctl00_Main_Continue1').click();

    cy.contains('Forename Required').should('be.visible');
  });

  it('displays "Please enter your full forename" error when entering a single letter in forename field', () => {
    cy.get('#ctl00_Main_ProposerForename').type('A{enter}');
    cy.contains('Please enter your full forename').should('be.visible');
  });

  it('displays "Please enter your full forename" error when entering a number in forename field', () => {
    cy.get('#ctl00_Main_ProposerForename').type('1{enter}');
    cy.contains('Please enter your full forename').should('be.visible');
  });

  it('displays "Please enter your full forename" error when entering a special character in forename field', () => {
    cy.get('#ctl00_Main_ProposerForename').type('!{enter}');
    cy.contains('Please enter your full forename').should('be.visible');
  });

  it('allows proceeding when a valid forename is entered', () => {
    cy.get('#ctl00_Main_ProposerForename').type('Colin{enter}');
  });

  it('displays "Please enter your full forename" error when entering an invalid forename', () => {
    cy.get('#ctl00_Main_ProposerForename').type('Colin 1{enter}');
    cy.contains('Please enter your full forename').should('be.visible');
  });

  it('allows proceeding with a valid forename containing spaces', () => {
    cy.get('#ctl00_Main_ProposerForename').type('Colin Christopher{enter}');
    cy.get('#ctl00_Main_ProposerTelephone').type('07922343359{enter}');
    cy.get('#ctl00_Main_ProposerTitle').select('Mrs').should('have.value', 'Mrs');
    cy.get('#ctl00_Main_ProposerSurname').type('Darragh{enter}');
    cy.get('#ctl00_Main_ProposerEmail').type('test@dotsys.com{enter}');
    cy.get('#ctl00_Main_Continue1').click();

    cy.get('#ctl00_Main_UpdatePanel11 > a > .ellipsed > .panel-title')
      .should('be.visible')
      .and('have.text', '2. Your Information');
  });

  it('limits the forename input to 30 characters', () => {
    const maxLengthText = 'abcdefghijklmnopqrstuvwxyzABCD';
    
    cy.get('#ctl00_Main_ProposerForename')
      .type(maxLengthText) // Type 30 characters
      .wait(500)
      .type('E'); // Attempt to add a 31st character
    
    cy.get('#ctl00_Main_ProposerForename').should('have.value', maxLengthText);
  });
});
