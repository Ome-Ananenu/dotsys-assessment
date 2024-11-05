describe('Your Address/Eircode Input Tests', () => {
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
    
  
    it('Press Enter with No Input - NT', () => {
      cy.get('#ctl00_Main_AddressSearch').type('{enter}');
      cy.get('#results').should('not.be.visible');
    });
  
    it('Press Tab with No Characters - NT', () => {
      cy.get('#ctl00_Main_AddressSearch').focus().tab();
      cy.get('#results').should('not.be.visible');
    });
  
    it('Press Tab with Characters - PT', () => {
      cy.get('#ctl00_Main_AddressSearch').type('Some Input{tab}');
      // Assuming some functionality is triggered to allow proceeding
      cy.url().should('include', '/next-step'); // Update with actual expected URL
    });
  
    it('Attempt to Proceed without Details - NT', () => {
      cy.get('#ctl00_Main_btnProceed').click();
      cy.get('.alert-danger').should('contain', 'Please enter your address');
    });
  
    it('Insert "A" - NT', () => {
      cy.get('#ctl00_Main_AddressSearch').type('A');
      cy.get('#ctl00_Main_btnProceed').click();
      cy.get('.alert-danger').should('contain', 'Please enter a valid address');
    });
  
    it('Insert "1" - NT', () => {
      cy.get('#ctl00_Main_AddressSearch').type('1');
      cy.get('#ctl00_Main_btnProceed').click();
      cy.get('.alert-danger').should('contain', 'Please enter a valid address');
    });
  
    it('Insert "*" - NT', () => {
      cy.get('#ctl00_Main_AddressSearch').type('*');
      cy.get('#ctl00_Main_btnProceed').click();
      cy.get('.alert-danger').should('contain', 'Please enter a valid address');
    });
  
    it('Insert "1 Dublin" - PT', () => {
      cy.get('#ctl00_Main_AddressSearch').type('1 Dublin');
      cy.get('#ctl00_Main_AddressSearch').type('{downarrow}'); // Open dropdown
      cy.get('#results').should('be.visible');
    });
  
    it('Select the First Option from the Dropdown - PT', () => {
      cy.get('#ctl00_Main_AddressSearch').type('1 Dublin');
      cy.get('#ctl00_Main_AddressSearch').type('{downarrow}{enter}');
      cy.get('#ctl00_Main_searchResult').should('contain', 'Selected Address');
      cy.get('#divAddressButtons').should('be.visible');
    });
  
    it('Select the "Yes" Option - PT', () => {
      cy.get('#ctl00_Main_btnConfirmAddress').click();
      cy.get('.alert-success').should('contain', 'Address Successfully Added');
    });
  
    it('Select the "Change Address" - PT', () => {
      cy.get('#ctl00_Main_btnEditAddress').click();
      cy.get('#ctl00_Main_AddressSearch').should('be.empty');
    });
  
    it('Select the "No" Option - PT', () => {
      cy.get('#ctl00_Main_btnNotAddress').click();
      cy.get('#ctl00_Main_AddressSearch').should('be.empty');
    });
  
    it('Enter "K67 VF21" - PT', () => {
      cy.get('#ctl00_Main_AddressSearch').type('K67 VF21');
      cy.get('#ctl00_Main_btnProceed').click();
      cy.get('#ctl00_Main_searchResult').should('contain', '6 HEYWARD MEWS, ROGANSTOWN GOLF AND COUNTRY CLUB');
    });
  
    it('Click the "Yes" Option After Entering "K67 VF21" - PT', () => {
      cy.get('#ctl00_Main_btnConfirmAddress').click();
      cy.get('.alert-success').should('contain', 'Address Successfully Added');
    });
  
    it('Click the "No" Option After Entering "K67 VF21" - PT', () => {
      cy.get('#ctl00_Main_btnNotAddress').click();
      cy.get('#ctl00_Main_AddressSearch').should('be.empty');
    });
  
    it('Click "Can\'t Find Address" - PT', () => {
      cy.get('#ctl00_Main_btnManualAddress').click();
      cy.get('#divManualAddressText').should('be.visible');
    });
  
    it('Click "Back to Address Search" - PT', () => {
      cy.get('#ctl00_Main_btnManualAddress').click();
      cy.get('#ctl00_Main_btnTryAgain').click();
      cy.get('#divAddressText').should('be.visible');
    });
  
    it('Enter "A" in Address 1 Only and Confirm - NT', () => {
      cy.get('#ctl00_Main_AddressSearchManual').type('A');
      cy.get('#ctl00_Main_btnConfirmManual').click();
      cy.get('.alert-danger').should('contain', 'What is the first line of your address');
    });
  
    it('Enter "A" in Address 2 Only and Confirm - NT', () => {
      cy.get('#ctl00_Main_AddressSearchManual').type('A');
      cy.get('#ctl00_Main_btnConfirmManual').click();
      cy.get('.alert-danger').should('contain', 'What is the first line of your address');
    });
  
    it('Enter "A" in Address 3 Only and Confirm - NT', () => {
      cy.get('#ctl00_Main_AddressSearchManual').type('A');
      cy.get('#ctl00_Main_btnConfirmManual').click();
      cy.get('.alert-danger').should('contain', 'What is the first line of your address');
    });
  
    it('Select Carlow as County - PT', () => {
      cy.get('#countyDropdown').select('Carlow');
      cy.get('#countyDropdown').should('have.value', 'Carlow');
    });
  
    it('Select Dublin as County - PT', () => {
      cy.get('#countyDropdown').select('Dublin');
      cy.get('#subCountyDropdown').should('be.visible');
    });
  
    it('Select County Carlow and Confirm - NT', () => {
      cy.get('#countyDropdown').select('Carlow');
      cy.get('#ctl00_Main_btnConfirmManual').click();
      cy.get('.alert-danger').should('contain', 'What is the first line of your address');
    });
  
    it('Select County Dublin and Adamstown, then Confirm - NT', () => {
      cy.get('#countyDropdown').select('Dublin');
      cy.get('#subCountyDropdown').select('Adamstown');
      cy.get('#ctl00_Main_btnConfirmManual').click();
      cy.get('.alert-danger').should('contain', 'What is the first line of your address');
    });
  
    it('Insert "1 Dublin Road" as Address 1, "Dublin" as Address 2, and Select County and Sub County - PT', () => {
      cy.get('#ctl00_Main_AddressSearchManual').type('1 Dublin Road');
      cy.get('#ctl00_Main_AddressSearchManual').type('{downarrow}{enter}');
      cy.get('#countyDropdown').select('Dublin');
      cy.get('#subCountyDropdown').select('Adamstown');
      cy.get('#ctl00_Main_btnConfirmManual').click();
      cy.get('#ctl00_Main_searchResult').should('contain', '1 DUBLIN ROAD, NAAS, KILDARE, W91XWR6');
    });
  
    it('Click "Yes, Confirm" - PT', () => {
      cy.get('#ctl00_Main_btnConfirmAddressManual').click();
      cy.get('.alert-success').should('contain', 'Address Successfully Added');
    });
  
    it('Click "No, Try Again" - PT', () => {
      cy.get('#ctl00_Main_btnNotAddressManual').click();
      cy.get('#ctl00_Main_AddressSearchManual').should('be.empty');
    });
  
    it('Click "No, Use Address Entered" - PT', () => {
      cy.get('#ctl00_Main_btnContinueAnywayFinal').click();
      cy.get('.alert-success').should('contain', 'Address Successfully Added');
    });
  });
  