describe('Visit Homepage', () => {
  const fillValidUserInfo = (email) => {
    cy.get('#ctl00_Main_ProposerTelephone').type('07922343359{enter}');
    cy.get('#ctl00_Main_ProposerTitle').select('Mrs').should('have.value', 'Mrs');
    cy.get('#ctl00_Main_ProposerForename').type('Colin{enter}');
    cy.get('#ctl00_Main_ProposerSurname').type('Darragh{enter}');
    cy.get('#ctl00_Main_ProposerEmail').type(`${email}{enter}`);
  };

  beforeEach(() => {
    cy.visit('https://www.its4women.ie/');
    cy.get('#onetrust-accept-btn-handler').click();
    cy.get('.framer-1y09im0').click();
  });

  it('displays an error for missing contact number on submit', () => {
    cy.get('#ctl00_Main_ProposerTelephone').focus().type('{enter}');
    cy.get('#ctl00_Main_RequiredFieldValidator16')
      .should('have.text', '* Contact Number (Preferably Mobile)')
      .and('have.css', 'color', 'rgb(224, 62, 49)');
  });

  it('restricts non-numeric input in the contact number field', () => {
    cy.get('#ctl00_Main_ProposerTelephone').type('A').should('have.value', '');
  });

  it('displays an error for invalid contact number "1"', () => {
    cy.get('#ctl00_Main_ProposerTelephone').type('1{enter}');
    fillValidUserInfo('test@dotsys.co.uk');
    cy.get('#ctl00_Main_CustomValidator3')
      .invoke('text')
      .then((text) => {
        const normalizedText = text.replace(/\s+/g, ' ').trim();
        expect(normalizedText).to.contain('* Invalid Telephone number');
      });
  });

  it('restricts special character input in the contact number field', () => {
    cy.get('#ctl00_Main_ProposerTelephone').type('*').should('have.value', '');
  });

  it('allows form submission with a valid email (dotsys.co.uk)', () => {
    fillValidUserInfo('test@dotsys.co.uk');
    cy.get('#ctl00_Main_Continue1').click();
    cy.get('#ctl00_Main_UpdatePanel11 > a > .ellipsed > .panel-title')
      .should('be.visible')
      .and('have.text', '2. Your Information');
  });

  it('allows form submission with a valid email (dotsys.com)', () => {
    fillValidUserInfo('test@dotsys.com');
    cy.get('#ctl00_Main_Continue1').click();
    cy.get('#ctl00_Main_UpdatePanel11 > a > .ellipsed > .panel-title')
      .should('be.visible')
      .and('have.text', '2. Your Information');
  });

  it('restricts invalid character (A) in contact number', () => {
    cy.get('#ctl00_Main_ProposerTelephone').type('07922343359A');
    cy.get('#ctl00_Main_ProposerTelephone').should('have.value', '07922343359');
  });

  it('limits contact number to 15 characters', () => {
    cy.get('#ctl00_Main_ProposerTelephone').type('0792234335912345');
    cy.get('#ctl00_Main_ProposerTelephone').should('have.value', '079223433591234');
  });

  it('disallows "+" in contact number', () => {
    cy.get('#ctl00_Main_ProposerTelephone').type('+447922343359');
    cy.get('#ctl00_Main_ProposerTelephone').should('have.value', '447922343359');
  });
});
