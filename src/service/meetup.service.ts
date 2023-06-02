import { MeetupRequest } from "../dto/meetup.request";
import { Meetup } from "../model/meetup.model";
import meetupRepository from "../repository/meetups.repository";

async function getAll(page: number, limit: number) {
  return await meetupRepository.getAll(page, limit);
}

async function getById(meetupId: number) {
  return await meetupRepository.getById(meetupId);
}

async function post(request: MeetupRequest) {
  const MeetupReq = new Meetup();
  MeetupReq.name = request.name;
  MeetupReq.description = request.description;
  MeetupReq.tags = request.tags;
  MeetupReq.place = request.place;
  MeetupReq.time = request.time;
  //new Meetup(null,request.name,request.description,request.tags,request.place,request.time)
  return await meetupRepository.post(MeetupReq);
}

async function put(newmeetup: Meetup, id: number) {
  return await meetupRepository.put(newmeetup, id);
}

function deleteById(meetupId: number) {
  return meetupRepository.deleteById(meetupId);
}

export default {
  getAll,
  getById,
  post,
  put,
  deleteById,
};