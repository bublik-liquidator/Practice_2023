
import { MeetupDTO } from "../dto/meetup.dto";
import { Meetup } from "../model/meetup.model";
import meetupService from "../service/meetup.service";
import express, { Express, NextFunction, Request, Response, Router } from 'express';
const router: Router = express.Router();



router.get("/", async (req, res) => {
  var page: number = parseInt(req.query.page as string);
  var limit: number = parseInt(req.query.limit as string);

  if (isNaN(page)) {
    page = 1;
  }
  if (isNaN(limit)) {
    limit = 10;
  }
  const result = await meetupService.getAll(page, limit);
  res.json(result);
});

router.get("/:id", async (req, res) => {
  const result = await meetupService.getById(req.params.id);
  return res.json(new MeetupDTO(result));
});

router.post("/", async (req, res) => {  
  //const result = await meetupService.post(req.body);  
  let meetup=await meetupService.post(req.body) as Meetup
  return res.json(new MeetupDTO(meetup));
});

router.put("/:id", async (req, res) => {
  const result = await meetupService.put(req.body,parseInt(req.params.id));
  return res.json(new MeetupDTO(result));
});

router.delete("/:id",async (req, res) => {
  const result = await meetupService.deleteById(parseInt(req.params.id));
  return res.json(new MeetupDTO(result));
});


export default router;
