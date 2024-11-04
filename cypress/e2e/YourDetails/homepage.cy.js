describe('visit homepage', () => {
  beforeEach(() => {
    cy.visit('https://www.its4women.ie/');
    cy.get('#onetrust-accept-btn-handler').click();
    cy.get('.framer-1y09im0').click();
  });

  it('contains correct title text', () => {
    cy.get('#divDutyOfDisclosure > .panel-heading').should(
      'contain.text',
      '* Pre-contractual duty of disclosure'
    );
  });

  it('should verify the text in the first paragraph', () => {
    cy.get('#divDutyOfDisclosure > .panel-body')
      .should('contain', 'You must answer all questions')
      .and(
        'contain',
        'Failure to do so may result in your policy being cancelled'
      )
      .and('contain', 'Impact of Misrepresentation section');
  });

  it('should verify the text in the second paragraph', () => {
    cy.get('#divDutyOfDisclosure > .panel-body').should(
      'contain',
      'The answers you provide are the basis upon which an insurance cover quotation will be offered or refused.'
    );
  });

  it('should open the Impact of Misrepresentation modal', () => {
    cy.get('.panel-body > :nth-child(2) > a').click();
    // Verify the modal is visible
    cy.get('#modalImpact').should('be.visible');
  });

  it('should check the heading of the pop up', () => {
    cy.get('.panel-body > :nth-child(2) > a').click();
    //Verify specific content within the modal

    cy.get('#modalImpact > .modal-dialog > .modal-content > .modal-header > .modal-title').should('have.text','Impact of Misrepresentation Section. Please read this section carefully.');

  });

  it('should check the text within the pop up', () => {
    cy.get('.panel-body > :nth-child(2) > a').click();
    //Verify specific content within the modal

    cy.get('#modalImpact > .modal-dialog > .modal-content > .modal-body').should('contain', 'The Impact of Misrepresentation')
    .and('contain', 'Innocent Misrepresentation')
    .and('contain', 'Negligent Misrepresentation')
    .and('contain', 'Fraudulent Misrepresentation');

  });

  it('should click on the modal X', () => {
    cy.get('.panel-body > :nth-child(2) > a').click();
    // Verify specific content within the modal

    cy.get(
      '#modalImpact > .modal-dialog > .modal-content > .modal-header > .close > [aria-hidden="true"]'
    ).click();
  });

  it('should check the value of the modal close button', () => {
    cy.get('.panel-body > :nth-child(2) > a').click();
    // Verify specific content within the modal

    cy.get(
      '#modalImpact > .modal-dialog > .modal-content > .modal-footer > .btn'
    ).should('have.text', 'Close');
  });

  it('should click on the modal close button', () => {
    cy.get('.panel-body > :nth-child(2) > a').click();
    // Verify specific content within the modal

    cy.get(
      '#modalImpact > .modal-dialog > .modal-content > .modal-footer > .btn'
    ).click();
  });

  it('should not allow typing in the modal', () => {
    // Click the link
    cy.get('.panel-body > :nth-child(2) > a').click();

    // Check if the modal is open
    cy.get('#modalImpact').should('be.visible');

    // Attempt to type into an input field within the modal (adjust the selector as needed)
    // Focus on an element within the modal (e.g., a button or link)
    cy.get('#modalImpact button').first().focus();

    // Attempt to type 'PT'
    cy.focused().type('PT');

    // Verify that the input was not accepted (e.g., by checking the modal's content or state)
    // You might need to adjust this assertion based on the specific behavior of the modal
    cy.get('#modalImpact').should('contain', 'The Impact of Misrepresentation'); // Or other relevant content

  });

  it('should not close the modal on Enter key press', () => {
    cy.get('.panel-body > :nth-child(2) > a').click();

    cy.get('#modalImpact').should('be.visible');

    // Focus on the modal and press the 'Enter' key
    cy.focused().type('{enter}');

    // Assert that the modal is still visible
    cy.get('#modalImpact').should('be.visible');
  });

  it('should close the Impact of Misrepresentation modal on background click', () => {
    cy.get('.panel-body > :nth-child(2) > a').click();

    // Verify the modal is visible
    cy.get('#modalImpact').should('be.visible');

    // Click on the background area (outside of the modal)
    cy.get('body').click('topLeft'); // Click on top left corner to avoid buttons

    // Verify the modal is closed
    cy.get('#modalImpact').should('not.be.visible');

    // Optional: Verify Section 1 is displayed (adjust selector as needed)
        cy.get('#divDutyOfDisclosure > .panel-heading').should(
      'contain.text',
      '* Pre-contractual duty of disclosure'
    );
  });

});
