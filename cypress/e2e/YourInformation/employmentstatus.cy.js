describe('Employment Status Dropdown Tests', () => {
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
    
  it('should display all expected options in the Employment Status dropdown', () => {
    cy.get('#ctl00_Main_EmploymentStatus').find('option').then(options => {
      const actualOptions = [...options].map(option => option.innerText.trim());
      const expectedOptions = [
        '--',
        'Employed',
        'Company Director',
        'Self Employed',
        'Unemployed',
        'Retired',
        'Household Duties',
        'Student',
        'Disability',
        'Voluntary Work'
      ];
      expect(actualOptions).to.deep.equal(expectedOptions);
    });
  });

  it('should display the dropdown menu and not proceed without selection', () => {
    cy.get('#ctl00_Main_Continue2').click();
    
    cy.get('#ctl00_Main_RF_EmploymentStatus').should('be.visible').and('contain', '* Employment Status');
  });
  
  it('should display validation error when proceeding without selection', () => {
    cy.get('#ctl00_Main_EmploymentStatus').focus();
    cy.get('#ctl00_Main_Continue2').click();
    cy.get('#ctl00_Main_RF_EmploymentStatus').should('be.visible').and('contain', '* Employment Status');
  });


  it('should navigate freely through the dropdown using arrow keys', () => {
    cy.get('#ctl00_Main_EmploymentStatus').focus().type('{downarrow}{uparrow}');
  });


  it('should show Company Director when selected', () => {
    cy.get('#ctl00_Main_EmploymentStatus').select('Company Director').should('have.value', 'C');
    cy.get('#ctl00_Main_lblOccupation').should('not.exist');
  });

  it('should show Self Employed and display the occupation question', () => {
    cy.get('#ctl00_Main_EmploymentStatus').select('Self Employed').should('have.value', 'S');
    cy.get('#ctl00_Main_lblOccupation').should('be.visible');
  });

  // Occupation Input Tests
  it('should display error when pressing Enter without entering details in the occupation input', () => {
    cy.get('#ctl00_Main_EmploymentStatus').select('Self Employed').should('have.value', 'S');
    cy.get('#ctl00_Main_txtOccupation').focus().type('{enter}'); 
    cy.get('#ctl00_Main_RF_Occupation').should('be.visible').and('contain', '* Occupation');
  });


  it('should show a list of occupations when entering Art', () => {
    cy.get('#ctl00_Main_EmploymentStatus').select('Self Employed').should('have.value', 'S');
    cy.get('#ctl00_Main_txtOccupation').type('Art');
    cy.get('.ui-autocomplete').should('be.visible')
      .then(() => cy.get('.ui-autocomplete li').eq(0).click());

      cy.get('#ctl00_Main_txtOccupation')
      .invoke('val') // Get the value of the input
      .should('include', 'Art'); 
  });

  it('should show a list of occupations when entering Mechanic', () => {
    cy.get('#ctl00_Main_EmploymentStatus').select('Self Employed').should('have.value', 'S');
    cy.get('#ctl00_Main_txtOccupation').type('Mechanic');
    cy.get('.ui-autocomplete').should('be.visible')
      .then(() => cy.get('.ui-autocomplete li').eq(0).click());

      cy.get('#ctl00_Main_txtOccupation')
      .invoke('val') // Get the value of the input
      .should('include', 'Mechanic'); 
  });

  it('should display "Teacher" when "tea" is entered and the first suggestion is selected', () => {
    cy.get('#ctl00_Main_EmploymentStatus').select('Self Employed').should('have.value', 'S');
    cy.get('#ctl00_Main_txtOccupation').type('tea');
  
    // Wait for the suggestion list to appear and select the first suggestion
    cy.get('.ui-autocomplete').should('be.visible')
      .then(() => cy.get('.ui-autocomplete li').eq(0).click()); // Select the Teacher option
  
      cy.get('#ctl00_Main_txtOccupation')
      .invoke('val') // Get the value of the input
      .should('include', 'Teacher'); 
  });

  it('should display "Teacher" when "teac" is entered and selected using arrow keys', () => {
    cy.get('#ctl00_Main_EmploymentStatus').select('Self Employed').should('have.value', 'S');
    cy.get('#ctl00_Main_txtOccupation').type('teac{downarrow}{enter}');

    // Wait for the suggestion list to appear and select the ninth option (Teacher)
    cy.get('.ui-autocomplete').should('be.visible')
        .then(() => cy.get('.ui-autocomplete li').eq(8).click()); // Select the Teacher option

        cy.get('#ctl00_Main_txtOccupation')
        .invoke('val') // Get the value of the input
        .should('include', 'Teacher'); 
});
});