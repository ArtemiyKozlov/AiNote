import * as express from "express";
import * as bodyParser from "body-parser";
import * as methodOverride from "method-override"
import * as errorHandler from "errorhandler"
import * as config from "config.json";
import * as mongoose from "mongoose";
import {indexController} from "./controllers/index";

let config = config('./server/config.json');
let app = express();

app.configure(function(){
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(methodOverride());
});

app.configure('development', function(){
    app.use(errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(errorHandler());
});

app.use(indexController);

let onExit = function() {
    mongoose.connection.close(function () {
        process.exit(0);
    });
};
process.on('SIGINT', onExit).on('SIGTERM', onExit);

let mongoOptions = config.mongo.options;
let mongoConnectionString = config.mongo.connectionString;
mongoose.connect(mongoConnectionString, mongoOptions, function(err) {
    console.log("Sever initialization failed " , err.message);
});

let port = config.port;
app.listen(port, function(){
    console.log("Server is listening port %d in %s mode", port, app.settings.env);
});
