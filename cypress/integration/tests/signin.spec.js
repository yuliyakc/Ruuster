describe('Sign in', function() {

    it('SigninAgent', function () {
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
            cy.get('a[href="/agent/dashboard/client/f1c4e600-2ede-4ac3-af21-d9d086cfd700"]').click({force: true});
            cy.wait(2000);
            cy.get('.back-button').click({force: true});
        });
    });

    it('SigninClient', function () {
        cy.fixture('secret').then((secretData) => {
            cy.log("Go to Home page");
            cy.visit(secretData.ruusterHomePageSignin);
            cy.get('input[name="email"]').type(secretData.clientEmail, {force: true});
            cy.get('input[name="password"]').type(secretData.clientPass, {force: true});
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
            cy.get('a[href="/budget/affordability/sample"]').click({force: true});
            cy.get('input[id="property-zip"]').clear({force: true});
            cy.get('input[id="property-zip"]').type("90005", {force: true});
            cy.get('a[href="/education"]').click({force: true});
            cy.wait(1000);
            cy.get('.articles--item-read').eq(0).click({force: true});
            cy.wait(2000);
        });
    });

    it('checkNotification', function () {
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
            cy.get('.agent-dashboard--client-activity-user-item-counter').contains('2');git
        });
    });
});





