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
    
    it('should display correct values in the Employment Status dropdown', () => {
      const expectedValues = [
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
      
      cy.get('#ctl00_Main_EmploymentStatus')
        .find('option')
        .then(($options) => {
          const actual = [...$options].map(option => option.innerText.trim());
          expect(actual).to.deep.equal(expectedValues);
        });
    });
  
    it('should not allow proceeding when pressing enter with no selection', () => {
      cy.get('#ctl00_Main_EmploymentStatus').type('{enter}');
      cy.get('#ctl00_Main_RF_EmploymentStatus').should('be.visible')
        .and('contain', '* Employment Status');
    });
  
    it('should show an error message when attempting to proceed without selecting a value', () => {
      cy.get('#ctl00_Main_EmploymentStatus').focus().tab();
      cy.get('#ctl00_Main_RF_EmploymentStatus').should('be.visible')
        .and('contain', '* Employment Status');
    });
  
    it('should show no details in the dropdown when entering invalid characters', () => {
      cy.get('#ctl00_Main_EmploymentStatus').type('A');
      cy.get('#ctl00_Main_EmploymentStatus').should('have.value', '');
  
      cy.get('#ctl00_Main_EmploymentStatus').clear().type('1');
      cy.get('#ctl00_Main_EmploymentStatus').should('have.value', '');
  
      cy.get('#ctl00_Main_EmploymentStatus').clear().type('*');
      cy.get('#ctl00_Main_EmploymentStatus').should('have.value', '');
    });
  
    it('should allow navigating through the dropdown using arrow keys', () => {
      cy.get('#ctl00_Main_EmploymentStatus').focus();
      cy.get('#ctl00_Main_EmploymentStatus').type('{downarrow}');
      cy.get('#ctl00_Main_EmploymentStatus').should('have.value', 'E'); // First option should be Employed
    });
  
    it('should select "Employed" and show occupation question', () => {
      cy.get('#ctl00_Main_EmploymentStatus').select('Employed');
      cy.get('#ctl00_Main_EmpStatusHidden').should('have.value', 'E'); // Hidden field should update
      // Check if the occupation question is visible (add selector based on your HTML)
      cy.get('#occupation-question-selector').should('be.visible'); // Replace with actual selector for occupation question
    });
  
    it('should select "Retired" and not show occupation question', () => {
      cy.get('#ctl00_Main_EmploymentStatus').select('Retired');
      cy.get('#ctl00_Main_EmpStatusHidden').should('have.value', 'R');
      cy.get('#occupation-question-selector').should('not.be.visible'); // Replace with actual selector for occupation question
    });
  
    it('should select "Self Employed" and show occupation question', () => {
      cy.get('#ctl00_Main_EmploymentStatus').select('Self Employed');
      cy.get('#ctl00_Main_EmpStatusHidden').should('have.value', 'S');
      cy.get('#occupation-question-selector').should('be.visible'); // Replace with actual selector for occupation question
    });
  
    it('should select "Household Duties" and not show occupation question', () => {
      cy.get('#ctl00_Main_EmploymentStatus').select('Household Duties');
      cy.get('#ctl00_Main_EmpStatusHidden').should('have.value', 'H');
      cy.get('#occupation-question-selector').should('not.be.visible'); // Replace with actual selector for occupation question
    });
  
    it('should show error when pressing enter in occupation input without details', () => {
      cy.get('#occupation-input-selector').focus().type('{enter}'); // Replace with actual selector for occupation input
      cy.get('#occupation-error-message-selector').should('be.visible') // Replace with actual error message selector
        .and('contain', 'Please select your occupation');
    });
  
    it('should show a list of occupations when entering a valid query', () => {
      cy.get('#occupation-input-selector').type('Art'); // Replace with actual selector for occupation input
      cy.get('#occupation-suggestions-selector').should('exist'); // Check that suggestions appear
      // Add more checks to validate if specific suggestions appear
    });
  
    it('should select a valid occupation from suggestions', () => {
      cy.get('#occupation-input-selector').type('tea');
      cy.get('#occupation-suggestions-selector').contains('Teacher').click(); // Replace with actual selector
      cy.get('#occupation-input-selector').should('have.value', 'Teacher');
    });
  
    it('should not allow proceeding without selecting occupation from dropdown', () => {
      cy.get('#occupation-input-selector').type('teacher'); // Type but don't select
      cy.get('#occupation-input-selector').type('{enter}'); // Attempt to proceed
      cy.get('#occupation-error-message-selector').should('be.visible') // Replace with actual error message selector
        .and('contain', 'Please select your occupation');
    });
  });
  