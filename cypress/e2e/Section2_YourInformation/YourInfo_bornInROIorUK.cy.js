describe('Tests for Republic of Ireland or UK radio buttons', () => {
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

  it('should check that the "Yes" and "No" buttons are visible and active', () => {
    cy.get('#ctl00_Main_rblBornInROIorUK_0')
      .should('be.visible')
      .and('be.enabled'); // Yes button
    cy.get('#ctl00_Main_rblBornInROIorUK_1')
      .should('be.visible')
      .and('be.enabled'); // No button
  });

  it('should display an error message when attempting to proceed without selecting an option', () => {
    cy.get('#ctl00_Main_Continue2').click();
    cy.get('#ctl00_Main_RequiredFieldValidator11')
      .should('be.visible')
      .and('have.text', '* Were you born in ROI or UK?');
  });

  it('should change "Yes" button to blue with white font when clicked', () => {
    cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(1)').click();
    cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(1) > label')
      .should('have.css', 'background-color', 'rgb(0, 174, 186)')
      .and('have.css', 'color', 'rgb(255, 255, 255)');
  });

  it('should change the button styles when toggling between "Yes" and "No"', () => {
    cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(1)').click();
    cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(2)').click();

    cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(1) > label')
      .should('have.css', 'background-color', 'rgb(255, 255, 255)');

    cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(2) > label')
      .should('have.css', 'background-color', 'rgb(0, 174, 186)')
      .and('have.css', 'color', 'rgb(255, 255, 255)');
  });

  it('should ensure the "Yes" and "No" buttons toggle styles correctly', () => {
    // Click Yes, then No
    cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(1)').click();
    cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(2)').click();

    cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(1) > label')
      .should('have.css', 'background-color', 'rgb(255, 255, 255)');

    cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(2) > label')
      .should('have.css', 'background-color', 'rgb(0, 174, 186)')
      .and('have.css', 'color', 'rgb(255, 255, 255)');
  });

  it('should display the title of the dropdown when "No" is selected', () => {
    cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(2)').click(); // Select No
    cy.get('#ctl00_Main_ProposerYearsResidentQuestion > .col-md-4')
      .invoke('text')
      .then(text => {
        const cleanedText = text.replace(/\s+/g, ' ').trim(); // Clean up whitespace
        cy.log(cleanedText);
        expect(cleanedText).to.equal('How long have you been a permanent resident in Republic of Ireland?');
      });
  });

  it('should display the tooltip text when hovering over the info button', () => {
    cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(2)').click(); // Select No
    cy.get('#popover3').trigger('mouseover');
    cy.get('.tooltip-inner')
      .should('be.visible')
      .and('contain', 'How long have you been living in the Republic of Ireland. In some circumstances we may require you to provide proof of your residency.');
  });
});
