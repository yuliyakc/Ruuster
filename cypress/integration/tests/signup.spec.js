
it('Signup', () => {
    cy.fixture('secret').then(({ FirstName, LastName, email, pass, ruusterHomePage, phoneNumber }) => {
        cy.log('Go to Home page');
        cy.visit(ruusterHomePage);
        cy.get('.button').eq(1).click();
        cy.get('input[name="firstName"]').type(FirstName,{force:true});
        cy.get('input[name="lastName"]').type(LastName, {force:true});
        cy.get('input[name="email"]').type(email, {force:true});
        cy.get('input[name="password"]').type(pass, {force:true});
        cy.get('button[type="submit"]').click({force:true});
        cy.wait(6000);
        cy.get('input[name="phone-number"]').type(phoneNumber, {force:true});
        cy.get('button[type="submit"]').click({force:true});
    });
});
