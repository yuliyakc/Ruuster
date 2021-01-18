const twilio = require('twilio');
const accountSid = ''; // Your Account SID from www.twilio.com/console
const authToken = '';   // Your Auth Token from www.twilio.com/console

const client = new twilio(accountSid, authToken);
client.messages.list({
    // dateSent: new Date(Date.UTC(2021, 1, 14, 0, 0, 0)),
    from: "+12054559854",
    to: "+18477806568",
    limit: 1
})
    // .then(messages => messages.forEach(m => cy.log(m.sid,m.body)));
    .then(result => console.log(result));


