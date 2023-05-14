"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const meetup_model_1 = require("../model/meetup.model");
const meetups_repository_1 = __importDefault(require("../repository/meetups.repository"));
function getAll(page, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield meetups_repository_1.default.getAll(page, limit);
    });
}
function getById(meetupId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield meetups_repository_1.default.getById(parseInt(meetupId, 10));
    });
}
function post(request) {
    return __awaiter(this, void 0, void 0, function* () {
        const a = new meetup_model_1.Meetup();
        a.name = request.name;
        a.description = request.description;
        a.tags = request.tags;
        a.place = request.place;
        a.time = request.time;
        //new Meetup(null,request.name,request.description,request.tags,request.place,request.time)
        return yield meetups_repository_1.default.post(a);
    });
}
function put(newmeetup, id) {
    return __awaiter(this, void 0, void 0, function* () {
        //newmeetup заменить тип
        return yield meetups_repository_1.default.put(newmeetup, id);
    });
}
function deleteById(meetupId) {
    return meetups_repository_1.default.deleteById(parseInt(meetupId, 10));
}
exports.default = {
    getAll,
    getById,
    post,
    put,
    deleteById,
};
