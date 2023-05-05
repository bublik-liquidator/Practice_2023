const { meetupValidation } = require("../validation/meetup");
const pino = require("pino");
const pretty = require("pino-pretty");
const loggerr = pino(pretty());

const paginate = require('../pagination/pagination');
var meetupsData;

loggerr.info(process.env.POSTGRESQL_PORT);

var Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.POSTGRESQL_USER,
  host: process.env.POSTGRESQL_HOST,
  database: process.env.POSTGRESQL_DB_NAME,
  password: process.env.POSTGRESQL_PASSWORD,
  port: process.env.POSTGRESQL_PORT,
});


function validatemeetup(meetup) {
  if (!(meetup.name && meetup.department)) {
    throw new Error("meetup Name and department is required");
  }
}

pool.query("SELECT * FROM meetup ORDER BY id ASC", (error, results) => {
  if (error) {
    throw error; 
  }
  meetupsData = results.rows;
});

function getAll(req, res) {
  //res.json(paginate(meetupsData, req, res));
 paginate(meetupsData, req, res);
}
function save(meetup) {
  const { name, description, tag, place, time } = meetup;
  pool.query(
    "INSERT INTO meetup(name, description, tag, place, time) VALUES ($1, $2, $3, $4, $5)",
    [name, description, tag, place, time],
    (error, results) => {
      if (error) {
        throw error;
      }
    }
  );
  meetupsData.push(meetup);
  return meetup;
}

async function getById(id) {
  const query = "SELECT * FROM meetup WHERE id = $1";
  const values = [id];
  const { rows } = await pool.query(query, values);
  loggerr.info("meetupID name " + rows[0].name);
  return rows[0];
}

async function deleteById(id) {
  const query = {
    text: 'DELETE FROM meetup WHERE id = $1',   values: [id],
  };

  try {
    const res = await pool.query(query);
    return res.rowCount;
  } catch (err) {
    console.error(err);
    throw err;
  }
}


module.exports = {
  getAll,
  save,
  getById,
  deleteById,
};
