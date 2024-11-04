describe('visit homepage', () => {
  beforeEach(() => {
    cy.visit('https://www.its4women.ie/');
    cy.get('#onetrust-accept-btn-handler').click();
    cy.get('.framer-1y09im0').click();
  });

  it('should display "*Contact Number (Preferably Mobile)" error on trying to proceed without entering any details', () => {
    // Focus on the email input field
    cy.get('#ctl00_Main_ProposerTelephone').focus();

    // Press Enter
    cy.focused().type('{enter}');

    // Verify the error message
    cy.get('#ctl00_Main_RequiredFieldValidator16')
      .should('have.text', '* Contact Number (Preferably Mobile)')
      .and('have.css', 'color', 'rgb(224, 62, 49)');
  });

  it('should not allow non-numeric characters in the contact number field', () => {
    cy.get('#ctl00_Main_ProposerTelephone').type('A');

    // Assert that the input value is empty
    cy.get('#ctl00_Main_ProposerTelephone').should('have.value', '');
  });

  it('should display "Invalid Telephone Number" error on inserting 1', () => {
    cy.get('#ctl00_Main_ProposerTelephone').type('1{enter}');
    cy.get('#ctl00_Main_ProposerTitle').select('Mrs').should('have.value', 'Mrs');
    cy.get('#ctl00_Main_ProposerForename').type('Colin{enter}');
    cy.get('#ctl00_Main_ProposerSurname').type('Darragh{enter}');
    cy.get('#ctl00_Main_ProposerEmail').type('test@dotsys.co.uk{enter}');
    cy.get('#ctl00_Main_Continue1').click();

    // Verify the error message
    cy.get('#ctl00_Main_CustomValidator3')
  .invoke('text')
  .then((text) => {
    // Normalize whitespace and trim the text
    const normalizedText = text.replace(/\s+/g, ' ').trim();
    expect(normalizedText).to.contain('* Invalid Telephone number');
  });

  });

  it('should not allow special characters in the contact number field', () => {
    cy.get('#ctl00_Main_ProposerTelephone').type('*');

    // Assert that the input value is empty
    cy.get('#ctl00_Main_ProposerTelephone').should('have.value', '');
  });

  it('should allow you proceed with a valid e-mail address', () => {
    cy.get('#ctl00_Main_ProposerTelephone').type('07922343359{enter}');
    cy.get('#ctl00_Main_ProposerTitle')
      .select('Mrs')
      .should('have.value', 'Mrs');
    cy.get('#ctl00_Main_ProposerForename').type('Colin{enter}');
    cy.get('#ctl00_Main_ProposerSurname').type('Darragh{enter}');
    cy.get('#ctl00_Main_ProposerEmail').type('test@dotsys.co.uk{enter}');
    cy.get('#ctl00_Main_Continue1').click();

    // Verify transition to Your Information page
    cy.get('#ctl00_Main_UpdatePanel11 > a > .ellipsed > .panel-title')
      .should('be.visible')
      .and('have.text', '2. Your Information');
  });

  it('should allow you proceed with test@dotsys.com e-mail address', () => {

  cy.get('#ctl00_Main_ProposerTelephone').type('07922343359{enter}');
  cy.get('#ctl00_Main_ProposerTitle')
    .select('Mrs')
    .should('have.value', 'Mrs');
  cy.get('#ctl00_Main_ProposerForename').type('Colin{enter}');
  cy.get('#ctl00_Main_ProposerSurname').type('Darragh{enter}');
  cy.get('#ctl00_Main_ProposerEmail').type('test@dotsys.com{enter}');
  cy.get('#ctl00_Main_Continue1').click();

  // Verify transition to Your Information page
  cy.get('#ctl00_Main_UpdatePanel11 > a > .ellipsed > .panel-title')
    .should('be.visible')
    .and('have.text', '2. Your Information');
  });



  it('should allow valid UK mobile number', () => {
    cy.get('#ctl00_Main_ProposerTelephone').type('07922343359{enter}');
    cy.get('#ctl00_Main_ProposerTitle')
      .select('Mrs')
      .should('have.value', 'Mrs');
    cy.get('#ctl00_Main_ProposerForename').type('Colin{enter}');
    cy.get('#ctl00_Main_ProposerSurname').type('Darragh{enter}');
    cy.get('#ctl00_Main_ProposerEmail').type('test@dotsys.com{enter}');
    cy.get('#ctl00_Main_Continue1').click();
  
    // Verify transition to Your Information page
    cy.get('#ctl00_Main_UpdatePanel11 > a > .ellipsed > .panel-title')
      .should('be.visible')
      .and('have.text', '2. Your Information');
  });

  it('should not allow invalid character (A)', () => {
    cy.get('#ctl00_Main_ProposerTelephone').type('07922343359A');
    // Assert that the input value is truncated
    cy.get('#ctl00_Main_ProposerTelephone').should('have.value', '07922343359');
  });

  it('should limit contact number to 15 characters', () => {
    cy.get('#ctl00_Main_ProposerTelephone').type('0792234335912345');
    // Assert that the input value is truncated
    cy.get('#ctl00_Main_ProposerTelephone').should('have.value', '079223433591234');
  });

  it('should not allow international format with +', () => {
    cy.get('#ctl00_Main_ProposerTelephone').type('+447922343359A');
    // Assert that the input value is truncated
    cy.get('#ctl00_Main_ProposerTelephone').should(
      'have.value',
      '447922343359'
    );
  });
});
