describe('Visit Homepage', () => {
  const emailField = '#ctl00_Main_ProposerEmail';
  const errorMsgField = '#ctl00_Main_RegularExpressionEmail';
  const validErrorText = '* Please enter a valid e-mail address';

  const validateErrorText = (selector, expectedText) => {
    cy.get(selector)
      .invoke('text')
      .then((text) => {
        const normalizedText = text.replace(/\s+/g, ' ').trim();
        expect(normalizedText).to.include(expectedText);
      });
  };

  const fillValidInfo = (email) => {
    cy.get(emailField).type(`${email}{enter}`);
    cy.get('#ctl00_Main_ProposerTelephone').type('07922343359{enter}');
    cy.get('#ctl00_Main_ProposerTitle').select('Mrs').should('have.value', 'Mrs');
    cy.get('#ctl00_Main_ProposerForename').type('Colin{enter}');
    cy.get('#ctl00_Main_ProposerSurname').type('Darragh{enter}');
  };

  const proceedToNextSection = () => {
    cy.get('#ctl00_Main_Continue1').click();
    cy.get('#ctl00_Main_UpdatePanel11 > a > .ellipsed > .panel-title')
      .should('be.visible')
      .and('have.text', '2. Your Information');
  };

  beforeEach(() => {
    cy.visit('https://www.its4women.ie/');
    cy.get('#onetrust-accept-btn-handler').click();
    cy.get('.framer-1y09im0').click();
  });

  it('displays information tooltip on hovering over info icon', () => {
    cy.get('#popover1').trigger('mouseover');
    cy.get('.tooltip-inner').should('be.visible').and(($tooltip) => {
      const text = $tooltip.text().replace(/\s+/g, ' ').trim();
      expect(text).to.equal(
        'If you purchase a policy with us we will send all initial and future documentation to you via email. Therefore it is important that you enter an email address that you regularly use.'
      );
    });
  });

  it('shows email error message on empty submission', () => {
    cy.get(emailField).focus().type('{enter}');
    validateErrorText('#ctl00_Main_RF_ProposerEmail', 'Please enter your e-mail address');
  });

  it('displays invalid email error for single character input', () => {
    cy.get(emailField).type('A{enter}');
    validateErrorText(errorMsgField, validErrorText);
    cy.get(errorMsgField).should('have.css', 'color', 'rgb(224, 62, 49)');
  });

  it('displays invalid email error for numeric input', () => {
    cy.get(emailField).type('1{enter}');
    validateErrorText(errorMsgField, validErrorText);
  });

  it('displays invalid email error for special character input', () => {
    cy.get(emailField).type('*{enter}');
    validateErrorText(errorMsgField, validErrorText);
  });

  it('proceeds with a valid "dotsys.co.uk" email address', () => {
    fillValidInfo('test@dotsys.co.uk');
    proceedToNextSection();
  });

  it('proceeds with a valid "dotsys.com" email address', () => {
    fillValidInfo('test@dotsys.com');
    proceedToNextSection();
  });

  it('proceeds with a valid "dotsys.ie" email address', () => {
    fillValidInfo('test@dotsys.ie');
    proceedToNextSection();
  });

  it('prevents proceeding with an invalid "dotsys.fr" email address', () => {
    cy.get(emailField).clear().type('test@dotsys.fr');
    cy.get('#ctl00_Main_Continue1').click();
    validateErrorText(errorMsgField, validErrorText);
  });

  it('displays invalid email error for extremely long input', () => {
    const longEmail = 'ThisIsAReallyLongEmailAddressThatShouldHopefullyBeTruncated@verylongemaildomain.com';
    cy.get(emailField)
      .type(longEmail)
      .should('have.value', longEmail.substring(0, 80)); // Verifies truncation at 80 characters
  });
});
