describe('Homepage Form Validation Tests', () => {
  beforeEach(() => {
    cy.visit('https://www.its4women.ie/');
    cy.get('#onetrust-accept-btn-handler').click();
    cy.get('.framer-1y09im0').click();
  });

  it('displays "Surname Required" error when submitting an empty surname field', () => {
    cy.get('#ctl00_Main_ProposerSurname')
      .should('be.visible')
      .focus()
      .type('{enter}');
    
    cy.contains('Surname Required')
      .should('be.visible')
      .and('have.css', 'color', 'rgb(224, 62, 49)');
  });

  it('displays "Surname Required" error on form submission without surname', () => {
    cy.get('#ctl00_Main_ProposerTelephone').type('07922343359{enter}');
    cy.get('#ctl00_Main_ProposerTitle').select('Mrs').should('have.value', 'Mrs');
    cy.get('#ctl00_Main_ProposerForename').type('Darragh{enter}');
    cy.get('#ctl00_Main_ProposerEmail').type('test@dotsys.com{enter}');
    cy.get('#ctl00_Main_Continue1').click();

    cy.contains('Surname Required').should('be.visible');
  });

  it('displays "Please enter your full surname" error for single-character input', () => {
    cy.get('#ctl00_Main_ProposerSurname').type('A{enter}');
    cy.contains('Please enter your full surname')
      .should('be.visible')
      .and('have.css', 'color', 'rgb(255, 0, 0)');
  });

  it('displays "Please enter your full surname" error for numeric input', () => {
    cy.get('#ctl00_Main_ProposerSurname').type('1{enter}');
    cy.contains('Please enter your full surname')
      .should('be.visible')
      .and('have.css', 'color', 'rgb(255, 0, 0)');
  });

  it('displays "Please enter your full surname" error for special character input', () => {
    cy.get('#ctl00_Main_ProposerSurname').type('*{enter}');
    cy.contains('Please enter your full surname')
      .should('be.visible')
      .and('have.css', 'color', 'rgb(255, 0, 0)');
  });

  it('allows submission with a valid surname', () => {
    cy.get('#ctl00_Main_ProposerSurname').type('Darragh{enter}');
  });

  it('displays "Please enter your full surname" error for invalid surname with numbers', () => {
    cy.get('#ctl00_Main_ProposerSurname').type('Darragh 1{enter}');
    cy.contains('Please enter your full surname')
      .should('be.visible')
      .and('have.css', 'color', 'rgb(255, 0, 0)');
  });

  it('allows submission with a valid surname containing spaces', () => {
    cy.get('#ctl00_Main_ProposerSurname').type('Darragh Rooney{enter}');
    cy.get('#ctl00_Main_ProposerForename').type('Colin Christopher{enter}');
    cy.get('#ctl00_Main_ProposerTelephone').type('07922343359{enter}');
    cy.get('#ctl00_Main_ProposerTitle').select('Mrs').should('have.value', 'Mrs');
    cy.get('#ctl00_Main_ProposerEmail').type('test@dotsys.com{enter}');
    cy.get('#ctl00_Main_Continue1').click().wait(500);

    cy.get('#ctl00_Main_UpdatePanel11 > a > .ellipsed > .panel-title')
      .should('be.visible')
      .and('have.text', '2. Your Information');
  });

  it('limits surname input to 30 characters', () => {
    const maxLengthText = 'abcdefghijklmnopqrstuvwxyzABCD';
    
    cy.get('#ctl00_Main_ProposerSurname')
      .type(maxLengthText)
      .wait(500)
      .type('E');
    
    cy.get('#ctl00_Main_ProposerSurname').should('have.value', maxLengthText);
  });
});
