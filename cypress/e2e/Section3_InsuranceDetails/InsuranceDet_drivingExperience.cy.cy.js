describe('Tests for Driving Experience Dropdown', () => {
  beforeEach(() => {
    // Visit the homepage and accept any consent pop-ups
    cy.visit('https://www.its4women.ie/');
    cy.get('#onetrust-accept-btn-handler').click();
    cy.get('.framer-1y09im0').click();

    // Fill out the "Your Details" form
    cy.get('#ctl00_Main_ProposerTitle').select('Mr').should('have.value', 'Mr');
    cy.get('#ctl00_Main_ProposerTelephone')
      .type('07922343359')
      .should('have.value', '07922343359');
    cy.get('#ctl00_Main_ProposerForename')
      .type('Colin')
      .should('have.value', 'Colin');
    cy.get('#ctl00_Main_ProposerSurname')
      .type('Darragh')
      .should('have.value', 'Darragh');
    cy.get('#ctl00_Main_ProposerEmail')
      .type('test@dotsys.com')
      .should('have.value', 'test@dotsys.com');

    // Proceed to the next section
    cy.get('#ctl00_Main_Continue1').click();

    //Fill out your information section
    cy.get('#ctl00_Main_AddressSearch').type('D18H683{enter}');

    // Wait for the address suggestions to appear. You can adjust the selector
    // based on how the suggestions are displayed. Here we assume the suggestions
    // are displayed in a dropdown or a list.
    // Adjust this selector as needed based on the page's structure.
    cy.get('.ui-autocomplete .ui-menu-item').should(
      'have.length.greaterThan',
      0
    ); // Ensure results are shown

    // Select the first address in the dropdown or suggestions
    cy.get('.ui-autocomplete .ui-menu-item').first().click(); // Click on the first result

    cy.get('#ctl00_Main_btnConfirmAddress').click();
    cy.get('#ctl00_Main_rblBornInROIorUK > :nth-child(1) > label').click();
    cy.get('#ctl00_Main_DobDay').select('1').should('have.value', '1');
    cy.get('#ctl00_Main_LicenceYearsHeld')
      .select('2 Years', { force: true })
      .should('have.value', '2');
    cy.get('#ctl00_Main_DobMonth').select('Jan').should('have.value', '01');
    cy.get('#ctl00_Main_DobYear').select('1991').should('have.value', '1991');
    cy.get('#ctl00_Main_ProposerSexList > :nth-child(2) > label').click();
    cy.get('#ctl00_Main_ProposerMaritalStatus')
      .select('Married')
      .should('have.value', 'M');
    cy.get('#ctl00_Main_EmploymentStatus')
      .select('Retired')
      .should('have.value', 'R');
    cy.get('#ctl00_Main_LicenceType')
      .select('Full Irish / UK')
      .should('have.value', 'F');

    cy.wait(500); // Adjust wait time if needed

    //   cy.get('#ctl00_Main_LicenceYearsHeld')

    // Proceed to the next section
    cy.get('#ctl00_Main_Continue2').click();

    // Wait for the page to reload (You can use `cy.reload()` to simulate a manual reload if needed)
    cy.url().should('not.include', '/form'); // Assuming the URL changes after reload

    // After the page reloads, verify the selection is still saved

    cy.get('#ctl00_Main_LicenceYearsHeld')
      .select('2 Years', { force: true })
      .should('have.value', '2');
    cy.get('#ctl00_Main_Continue2').click();
  });

  it("Should display correct values in the dropdown", () => {
   // Check if the dropdown has the expected values
    cy.get("#ctl00_Main_ddlDrivingExperience").find('option').then(options => {
            const actualOptions = [...options].map(option => option.innerText);
            const expectedOptions = [
                "--",
                "I currently have insurance in my own name",
                "This is my first time",
                "I have been a named driver",
                "I have been insured on a company car"
            ];
            expect(actualOptions).to.deep.equal(expectedOptions);
        });
});

it("Should prevent proceeding without selecting an option", () => {
    // Try to proceed without selecting any option
    cy.get('#ctl00_Main_Continue3').click();

    // Assert that the error message is displayed
    cy.get("#ctl00_Main_RF_DrivingExperience")
        .should("be.visible")
        .and("contain", "* Please Select Your Driving Experience");
});

it("Should not show dropdown options when typing invalid characters", () => {
    // Type invalid inputs and ensure no dropdown options appear
    const invalidInputs = ["A", "1", "*"];
    invalidInputs.forEach(input => {
        cy.get("#ctl00_Main_ddlDrivingExperience").type(input);
        cy.get("#ctl00_Main_ddlDrivingExperience").find("option").should("not.exist");
    });
});

it("Should display an error when selecting '--'", () => {
    cy.get("#ctl00_Main_ddlDrivingExperience").select("--");
    cy.get('#ctl00_Main_Continue3').click();
    
    // Check for error message
    cy.get("#ctl00_Main_RF_DrivingExperience")
        .should("be.visible")
        .and("contain", "* Please Select Your Driving Experience");
});


it("Should display follow-up question when selecting 'I currently have insurance in my own name'", () => {
    cy.get("#ctl00_Main_ddlDrivingExperience").select("I currently have insurance in my own name");
    
    // Verify follow-up question appears
    cy.contains("How many no claims bonus years have you earned on a private car policy?", { timeout: 10000 })
    .should("be.visible");

});


});