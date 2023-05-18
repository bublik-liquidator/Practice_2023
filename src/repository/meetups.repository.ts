//const schema = require("../validation/meetup");
import pino from 'pino';
import pretty from 'pino-pretty';
const loggerr = pino(pretty());
import db from "../config/db.Provider"

// import { createConnection } from 'typeorm';
import { Meetup } from '../model/meetup.model';
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

async function getAll(page: number, size: number): Promise<any> {
  try {
    const result = await db.pool.query("SELECT * FROM meetup ORDER BY id OFFSET $1 LIMIT $2", [(page - 1) * size, size]);
    if (result.rows.length > 0) {
      loggerr.info("Meetups exist.");
      return result.rows;
    }
    else {
      return 0
    }
  }
  catch (err) {
    loggerr.error(err);
    throw new Error("Repository getAll error");
  }
}


async function getById(id: number) {
  try {
    const result = await db.pool.query(`SELECT * FROM meetup WHERE id = ${id}`);
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return 0
    }
  } catch (err) {
    loggerr.error(err);
    throw new Error("Repository getById error");
  }
}
async function post(meetup: Meetup) {
  const query = "INSERT INTO meetup(name, description, tags, place, time) VALUES($1, $2, $3, $4, $5)  RETURNING *";
  const values = [meetup.name, meetup.description, meetup.tags, meetup.place, meetup.time];
  try {
    const res = await db.pool.query(query, values);
    loggerr.info("Data has been saved!");
    return res.rows[0];
  } catch (error) {
    loggerr.error(error);
    throw new Error("Repository post error");
  }
};


async function put(meetup: Meetup, id: number) {
  const query = "UPDATE meetup SET name = $1, description = $2, tags = $3, place = $4, time = $5 WHERE id = $6 RETURNING *";
  const values = [meetup.name, meetup.description, meetup.tags, meetup.place, meetup.time, id];
  try {
    const res = await db.pool.query(query, values);
    loggerr.info("Meetup with ID:" + id + " updated successfully.");
    return res.rows[0];
  } catch (error) {
    loggerr.error(error);
    throw new Error("Repository put error");

  }
}

async function deleteById(id: number) {
  try {
    await db.pool.query(`DELETE FROM meetup WHERE id = ${id}`);
  } catch (err) {
    loggerr.error(err);
    throw new Error("Repository deleteById error");
  }
}

export default {
  getAll,
  getById,
  post,
  put,
  deleteById,
};
