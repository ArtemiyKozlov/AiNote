import * as express from "express";
import * as bodyParser from "body-parser";

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 3000;
app.listen(port, function(){
    console.log("Server is listening port %d in %s mode", 3000, app.settings.env);
});
