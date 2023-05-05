const express = require('express');
const router = express.Router();
const meetupService = require('../service/meetupService');

router.get('/', (req, res) => res.json(meetupService.getAll(req, res)));

router.get('/:id', (req, res) => {
 // console.log((meetupService.getById(req.params.id)))
 // res.json(meetupService.getById(req.params.id));
  return res.json(meetupService.getById(req.params.id));
});

router.post('/', (req, res) => {
  const newmeetup = req.body;
  return res.json(meetupService.save(newmeetup));
});

router.delete('/:id', (req, res) => {
  const meetupId = req.params.id;
  return res.json(meetupService.deleteById(meetupId)); 
});

module.exports = router;