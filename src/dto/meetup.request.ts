import { Meetup } from '../model/meetup.model'
export class MeetupRequest {
  //id?: bigint
  name!: string
  description!: string
  tags!: string[]
  place!: string
  time!: string


  constructor(model: Meetup) {
  // this.id = model.id
    this.name = model.name
    this.description = model.description
    this.tags = model.tags
    this.place = model.place
    this.time = model.time
  }
}