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
                firstName: "Anna",
                title: "Realiable Agency",
                agencyName: "Realiable Awesome Agency",
                clientFacingPhoneNumber: "(847) 780-6568",
                managingBroker: true,
                realEstateStartYear: 2008,
                dateOfBirth: "08/21/2008",
                landingPageDescription: "We are reliable agents",
                agencyLogoURL: "https://btsbrands.com/wp-content/uploads/2019/08/Real-Estate-Logos-Keen-Realty.jpg",
                headshotURL: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Christian_De_Sica.jpg",
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
                    cy.wait(5000);
                    cy.get('button[type="submit"]').click({force: true});
                    cy.wait(5000);
                });
            cy.get('a[href="/agent/dashboard/client/invite"]').eq(0).click({force: true});
            cy.get('input[id="agent-dashboard-firstname"]').type(secretData.FirstNameInvClient,{force: true});
            cy.get('input[id="agent-dashboard-lastname"]').type(secretData.LastNameInvClient,{force: true});
            secretData.lastEmailInviteClient = parseInt(secretData.lastEmailInviteClient) + 1;
            console.log(secretData.lastEmailInviteClient);
            cy.writeFile('./cypress/fixtures/secret.json', JSON.stringify(secretData));
            let emailForInviteClient = secretData.emailInvClient.replace("@", "+" + secretData.lastEmailInviteClient + "@");
            cy.log(emailForInviteClient);
            cy.get('input[id="agent-dashboard-email"]').type(emailForInviteClient,{force: true});
            cy.get('.button').click({force: true});
            cy.wait(3000);
            cy.get('img[src="/images/agent-invite-client-congratulations.png"]').should('exist', {force: true});
        });
    });
});





