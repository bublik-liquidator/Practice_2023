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
//const schema = require("../validation/meetup");
const pino_1 = __importDefault(require("pino"));
const pino_pretty_1 = __importDefault(require("pino-pretty"));
const loggerr = (0, pino_1.default)((0, pino_pretty_1.default)());
const db_Provider_1 = __importDefault(require("../config/db.Provider"));
// createConnection()
//   .then(async (connection) => {
//     const meetup = new Meetup();
//     meetup.name = 'TypeScript Meetup';
//     meetup.description = 'A meetup for TypeScript enthusiasts';
//     meetup.tags = ['TypeScript', 'Web Development'];
//     meetup.place = 'San Francisco';
//     meetup.time = new Date().toISOString();
//     await connection.manager.save(meetup);
//     console.log('Meetup created successfully');
//     await connection.close();
//   })
//   .catch((error) => console.log(error));
loggerr.info(process.env.POSTGRESQL_PORT);
function getAll(page, size) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield db_Provider_1.default.pool.query("SELECT * FROM meetup ORDER BY id OFFSET $1 LIMIT $2", [(page - 1) * size, size]);
            if (result.rows.length > 0) {
                loggerr.info("Meetups exist.");
                return result.rows;
            }
            else {
                return 0;
            }
        }
        catch (err) {
            loggerr.error(err);
            throw new Error("Repository getAll error");
        }
    });
}
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield db_Provider_1.default.pool.query(`SELECT * FROM meetup WHERE id = ${id}`);
            if (result.rows.length > 0) {
                return result.rows[0];
            }
            else {
                return 0;
            }
        }
        catch (err) {
            loggerr.error(err);
            throw new Error("Repository getById error");
        }
    });
}
function post(meetup) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "INSERT INTO meetup(name, description, tags, place, time) VALUES($1, $2, $3, $4, $5)  RETURNING *";
        const values = [meetup.name, meetup.description, meetup.tags, meetup.place, meetup.time];
        try {
            const res = yield db_Provider_1.default.pool.query(query, values);
            loggerr.info("Data has been saved!");
            return res.rows[0];
        }
        catch (error) {
            loggerr.error(error);
            throw new Error("Repository post error");
        }
    });
}
;
function put(meetup, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = "UPDATE meetup SET name = $1, description = $2, tags = $3, place = $4, time = $5 WHERE id = $6 RETURNING *";
        const values = [meetup.name, meetup.description, meetup.tags, meetup.place, meetup.time, id];
        try {
            const res = yield db_Provider_1.default.pool.query(query, values);
            loggerr.info("Meetup with ID:" + id + " updated successfully.");
            return res.rows[0];
        }
        catch (error) {
            loggerr.error(error);
            throw new Error("Repository put error");
        }
    });
}
function deleteById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_Provider_1.default.pool.query(`DELETE FROM meetup WHERE id = ${id}`);
        }
        catch (err) {
            loggerr.error(err);
            throw new Error("Repository deleteById error");
        }
    });
}
exports.default = {
    getAll,
    getById,
    post,
    put,
    deleteById,
};
