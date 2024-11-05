describe('Republic of Ireland or UK radio buttons', () => {
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
    cy.wait(500);
    cy.get('#ctl00_Main_Continue2').click(); 
    cy.get('#ctl00_Main_RequiredFieldValidator11')
      .should('be.visible')
      .and('have.text', '* Were you born in ROI or UK?');
  });

  it('should change "Yes" button to blue with white font when clicked', () => {
    // / Click the Yes button
    cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(1)').click();
        
        // Check the label's styles
        cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(1) > label')
          .should('have.css', 'background-color', 'rgb(0, 174, 186)')
          .and('have.css', 'color', 'rgb(255, 255, 255)');
  });
  it('Check the details of the Yes and No buttons - PT', () => {
    // Check that the Yes and No buttons are visible and active
    cy.get('#ctl00_Main_rblBornInROIorUK_0')
      .should('be.visible')
      .and('not.be.disabled');
    cy.get('#ctl00_Main_rblBornInROIorUK_1')
      .should('be.visible')
      .and('not.be.disabled');
  });



  it('Click the Yes button - PT', () => {
    cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(1)').click();
     // Check the label's styles
     cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(1) > label')
     .should('have.css', 'background-color', 'rgb(0, 174, 186)')
     .and('have.css', 'color', 'rgb(255, 255, 255)');
  });

  it('Reclick the Yes button - PT', () => {
    cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(1)').click();
    cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(1)').click();// Click again
    cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(1) > label')
    .should('have.css', 'background-color', 'rgb(0, 174, 186)')
       .and('have.css', 'color', 'rgb(255, 255, 255)');
  });

  it('Click the No button - PT', () => {
    cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(2)').click();
    cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(2) > label').should('have.css', 'background-color', 'rgb(0, 174, 186)')
    .and('have.css', 'color', 'rgb(255, 255, 255)');
    // Check for active styling
  });

  it('Reclick the No button - PT', () => {
    cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(2)').click();
    cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(2)').click(); // Click again
    cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(2) > label').should('have.css', 'background-color', 'rgb(0, 174, 186)')
    .and('have.css', 'color', 'rgb(255, 255, 255)');// No remains clicked
  });

  it('With Yes selected, click the No button - PT', () => {
    cy.wait(500);
    cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(1)').click(); // Select Yes
    cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(2)').click(); // Select No
    cy.wait(500);
    cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(1) > label').should('have.css', 'background-color', 'rgb(255, 255, 255)');
    
    cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(2) > label').should('have.css', 'background-color', 'rgb(0, 174, 186)')
    .and('have.css', 'color', 'rgb(255, 255, 255)');
   // No should be clicked
  });

  it('With No selected, click the Yes button - PT', () => {
    cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(2)').click();  // Select No
    cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(1)').click();  // Select Yes
    cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(2) > label').should(
      'have.css', 'background-color', 'rgb(255, 255, 255)'
    ); // No should be unclicked
    cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(1) > label').should(
      'have.css', 'background-color', 'rgb(0, 174, 186)'
    ); // Yes should be clicked
  });

  it('With No selected, check the title of the new dropdown - PT', () => {
    cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(2)').click(); // Select No
    // Assuming a dropdown appears based on this selection
    cy.get('#ctl00_Main_ProposerYearsResidentQuestion > .col-md-4')
  .invoke('text')
  .then(text => {
    const cleanedText = text.replace(/\s+/g, ' ').trim(); // Clean up whitespace
    cy.log(cleanedText); // Log the cleaned text for debugging
    expect(cleanedText).to.equal('How long have you been a permanent resident in Republic of Ireland?');
  });
  });

  it('Check the details in the information box - PT', () => {

    cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(2)').click(); // Select No
     // Hover over the info button to trigger the tooltip
     cy.get('#popover3').trigger('mouseover'); // Use mouseover to show the tooltip

     // Validate that the tooltip is visible and contains the correct text
     cy.get('.tooltip-inner') // Select the tooltip inner text
       .should('be.visible') // Check that it is visible
       .and('contain', 'How long have you been living in the Republic of Ireland.  In some circumstances we may require you to provide proof of your residency.'); // Validate the text content
 
  });
});
