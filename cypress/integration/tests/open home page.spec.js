 it('Signup', () => {
     cy.fixture('secret').then(({FirstName, LastName, email, pass, ruusterHomePage, phoneNumber}) => {
         cy.log('Go to Home page');
         cy.visit(ruusterHomePage);
        // cy.writeFile('D:/__PROJECTS__/Ruuster/cypress/fixtures/secret.json', 'Hello World');
     });
 })
