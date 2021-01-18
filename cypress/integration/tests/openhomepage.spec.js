

it('Signup', () => {
    cy.fixture('twillo-secret').then((secretData) => {
        let code = cy.getTwilloCode(secretData);
        cy.log(code);
        getCode();
        // const client = new twilio(accountSid, authToken);
        // client.messages.list({
        //     // dateSent: new Date(Date.UTC(2021, 1, 14, 0, 0, 0)),
        //     from: '+12054559854',
        //     to: '+18477806568',
        //     limit: 1
        // })
        //     .then(result => console.log(result));
    })
})
