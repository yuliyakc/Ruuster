describe('Sign in', function() {

    it('inviteClient', function () {
        cy.fixture('secret').then((secretData) => {
            cy.log("Go to Home page");
            cy.visit(secretData.ruusterHomePageSignin);
            cy.get('input[name="email"]').type(secretData.agentEmail, {force: true});
            cy.get('input[name="password"]').type(secretData.agentPass, {force: true});
            cy.get('button[type="submit"]').click({force: true});
            cy.wait(5000);
            cy.request('http://localhost:3000/get_code_from_twillo')
                .then((response) => {
                    console.log(response.body[0].body.substring(0, 6));
                    let code = response.body[0].body.substring(0, 6);
                    cy.log(code);
                    cy.wait(5000);
                    cy.get('input[id="signin-otp"]').type(code, {force: true});
                    cy.get('.button').click({force: true});
                });
            cy.get('a[href="/agent/dashboard/client/invite"]').click({force: true});
            cy.get('input[id="agent-dashboard-firstname"]').type(secretData.FirstNameInvClient,{force: true});
            cy.get('input[id="agent-dashboard-lastname"]').type(secretData.LastNameInvClient,{force: true});
            cy.get('input[id="agent-dashboard-email"]').type(secretData.emailInvClient,{force: true});
            cy.get('.button').click({force: true});
            cy.get('img[src="/images/agent-invite-client-congratulations.png"]').should('exist', {force: true});
            cy.get('.sidebar-item-icon').eq(2).click({force: true});
            cy.wait(3000);
            cy.get('.button').eq(2).click({force: true});
            cy.wait(3000);
            cy.get('.button').eq(5).click({force: true});
            cy.wait(3000);
        });
    });
});