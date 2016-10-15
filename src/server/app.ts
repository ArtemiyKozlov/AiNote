import * as express from "express";
import * as bodyParser from "body-parser";
import * as methodOverride from "method-override"
import * as errorHandler from "errorhandler"
import * as mongoose from "mongoose";
import {indexController} from "./controllers/index";
import * as nconf from "nconf";
import * as path from "path";

//TODO: add env specific configuration
let pathToConfigurationFile = path.resolve(__dirname, './configuration/config.json');
nconf.argv().env().file(pathToConfigurationFile);

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(errorHandler({log: true}));

app.use(indexController);

let onExit = function() {
    mongoose.connection.close(function () {
        process.exit(0);
    });
};
process.on('SIGINT', onExit).on('SIGTERM', onExit);

let mongoConf = nconf.get('mongo');
let mongoOptions = mongoConf.options;
let mongoConnectionString = mongoConf.connectionString;
mongoose.connect(mongoConnectionString, mongoOptions, function(err) {
    console.log("Sever initialization failed " , err.message);
});

let port = nconf.get('port');
app.listen(port, function(){
    console.log("Server is listening port %d in %s mode", port, app.settings.env);
});
