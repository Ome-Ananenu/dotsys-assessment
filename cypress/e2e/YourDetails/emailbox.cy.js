describe('visit homepage', () => {
  beforeEach(() => {
    cy.visit('https://www.its4women.ie/');
    cy.get('#onetrust-accept-btn-handler').click();
    cy.get('.framer-1y09im0').click();
  });

  it('should display information box on hovering over the info icon', () => {
    // Trigger hover to display the tooltip
    cy.get('#popover1').trigger('mouseover');

    // Verify the information box is visible
    cy.get('.tooltip-inner').should('be.visible');
  });

  it('should display correct information message', () => {
    // Click the information icon
    cy.get('#popover1').trigger('mouseover');

    // Verify the information box is visible
    cy.get('.tooltip-inner').should('be.visible');

    // Verify the content of the information box
    cy.get('.tooltip-inner').should(($tooltip) => {
      const text = $tooltip.text().replace(/\s+/g, ' ').trim();
      expect(text).to.equal(
        'If you purchase a policy with us we will send all initial and future documentation to you via email. Therefore it is important that you enter an email address that you regularly use.'
      );
    });
  });

  it('should display "Please enter your email address" error on trying to proceed without entering any details', () => {
    // Focus on the email input field
    cy.get('#ctl00_Main_ProposerEmail').focus();

    // Press Enter
    cy.focused().type('{enter}');

    // Verify the error message using 'contain.text' to ignore excess formatting
    cy.get('#ctl00_Main_RF_ProposerEmail')
      .invoke('text')
      .then((text) => {
        // Trim spaces and normalize newlines
        const normalizedText = text.replace(/\s+/g, ' ').trim();
        expect(normalizedText).to.include('Please enter your e-mail address');
      });
  });

  it('should display "Please enter a valid e-mail address" error on inserting A', () => {
    cy.get('#ctl00_Main_ProposerEmail').type('A{enter}');
    // Verify the error message is displayed with correct text (ignoring extra spaces)
    cy.get('#ctl00_Main_RegularExpressionEmail')
      .invoke('text')
      .then((text) => {
        const normalizedText = text.replace(/\s+/g, ' ').trim();
        expect(normalizedText).to.include(
          '* Please enter a valid e-mail address'
        );
      });

    // Verify the color of the error message
    cy.get('#ctl00_Main_RegularExpressionEmail').should(
      'have.css',
      'color',
      'rgb(224, 62, 49)'
    );
  });

  it('should display "Please enter your full e-mail address" error on inserting 1', () => {
    cy.get('#ctl00_Main_ProposerEmail').type('1{enter}');

    // Verify the error message is displayed with correct text (ignoring extra spaces)
    cy.get('#ctl00_Main_RegularExpressionEmail')
      .invoke('text')
      .then((text) => {
        const normalizedText = text.replace(/\s+/g, ' ').trim();
        expect(normalizedText).to.include(
          '* Please enter a valid e-mail address'
        );
      });

    // Verify the color of the error message
    cy.get('#ctl00_Main_RegularExpressionEmail').should(
      'have.css',
      'color',
      'rgb(224, 62, 49)'
    );
  });

  it('should display "Please enter your full e-mail address" error on inserting a special character', () => {
    cy.get('#ctl00_Main_ProposerEmail').type('*{enter}');

    cy.get('#ctl00_Main_RegularExpressionEmail')
      .invoke('text')
      .then((text) => {
        const normalizedText = text.replace(/\s+/g, ' ').trim();
        expect(normalizedText).to.include(
          '* Please enter a valid e-mail address'
        );
      });

    // Verify the color of the error message
    cy.get('#ctl00_Main_RegularExpressionEmail').should(
      'have.css',
      'color',
      'rgb(224, 62, 49)'
    );
  });

  it('should allow you proceed with a test@dotsys.co.uk e-mail address', () => {
    cy.get('#ctl00_Main_ProposerEmail').type('test@dotsys.co.uk{enter}');
    cy.get('#ctl00_Main_ProposerTelephone').type('07922343359{enter}');
    cy.get('#ctl00_Main_ProposerTitle')
      .select('Mrs')
      .should('have.value', 'Mrs');
    cy.get('#ctl00_Main_ProposerForename').type('Colin{enter}');
    cy.get('#ctl00_Main_ProposerSurname').type('Darragh{enter}');

    cy.get('#ctl00_Main_Continue1').click();

    // Verify transition to Your Information page
    cy.get('#ctl00_Main_UpdatePanel11 > a > .ellipsed > .panel-title')
      .should('be.visible')
      .and('have.text', '2. Your Information');
  });

  it('should allow you proceed with another test@dotsys.com e-mail address', () => {
    cy.get('#ctl00_Main_ProposerEmail').type('test@dotsys.com{enter}');
    cy.get('#ctl00_Main_ProposerTelephone').type('07922343359{enter}');
    cy.get('#ctl00_Main_ProposerTitle')
      .select('Mrs')
      .should('have.value', 'Mrs');
    cy.get('#ctl00_Main_ProposerForename').type('Colin{enter}');
    cy.get('#ctl00_Main_ProposerSurname').type('Darragh{enter}');

    cy.get('#ctl00_Main_Continue1').click();

    // Verify transition to Your Information page
    cy.get('#ctl00_Main_UpdatePanel11 > a > .ellipsed > .panel-title')
      .should('be.visible')
      .and('have.text', '2. Your Information');
  });

  it('should allow proceeding with test@dotsys.ie email', () => {
    cy.get('#ctl00_Main_ProposerEmail').clear().type('test@dotsys.ie');
    cy.get('#ctl00_Main_ProposerTelephone').type('07922343359{enter}');
    cy.get('#ctl00_Main_ProposerTitle')
      .select('Mrs')
      .should('have.value', 'Mrs');
    cy.get('#ctl00_Main_ProposerForename').type('Colin{enter}');
    cy.get('#ctl00_Main_ProposerSurname').type('Darragh{enter}');

    cy.get('#ctl00_Main_Continue1').click();

    // Verify transition to Your Information page
    cy.get('#ctl00_Main_UpdatePanel11 > a > .ellipsed > .panel-title')
      .should('be.visible')
      .and('have.text', '2. Your Information');
  });

  it('should not allow proceeding with test@dotsys.fr email', () => {
    cy.get('#ctl00_Main_ProposerEmail').clear().type('test@dotsys.fr');
    // cy.get('#ctl00_Main_ProposerTelephone').type('07922343359{enter}');
    // cy.get('#ctl00_Main_ProposerTitle')
    //   .select('Mrs')
    //   .should('have.value', 'Mrs');
    // cy.get('#ctl00_Main_ProposerForename').type('Colin{enter}');
    // cy.get('#ctl00_Main_ProposerSurname').type('Darragh{enter}');

    cy.get('#ctl00_Main_Continue1').click();

    cy.get('#ctl00_Main_RegularExpressionEmail')
      .invoke('text')
      .then((text) => {
        const normalizedText = text.replace(/\s+/g, ' ').trim();
        expect(normalizedText).to.include(
          '* Please enter a valid e-mail address'
        );
      });
  });

  // Negative Test (Invalid Email Address)
  it('should display "Please enter a valid e-mail address" error for invalid input', () => {
    cy.get('#ctl00_Main_ProposerEmail').clear().type('A');
    // cy.get('#ctl00_Main_ProposerTelephone').type('07922343359{enter}');
    // cy.get('#ctl00_Main_ProposerTitle')
    //   .select('Mrs')
    //   .should('have.value', 'Mrs');
    // cy.get('#ctl00_Main_ProposerForename').type('Colin{enter}');
    // cy.get('#ctl00_Main_ProposerSurname').type('Darragh{enter}');

    cy.get('#ctl00_Main_Continue1').click();

    cy.get('#ctl00_Main_RegularExpressionEmail')
      .invoke('text')
      .then((text) => {
        const normalizedText = text.replace(/\s+/g, ' ').trim();
        expect(normalizedText).to.include(
          '* Please enter a valid e-mail address'
        );
      });
  });

  // Test for Email Length Limit
  it('should limit input to 80 characters', () => {
    cy.get('#ctl00_Main_ProposerEmail')
      .type(
        'ThisIsAReallyLongEmailAddressThatShouldHopefullyBeTruncated@verylongemaildomain.com'
      )
      .should(
        'have.value',
        'ThisIsAReallyLongEmailAddressThatShouldHopefullyBeTruncated@verylongemaildomain.com'.substring(
          0,
          80
        )
      ); // Truncate to 80 characters
  });
});
