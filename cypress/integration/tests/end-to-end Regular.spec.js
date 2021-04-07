describe('End to End Regular', function() {

    it('SigninRegular', function () {
        cy.fixture('secret').then((secretData) => {
            cy.log("Go to Home page");
            cy.visit(secretData.ruusterHomePageSignin);
            cy.get('input[name="email"]').type(secretData.emailRegular, {force: true});
            cy.get('input[name="password"]').type(secretData.passRegular, {force: true});
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
            cy.wait(2000);
            cy.get('.dashboard--step-item-text').eq(1).click({force: true});
            cy.get('.budget--select-property-label').contains('Starting Budget');
            cy.wait(2000);
            cy.get('.sidebar-item').eq(0).click({force: true});
            cy.get('.dashboard--step-item-text').eq(2).click({force: true});
            cy.get('.article--category').contains('Planning stage');
            cy.wait(2000);
            cy.get('.sidebar-item').eq(0).click({force: true});
            cy.get('.tabs-tab').eq(1).click({force: true});
            cy.wait(1000);
            cy.get('.tabs-tab').eq(2).click({force: true});
            cy.wait(1000);
            cy.get('.tabs-tab').eq(3).click({force: true});
            cy.wait(1000);
        });
    });
});
