
it('Signup', () => {
    cy.fixture('secret').then(({ FirstName, LastName, email, pass, ruusterHomePage, phoneNumber }) => {
        cy.log('Go to Home page');
        cy.visit(ruusterHomePage);
        cy.get('input[id="signup-first-name"]').type(FirstName);
        cy.get('input[id="signup-last-name"]').type(LastName);
        cy.get('input[id="signup-email"]').type(email);
        cy.get('input[id="signup-password"]').type(pass);
        cy.get('button[type="submit".').click();
        cy.get('input[id="secure-account-phone-number")').type(phoneNumber);
        cy.get('button[type="submit".').click();
    });
});
