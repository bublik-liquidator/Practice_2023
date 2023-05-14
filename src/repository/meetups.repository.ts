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
  const { rows } = await db.pool.query(
    "SELECT * FROM meetup ORDER BY id OFFSET $1 LIMIT $2",
    [(page - 1) * size, size]
  );
  return rows;
}

async function getById(id: any) {
  {
    const query = {
      text: "SELECT * FROM meetup WHERE id = $1",
      values: [id],
    }

    try {
      const res = await db.pool.query(query)
      return res.rows[0]
    } catch (err) {
      loggerr.info(err);
    }
  }
}
async function post(meetup: Meetup) {
  const query = {
    text: "INSERT INTO meetup(name, description, tags, place, time) VALUES($1, $2, $3, $4, $5)",
    values: [meetup.name, meetup.description, meetup.tags, meetup.place, meetup.time],
  };

  try {
    await db.pool.query(query)
    loggerr.info("Data has been saved!");
    return meetup

  } catch (error) {
    loggerr.error(error);
  }
};

async function put(meetup: any, id: any) {

  const query = "UPDATE meetup SET name = $1, description = $2, tags = $3, place = $4, time = $5 WHERE id = $6 RETURNING *";
  const values = [meetup.name, meetup.description, meetup.tags, meetup.place, meetup.time, id];
  try {
    const res = await db.pool.query(query, values);
    loggerr.info("Meetup ${id} updated successfully.");
    return res.rows[0];
  } catch (error) {
    loggerr.error(error);
  }
}

async function deleteById(id: any) {
  const query = {
    text: "DELETE FROM meetup WHERE id = $1 RETURNING *",
    values: [id],
  };

  try {
    const res = await db.pool.query(query);
    if (res.rowCount === 0) {
      return { message: "Data not found" };
    }
    else {
      return res.rows[0];;
    }

  } catch (error) {
    console.log(error)
    loggerr.info(error);
  }
}

export default {
  getAll,
  getById,
  post,
  put,
  deleteById,
};
