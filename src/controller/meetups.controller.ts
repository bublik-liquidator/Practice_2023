
import { MeetupDTO } from "../dto/meetup.dto";
import { Meetup } from "../model/meetup.model";
import meetupService from "../service/meetup.service";

import pino from 'pino';
import pretty from 'pino-pretty';
const loggerr = pino(pretty());

import express, { Express, NextFunction, Request, Response, Router } from 'express';
const router: Router = express.Router();

router.get("/", async (req, res) => {
 // const chec = await db.pool.query(`SELECT COUNT(*) FROM ${meetup}`);
  //parseInt(chec.rows[0].count)
  var page: number = parseInt(req.query.page as string)|| 1;
  var limit: number = parseInt(req.query.limit as string)|| 10;  
  try {    
    const result = await meetupService.getAll(page, limit);
    if (!result) {
      return res.status(404).json({ error: 'Meetup not found' });
    }
    return res.status(200).json(result);

  } catch (err) {
    loggerr.error(err);
    return res.status(500).json({ error: 'Internal Server Error with get all' });
  }

});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const meetup = await meetupService.getById(id);
    if (!meetup) {
      return res.status(404).json({ error: 'Meetup not found' });
    }
    return res.status(200).json(new MeetupDTO(meetup));
  } catch (err) {
    loggerr.error(err);
    return res.status(500).json({ error: 'Internal Server Error with get by id' });
  }

});

router.post("/", async (req, res) => {
  let meetup = await meetupService.post(req.body) as Meetup
  return res.json(new MeetupDTO(meetup));
});

router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const meetup = await meetupService.getById(id);
    if (!meetup) {
      return res.status(404).json({ error: 'Meetup not found' });
    }
    const result = await meetupService.put(req.body, parseInt(req.params.id));
    return res.status(201).json(new MeetupDTO(result));
  } catch (err) {
    loggerr.error(err);
    return res.status(500).json({ error: 'Internal Server Error with put by id' });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const meetup = await meetupService.getById(id);
    if (!meetup) {
      return res.status(404).json({ error: 'Meetup not found' });
    } 
    await meetupService.deleteById(parseInt(req.params.id))
    return res.status(200).json({ message: 'Meetup deleted successfully.' });
  } catch (err) {
    loggerr.error(err);
    return res.status(500).json({ error: 'Internal Server Error with delete by id' });
  }
  //const result = await meetupService.deleteById(parseInt(req.params.id));
  //return res.json(new MeetupDTO(result));
});

export default router;
