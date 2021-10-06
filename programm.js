var http = require("http");

var server=http.createServer(function(request, response) {
  console.log ("Connection established");
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(`<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">

  <title>The HTML5 Herald</title>
  <meta name="description" content="Basic course of Node.js">
  <meta name="author" content="ONPU">

  <link rel="stylesheet" href="css/styles.css?v=1.0">

  <!--[if lt IE 9]>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.js"></script>
  <![endif]-->
</head>

<body>
  <script src="js/scripts.js"></script>
  <H1> Test2 </H1>
</body>
</html>`);
  response.end();
});
server.listen(8888);
