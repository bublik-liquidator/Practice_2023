import createError from 'http-errors';
import logger from 'morgan';
import express, { Express, NextFunction, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import "reflect-metadata"

import * as dotenv from 'dotenv';
dotenv.config();

import pino from 'pino';
import pretty from 'pino-pretty';
const loggerr = pino(pretty());

import indexControler from "./controller/index.controler";
import meetupsController from "./controller/meetups.controller";


const app: Express = express();
const port = process.env.INDEX_APP_PORT || 3000;

app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", indexControler);
app.use("/api/meetup", meetupsController);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});
app.listen(port, () => {
  loggerr.info("Running on port " + port);
});
