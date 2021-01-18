const settings = require('./settings');
const http = require("http");
const port = settings.port;
const twilio = require('twilio');
const accountSid = ''; // Your Account SID from www.twilio.com/console
const authToken = '';   // Your Auth Token from www.twilio.com/console


const requestHandler = (request, response) => {
    response.setHeader("Content-Type", "application/json; charset=utf-8;");
    if(request.url === "/get_code_from_twillo" /*|| request.url === "/"*/){
        const client = new twilio(accountSid, authToken);
        client.messages.list({limit: 1})
            .then(messages => {
                messages.forEach(m => console.log(m.sid,m.body));
                response.end(JSON.stringify(messages));
            });

    } else {
        response.statusCode = 404; // адрес не найден
        response.write("Not Found");
        response.end();
    }
    //response.end(); -- make an end in every route separatly
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`Server running on localhost:${port}`);
    console.log(`server is listening on ${port}...`)
});
