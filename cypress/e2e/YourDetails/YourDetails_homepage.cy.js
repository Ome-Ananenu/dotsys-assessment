describe('Homepage - Duty of Disclosure Section', () => {
  const disclosurePanelHeading = '#divDutyOfDisclosure > .panel-heading';
  const disclosurePanelBody = '#divDutyOfDisclosure > .panel-body';
  const misrepresentationLink = '.panel-body > :nth-child(2) > a';
  const modalImpact = '#modalImpact';
  const modalTitle = '#modalImpact > .modal-dialog > .modal-content > .modal-header > .modal-title';
  const modalBody = '#modalImpact > .modal-dialog > .modal-content > .modal-body';
  const modalCloseButton = '#modalImpact > .modal-dialog > .modal-content > .modal-footer > .btn';
  const modalXButton = '#modalImpact > .modal-dialog > .modal-content > .modal-header > .close > [aria-hidden="true"]';

  beforeEach(() => {
    cy.visit('https://www.its4women.ie/');
    cy.get('#onetrust-accept-btn-handler').click();
    cy.get('.framer-1y09im0').click();
  });

  it('verifies correct title text in the Duty of Disclosure panel', () => {
    cy.get(disclosurePanelHeading).should(
      'contain.text',
      '* Pre-contractual duty of disclosure'
    );
  });

  it('verifies text content in the first paragraph of the Duty of Disclosure section', () => {
    cy.get(disclosurePanelBody)
      .should('contain', 'You must answer all questions')
      .and('contain', 'Failure to do so may result in your policy being cancelled')
      .and('contain', 'Impact of Misrepresentation section');
  });

  it('verifies text content in the second paragraph of the Duty of Disclosure section', () => {
    cy.get(disclosurePanelBody).should(
      'contain',
      'The answers you provide are the basis upon which an insurance cover quotation will be offered or refused.'
    );
  });

  it('opens and verifies the Impact of Misrepresentation modal', () => {
    cy.get(misrepresentationLink).click();
    cy.get(modalImpact).should('be.visible');
  });

  it('verifies the heading within the Impact of Misrepresentation modal', () => {
    cy.get(misrepresentationLink).click();
    cy.get(modalTitle).should('have.text', 'Impact of Misrepresentation Section. Please read this section carefully.');
  });

  it('verifies text within the Impact of Misrepresentation modal', () => {
    cy.get(misrepresentationLink).click();
    cy.get(modalBody)
      .should('contain', 'The Impact of Misrepresentation')
      .and('contain', 'Innocent Misrepresentation')
      .and('contain', 'Negligent Misrepresentation')
      .and('contain', 'Fraudulent Misrepresentation');
  });

  it('closes the Impact of Misrepresentation modal by clicking the "X" button', () => {
    cy.get(misrepresentationLink).click();
    cy.get(modalXButton).click();
    cy.get(modalImpact).should('not.be.visible');
  });

  it('verifies the text of the modal "Close" button', () => {
    cy.get(misrepresentationLink).click();
    cy.get(modalCloseButton).should('have.text', 'Close');
  });

  it('closes the Impact of Misrepresentation modal by clicking the "Close" button', () => {
    cy.get(misrepresentationLink).click();
    cy.get(modalCloseButton).click();
    cy.get(modalImpact).should('not.be.visible');
  });

  it('prevents typing in the modal', () => {
    cy.get(misrepresentationLink).click();
    cy.get(modalImpact).should('be.visible');
    
    // Attempt to type within the modal, expecting no input to be registered
    cy.get(modalImpact).focus().type('PT');
    cy.get(modalBody).should('contain', 'The Impact of Misrepresentation'); // Ensure modal content remains unaffected
  });

  it('does not close the modal on "Enter" key press', () => {
    cy.get(misrepresentationLink).click();
    cy.get(modalImpact).should('be.visible');
    cy.focused().type('{enter}');
    cy.get(modalImpact).should('be.visible'); // Modal should remain open
  });

  it('closes the Impact of Misrepresentation modal when clicking on background', () => {
    cy.get(misrepresentationLink).click();
    cy.get(modalImpact).should('be.visible');
    
    // Click outside the modal to close it
    cy.get('body').click('topLeft');
    cy.get(modalImpact).should('not.be.visible');
    
    // Verify the Duty of Disclosure section is visible again
    cy.get(disclosurePanelHeading).should(
      'contain.text',
      '* Pre-contractual duty of disclosure'
    );
  });
});
