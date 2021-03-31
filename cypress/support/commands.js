// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


Cypress.Commands.add("getTwilloCode", ({accountSid, authToken, telFrom, telTo}) => {
    const twilio = require('twilio');
    const LIMIT = 1;
    const client = new twilio(accountSid, authToken);
    client.messages.list({
        // dateSent: new Date(Date.UTC(2021, 1, 14, 0, 0, 0)),
        from: telFrom,
        to: telTo,
        limit: LIMIT
    })
        // .then(messages => messages.forEach(m => cy.log(m.sid,m.body)));
        .then(result => {
            console.log(result);
            return result;
        });
});

Cypress.Commands.add('inviteClient', () => {
    cy.fixture('secret').then(({ secretData }) => {
        cy.get('a[href="/agent/dashboard/client/invite"]').click({force: true});
        cy.get('input[id="agent-dashboard-firstname"]').type(secretData.FirstNameInvClient,{force: true});
        cy.get('input[id="agent-dashboard-lastname"]').type(secretData.LastNameInvClient,{force: true});
        secretData.lastEmailInviteClient = parseInt(secretData.lastEmailInviteClient) + 1;
        console.log(secretData.lastEmailInviteClient);
        cy.writeFile('./cypress/fixtures/secret.json', JSON.stringify(secretData));
        let emailForInviteClient = secretData.emailInvClient.replace("@", "+" + secretData.lastEmailInviteClient + "@");
        cy.get('input[id="agent-dashboard-email"]').type(secretData.emailForInviteClient,{force: true});
        cy.get('.button').click({force: true});
        cy.get('img[src="/images/agent-invite-client-congratulations.png"]').should('exist', {force: true});
    });
});