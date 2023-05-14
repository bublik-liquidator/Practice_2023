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
const meetup_dto_1 = require("../dto/meetup.dto");
const meetup_service_1 = __importDefault(require("../service/meetup.service"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var page = parseInt(req.query.page);
    var limit = parseInt(req.query.limit);
    if (isNaN(page)) {
        page = 1;
    }
    if (isNaN(limit)) {
        limit = 10;
    }
    const result = yield meetup_service_1.default.getAll(page, limit);
    res.json(result);
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield meetup_service_1.default.getById(req.params.id);
    return res.json(new meetup_dto_1.MeetupDTO(result));
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const result = await meetupService.post(req.body);  
    let meetup = yield meetup_service_1.default.post(req.body);
    return res.json(new meetup_dto_1.MeetupDTO(meetup));
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield meetup_service_1.default.put(req.body, parseInt(req.params.id));
    return res.json(new meetup_dto_1.MeetupDTO(result));
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield meetup_service_1.default.deleteById(parseInt(req.params.id));
    return res.json(new meetup_dto_1.MeetupDTO(result));
}));
exports.default = router;
