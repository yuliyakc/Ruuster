describe('Verify sign up', function() {
    it('Create agent', () => {
        cy.fixture('secret').then((secretData) => {
            secretData.lastEmailNumAgent = parseInt(secretData.lastEmailNumAgent) + 1;
            console.log(secretData.lastEmailNumAgent);
            cy.writeFile('./cypress/fixtures/secret.json', JSON.stringify(secretData));
            let emailForSignUp = secretData.emailAgentNew.replace("@", "+" + secretData.lastEmailNumAgent + "@");
            cy.request('POST', 'https://staging-507743533.qa.ruuster.com/api/admin/new-agent-flow', {
                email: emailForSignUp,
                password: 'Ruuster613jklfsjdkljoi^@8cje9954nmnn#(jk(xzop',
            });
            cy.visit(secretData.ruusterHomePage);
            cy.get('.button').eq(1).click();
            cy.get('input[name="firstName"]').type(secretData.FirstName, {force: true});
            cy.get('input[name="lastName"]').type(secretData.LastName, {force: true});
            cy.get('input[name="email"]').type(emailForSignUp, {force: true});
            cy.get('input[name="password"]').type(secretData.pass, {force: true});
            cy.get('button[type="submit"]').click({force: true});
            cy.get('button[type="submit"]').click({force: true});
            cy.wait(6000);
            cy.get('input[name="phone-number"]').type(secretData.phoneNumber, {force: true});
            cy.get('button[type="submit"]').click({force: true});
            cy.wait(5000);
            cy.request('http://localhost:3000/get_code_from_twillo')
                .then((response) => {
                    console.log(response.body[0].body.substring(0, 6));
                    let code = response.body[0].body.substring(0, 6);
                    cy.log(code);
                    cy.wait(5000);
                    cy.get('input[id="secure-account-code"]').type(code, {force: true});
                    cy.get('.button').click({force: true});
                    cy.wait(10000);
                });
        });
    });
});





