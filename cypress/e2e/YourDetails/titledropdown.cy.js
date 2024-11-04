describe('Visit homepage and test dropdown interactions', () => {
  beforeEach(() => {
    cy.visit('https://www.its4women.ie/');
    cy.get('#onetrust-accept-btn-handler').click(); // Accept cookies
    cy.get('.framer-1y09im0').click(); // Interact with necessary page element
  });

  it('should check all dropdown options', () => {
    const expectedOptions = ['', 'Mrs', 'Miss', 'Ms', 'Mr', 'Dr'];
    cy.get('#ctl00_Main_ProposerTitle option').should('have.length', 6);

    cy.get('#ctl00_Main_ProposerTitle option').each(($option, index) => {
      cy.wrap($option)
        .invoke('text')
        .then((actualText) => {
          const normalizedText = actualText.trim().replace(/\s+/g, ' ');
          expect(normalizedText).to.equal(expectedOptions[index]);
        });
    });
  });

  it('should navigate through dropdown options using the select command', () => {
    cy.get('#ctl00_Main_ProposerTitle')
      .select('Mrs')
      .should('have.value', 'Mrs');
    cy.get('#ctl00_Main_ProposerTitle')
      .select('Miss')
      .should('have.value', 'Miss');
    cy.get('#ctl00_Main_ProposerTitle').select('Ms').should('have.value', 'Ms');
  });

  it('should select "Mrs" when typing "M" in the dropdown', () => {
    cy.get('#ctl00_Main_ProposerTitle')
      .select('Mrs')
      .should('have.value', 'Mrs');
  });

  it('should select "Dr" when typing "D" in the dropdown', () => {
    cy.get('#ctl00_Main_ProposerTitle').select('Dr').should('have.value', 'Dr');
  });

  it('should not select a value when typing "A" in the dropdown', () => {
    cy.get('#ctl00_Main_ProposerTitle').select(' ').should('have.value', ' ');
    cy.get('#ctl00_Main_ProposerTitle').type('A');
    cy.get('#ctl00_Main_ProposerTitle').should('have.value', ' ');
  });

  it('should not select a value when typing "1" in the dropdown', () => {
    cy.get('#ctl00_Main_ProposerTitle').select(' ').should('have.value', ' ');
    cy.get('#ctl00_Main_ProposerTitle').type('1');
    cy.get('#ctl00_Main_ProposerTitle').should('have.value', ' ');
  });

  it('should not select a value when typing "!" in the dropdown', () => {
    cy.get('#ctl00_Main_ProposerTitle').select(' ').should('have.value', ' ');
    cy.get('#ctl00_Main_ProposerTitle').type('!');
    cy.get('#ctl00_Main_ProposerTitle').should('have.value', ' ');
  });

  it('should select "Mrs" when clicked', () => {
    cy.get('#ctl00_Main_ProposerTitle')
      .select('Mrs')
      .should('have.value', 'Mrs');
  });

  it('should select "Miss" when clicked', () => {
    cy.get('#ctl00_Main_ProposerTitle')
      .select('Miss')
      .should('have.value', 'Miss');
  });

  it('should select "Ms" when clicked', () => {
    cy.get('#ctl00_Main_ProposerTitle').select('Ms').should('have.value', 'Ms');
  });

  it('should select "Mr" when clicked', () => {
    cy.get('#ctl00_Main_ProposerTitle').select('Mr').should('have.value', 'Mr');
  });

  it('should select "Dr" when clicked', () => {
    cy.get('#ctl00_Main_ProposerTitle').select('Dr').should('have.value', 'Dr');
  });

  it('should show an error message when selecting the blank option', () => {
    // Select the blank option and verify it's selected
    cy.get('#ctl00_Main_ProposerTitle').select(' ').should('have.value', ' ');
  
    // Fill out other form fields
    cy.get('#ctl00_Main_ProposerTelephone').type('07922343359');
    cy.get('#ctl00_Main_ProposerForename').type('Colin');
    cy.get('#ctl00_Main_ProposerSurname').type('Darragh');
    cy.get('#ctl00_Main_ProposerEmail').type('test@dotsys.com');
  
    // Submit the form
    cy.get('#ctl00_Main_Continue1').click();
  
    // Verify the error message for the title field
    cy.get('#ctl00_Main_RF_ProposerTitle').should('have.text', '* Title Required'); // Adjust selector if needed
  });
  
  it('should show an error message when submitting without selecting a title', () => {
    // Fill out the form without selecting a title
    cy.get('#ctl00_Main_ProposerTelephone').type('07922343359');
    cy.get('#ctl00_Main_ProposerForename').type('Colin');
    cy.get('#ctl00_Main_ProposerSurname').type('Darragh');
    cy.get('#ctl00_Main_ProposerEmail').type('test@dotsys.com');
  
    // Submit the form
    cy.get('#ctl00_Main_Continue1').click();
  
    // Verify the error message for the title field
    cy.get('#ctl00_Main_RF_ProposerTitle').should('have.text', '* Title Required'); // Adjust selector if needed
  }); 
});
