describe('Gender ', () => {
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
    
    describe('Gender Selection Buttons Test', () => {
  
    it('should display Male and Female buttons as visible and active', () => {
      cy.get('#ctl00_Main_ProposerSexList_0').should('be.visible').and('not.be.disabled');
      cy.get('#ctl00_Main_ProposerSexList_1').should('be.visible').and('not.be.disabled');
    });
  
    it('should change the Male button background to blue and font to white on click', () => {
      cy.get('#ctl00_Main_ProposerSexList_0').click();
      cy.get('label[for="ctl00_Main_ProposerSexList_0"]').should('have.css', 'background-color', 'rgb(0, 0, 255)'); // Blue color
      cy.get('label[for="ctl00_Main_ProposerSexList_0"]').should('have.css', 'color', 'rgb(255, 255, 255)'); // White color
    });
  
    it('should retain Male button as selected on reclick', () => {
      cy.get('#ctl00_Main_ProposerSexList_0').click().click();
      cy.get('#ctl00_Main_ProposerSexList_0').should('be.checked');
    });
  
    it('should change the Female button background to blue and font to white on click', () => {
      cy.get('#ctl00_Main_ProposerSexList_1').click();
      cy.get('label[for="ctl00_Main_ProposerSexList_1"]').should('have.css', 'background-color', 'rgb(0, 0, 255)'); // Blue color
      cy.get('label[for="ctl00_Main_ProposerSexList_1"]').should('have.css', 'color', 'rgb(255, 255, 255)'); // White color
    });
  
    it('should retain Female button as selected on reclick', () => {
      cy.get('#ctl00_Main_ProposerSexList_1').click().click();
      cy.get('#ctl00_Main_ProposerSexList_1').should('be.checked');
    });
  
    it('should change selection from Male to Female', () => {
      cy.get('#ctl00_Main_ProposerSexList_0').click();
      cy.get('#ctl00_Main_ProposerSexList_1').click();
      cy.get('#ctl00_Main_ProposerSexList_1').should('be.checked');
      cy.get('#ctl00_Main_ProposerSexList_0').should('not.be.checked');
    });
  
    it('should change selection from Female to Male', () => {
      cy.get('#ctl00_Main_ProposerSexList_1').click();
      cy.get('#ctl00_Main_ProposerSexList_0').click();
      cy.get('#ctl00_Main_ProposerSexList_0').should('be.checked');
      cy.get('#ctl00_Main_ProposerSexList_1').should('not.be.checked');
    });
  
  });
});