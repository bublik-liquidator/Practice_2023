"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetupRequest = void 0;
class MeetupRequest {
    constructor(model) {
        // this.id = model.id
        this.name = model.name;
        this.description = model.description;
        this.tags = model.tags;
        this.place = model.place;
        this.time = model.time;
    }
}
exports.MeetupRequest = MeetupRequest;
