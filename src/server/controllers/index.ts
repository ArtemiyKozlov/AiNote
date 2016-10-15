import * as express from "express";
import {noteApi} from "../api/noteApi";

export let indexController = express.Router();

indexController.use('/api/note', noteApi);