const Pool = require("pg").Pool;
const pool = new Pool({
  user: "practice_person",
  host: "localhost",
  database: "practice_meetup",
  password: "meetUP",
  port: 5432,
});
const getMeetup = (request, response) => {
  pool.query("SELECT * FROM meetup ORDER BY id ASC", () => {
    response.setHeader("Access-Control-Allow-Origin", "*"); //  public.Meetup
  });
};

module.exports = {
  getMeetup,
};
