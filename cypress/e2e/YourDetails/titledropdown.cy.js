describe('visit homepage', () => {
  beforeEach(() => {
    cy.visit('https://www.its4women.ie/');
    cy.get('#onetrust-accept-btn-handler').click();
    cy.get('.framer-1y09im0').click();
  });

//   it('should check the dropdown options', () => {
//     cy.get('#ctl00_Main_ProposerTitle option')
//       .should('have.length', 6)
//       .each(($option, index) => {
//         const expectedOptions = ['', 'Mrs', 'Miss', 'Ms', 'Mr', 'Dr'];

//         // Normalize whitespace and compare text
//         cy.wrap($option)
//           .invoke('text')
//           .then((actualText) => {
//             const normalizedActualText = actualText.trim().replace(/\s+/g, ' ');
//             expect(normalizedActualText).to.equal(
//               expectedOptions[index].trim()
//             );
//           });
//       });
//   });

it('should navigate through dropdown options using the select command', () => {
    
    // Select 'Mrs' from the dropdown and verify it's selected
    cy.get('#ctl00_Main_ProposerTitle').select('Mrs').should('have.value', 'Mrs');
  
    // Select 'Miss' from the dropdown and verify it's selected
    cy.get('#ctl00_Main_ProposerTitle').select('Miss').should('have.value', 'Miss');
  
    // Select the next option ('Ms') to simulate navigation and verify
    cy.get('#ctl00_Main_ProposerTitle').select('Ms').should('have.value', 'Ms');
  });
  

  // it('should select "Mrs" when typing "M" in the dropdown', () => {
  //   // Click the dropdown to open it
  //   cy.get('#ctl00_Main_ProposerTitle').click();

  //   // Type "M" into the dropdown
  //   cy.get('#ctl00_Main_ProposerTitle').type('M');

  //   // Verify that "Mrs" is selected
  //   cy.get('#ctl00_Main_ProposerTitle').should('have.value', 'Mrs');
  // });

  // it('should select "Dr" when typing "D" in the dropdown', () => {
  //   // Click the dropdown to open it
  //   cy.get('#dropdown-selector').click();

  //   // Type "D" into the dropdown
  //   cy.get('#dropdown-selector').type('D');

  //   // Verify that "Dr" is selected
  //   cy.get('#dropdown-selector').should('have.value', 'Dr');
  // });

  // it('should not select a value when typing "A" in the dropdown', () => {
  //   // Click the dropdown to open it
  //   cy.get('#dropdown-selector').click();

  //   // Type "A" into the dropdown
  //   cy.get('#dropdown-selector').type('A');

  //   // Verify that no value is selected
  //   cy.get('#dropdown-selector').should('have.value', '');
  // });

  // it('should not select a value when typing "1" in the dropdown', () => {
  //   // Click the dropdown to open it
  //   cy.get('#dropdown-selector').click();

  //   // Type "1" into the dropdown
  //   cy.get('#dropdown-selector').type('1');

  //   // Verify that no value is selected
  //   cy.get('#dropdown-selector').should('have.value', '');
  // });

  // it('should not select a value when typing "!" in the dropdown', () => {
  //   // Click the dropdown to open it
  //   cy.get('#dropdown-selector').click();

  //   // Type "!" into the dropdown
  //   cy.get('#dropdown-selector').type('!');

  //   // Verify that no value is selected
  //   cy.get('#dropdown-selector').should('have.value', '');
  // });

  // it('should select "Mrs" when clicked', () => {
  //   // Click the dropdown to open it
  //   cy.get('#dropdown-selector').click();

  //   // Click the "Mrs" option
  //   cy.get('#dropdown-selector option').contains('Mrs').click();

  //   // Verify that "Mrs" is selected
  //   cy.get('#dropdown-selector').should('have.value', 'Mrs');
  // });

  // it('should select "Miss" when clicked', () => {
  //     // Click the dropdown to open it
  //     cy.get('#dropdown-selector').click();

  //     // Click the "Miss" option
  //     cy.get('#dropdown-selector option').contains('Miss').click();

  //     // Verify that "Miss" is selected
  //     cy.get('#dropdown-selector').should('have.value', 'Miss');
  //   });

  // it('should select "Ms" when clicked', () => {
  //     // Click the dropdown to open it
  //     cy.get('#dropdown-selector').click();

  //     // Click the "Ms" option
  //     cy.get('#dropdown-selector option').contains('Ms').click();

  //     // Verify that "Ms" is selected
  //     cy.get('#dropdown-selector').should('have.value', 'Ms');
  //   });

  // it('should select "Mr" when clicked', () => {
  //     // Click the dropdown to open it
  //     cy.get('#dropdown-selector').click();

  //     // Click the "Mr" option
  //     cy.get('#dropdown-selector option').contains('Mr').click();

  //     // Verify that "Mr" is selected
  //     cy.get('#dropdown-selector').should('have.value', 'Mr');
  //   });

  // it('should select "Dr" when clicked', () => {
  //     // Click the dropdown to open it
  //     cy.get('#dropdown-selector').click();

  //     // Click the "Dr" option
  //     cy.get('#dropdown-selector option').contains('Dr').click();

  //     // Verify that "Dr" is selected
  //     cy.get('#dropdown-selector').should('have.value', 'Dr');
  //   });

  //   it('should show an error message when selecting the blank option', () => {
  //     // Click the dropdown to open it
  //     cy.get('#dropdown-selector').click();

  //     // Click the "Blank" option
  //     cy.get('#dropdown-selector option').first().click();

  //     // Verify the error message (adjust the selector as needed)
  //     cy.get('.error-message').should('have.text', 'Title Required');
  //   });

  //   it('should show an error message when submitting without selecting a title', () => {
  //     // Trigger a form submission (adjust the selector as needed)
  //     cy.get('form').submit();

  //     // Verify the error message
  //     cy.get('.error-message').should('have.text', 'Title Required');
  //   });
});
