it('Signup', () => {
    cy.request('http://localhost:3000/get_code_from_twillo')
        .then((response) => {
            console.log(response.body[0].body.substring(0, 6));
            let code = response.body[0].body.substring(0, 6);
            cy.log(code);
            // cy.log("Code: " + response.body.code);
            // let code = response.body.code;
            // cy.log(code);
            // cy.wait(3000);
        });
})