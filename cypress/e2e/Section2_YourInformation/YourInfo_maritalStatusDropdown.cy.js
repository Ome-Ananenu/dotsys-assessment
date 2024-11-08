describe('Tests for Marital Status Dropdown', () => {
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

  it('should display an error message when proceeding without selection', () => {
    cy.get('#ctl00_Main_Continue2').click();
    cy.get('#ctl00_Main_ProposerMaritalStatus')
      .parent()
      .within(() => {
        cy.contains('* Marital Status').should('be.visible').and('have.css', 'color', 'rgb(224, 62, 49)'); // Red color
      });
  });

  it('should display all valid options in the dropdown', () => {
    const expectedOptions = [
      '--',
      'Married',
      'Single',
      'Divorced',
      'Widowed',
      'Separated',
      "Mar'd Commonlaw",
      'Partnered'
    ];

    cy.get('#ctl00_Main_ProposerMaritalStatus').find('option').then(options => {
      const actualOptions = [...options].map(option => option.text);
      expect(actualOptions).to.deep.equal(expectedOptions);
    });
  });

  it('should display an error message when selecting "--" and proceeding', () => {
    cy.get('#ctl00_Main_ProposerMaritalStatus').select('--');
    cy.get('#ctl00_Main_Continue2').click();
    cy.contains('* Marital Status').should('be.visible');
  });

  it('should allow navigation through the dropdown using arrow keys', () => {
    cy.get('#ctl00_Main_ProposerMaritalStatus').focus().type('{downarrow}').type('{uparrow}');
    cy.get('#ctl00_Main_ProposerMaritalStatus').should('have.focus');
  });

  it('should select "Single" when "S" is entered', () => {
    cy.get('#ctl00_Main_ProposerMaritalStatus').type('S');
    cy.get('#ctl00_Main_ProposerMaritalStatus').should('have.value', 'S'); // Assumes "Single" value is "S"
  });

  it('should not select any value when "1" is entered', () => {
    cy.get('#ctl00_Main_ProposerMaritalStatus').type('1');
    cy.get('#ctl00_Main_ProposerMaritalStatus').should('have.value', ''); // Assumes "1" is not a valid option
  });

  it('should not select any value when "!" is entered', () => {
    cy.get('#ctl00_Main_ProposerMaritalStatus').type('!');
    cy.get('#ctl00_Main_ProposerMaritalStatus').should('have.value', ''); // Assumes "!" is not a valid option
  });

  it('should select "Married" and have value "M"', () => {
    cy.get('#ctl00_Main_ProposerMaritalStatus').select('Married');
    cy.get('#ctl00_Main_ProposerMaritalStatus').should('have.value', 'M');
  });

  it('should select "Single" and have value "S"', () => {
    cy.get('#ctl00_Main_ProposerMaritalStatus').select('Single');
    cy.get('#ctl00_Main_ProposerMaritalStatus').should('have.value', 'S');
  });

  it('should select "Divorced" and have value "D"', () => {
    cy.get('#ctl00_Main_ProposerMaritalStatus').select('Divorced');
    cy.get('#ctl00_Main_ProposerMaritalStatus').should('have.value', 'D');
  });

  it('should select "Widowed" and have value "W"', () => {
    cy.get('#ctl00_Main_ProposerMaritalStatus').select('Widowed');
    cy.get('#ctl00_Main_ProposerMaritalStatus').should('have.value', 'W');
  });

  it('should select "Separated" and have value "A"', () => {
    cy.get('#ctl00_Main_ProposerMaritalStatus').select('Separated');
    cy.get('#ctl00_Main_ProposerMaritalStatus').should('have.value', 'A');
  });

  it('should select "Mar\'d Commonlaw" and have value "C"', () => {
    cy.get('#ctl00_Main_ProposerMaritalStatus').select("Mar'd Commonlaw");
    cy.get('#ctl00_Main_ProposerMaritalStatus').should('have.value', 'C');
  });

  it('should select "Partnered" and have value "P"', () => {
    cy.get('#ctl00_Main_ProposerMaritalStatus').select('Partnered');
    cy.get('#ctl00_Main_ProposerMaritalStatus').should('have.value', 'P');
  });
});
