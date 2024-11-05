describe('Date of Birth Dropdown Tests', () => {
  beforeEach(() => {
      // Visit the homepage and handle initial consent pop-ups
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

  describe('Dropdown Validations', () => {
      it('should display error messages when no date of birth is selected', () => {
          cy.get('#ctl00_Main_Continue2').click();
          cy.get('#ctl00_Main_RequiredFieldValidator10').should('be.visible').and('contain', '* date of birth day!');
          cy.get('#ctl00_Main_RequiredFieldValidator2').should('be.visible').and('contain', '* date of birth Month!');
          cy.get('#ctl00_Main_RequiredFieldValidator3').should('be.visible').and('contain', '* date of birth Year!');
      });

      it('should display correct values in the day dropdown', () => {
          cy.get('#ctl00_Main_DobDay').find('option').then(options => {
              const actual = [...options].map(o => o.text.trim());
              const expected = ['--', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
              expect(actual).to.deep.equal(expected);
          });
      });

      it('should display correct values in the month dropdown', () => {
          cy.get('#ctl00_Main_DobMonth').find('option').then(options => {
              const actual = [...options].map(option => option.innerText.trim());
              const expected = ['--', 'Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
              expect(actual).to.deep.equal(expected);
          });
      });

      it('should display correct values in the year dropdown', () => {
          cy.get('#ctl00_Main_DobYear').find('option').then(options => {
              const actual = [...options].map(option => option.innerText.trim());
              const expected = ['--', '2007', '2006', '2005', '2004', '2003', '2002', '2001', '2000', 
                                '1999', '1998', '1997', '1996', '1995', '1994', '1993', '1992', '1991', 
                                '1990', '1989', '1988', '1987', '1986', '1985', '1984', '1983', '1982', 
                                '1981', '1980', '1979', '1978', '1977', '1976', '1975', '1974', '1973', 
                                '1972', '1971', '1970', '1969', '1968', '1967', '1966', '1965', '1964', 
                                '1963', '1962', '1961', '1960', '1959', '1958', '1957', '1956', '1955', 
                                '1954', '1953', '1952', '1951', '1950', '1949', '1948', '1947', '1946', 
                                '1945', '1944', '1943', '1942', '1941', '1940', '1939', '1938', '1937', 
                                '1936', '1935', '1934'];
              expect(actual).to.deep.equal(expected);
          });
      });

      it('should navigate through each dropdown using arrow keys', () => {
          cy.get('#ctl00_Main_DobDay').focus().type('{downarrow}{uparrow}');
          cy.get('#ctl00_Main_DobMonth').focus().type('{downarrow}{uparrow}');
          cy.get('#ctl00_Main_DobYear').focus().type('{downarrow}{uparrow}');
      });

      it('should not allow typing characters in the day dropdown', () => {
          cy.get('#ctl00_Main_DobDay').focus().type('A').should('not.have.value', 'A');
      });

      it('should not allow special characters in the day dropdown', () => {
          cy.get('#ctl00_Main_DobDay').focus().type('!').should('not.have.value', '!');
      });

      it('should select 1 when typing 1 in the day dropdown', () => {
          cy.get('#ctl00_Main_DobDay').select('1').should('have.value', '1');
      });

      it('should select Jan when typing J in the month dropdown', () => {
          cy.get('#ctl00_Main_DobMonth').focus().type('J').should('have.value', '01');
      });

      it('should not allow special characters in the month dropdown', () => {
          cy.get('#ctl00_Main_DobMonth').focus().type('!').should('not.have.value', '!');
      });

      it('should not allow typing a number in the month dropdown', () => {
          cy.get('#ctl00_Main_DobMonth').focus().type('1').should('not.have.value', '1');
      });

      it('should highlight 2007 when typing A in the year dropdown', () => {
          cy.get('#ctl00_Main_DobYear').focus().type('A').should('have.value', '2007');
      });

      it('should highlight 1934 when typing ! in the year dropdown', () => {
          cy.get('#ctl00_Main_DobYear').focus().type('!').should('have.value', '1934');
      });

      it('should select 1999 when choosing it from the year dropdown', () => {
          cy.get('#ctl00_Main_DobYear').select('1999').should('have.value', '1999');
      });
  });
});
