const { meetupValidation } = require("./validation/meetup");

const Pool = require("pg").Pool;
const pool = new Pool({
  //пул из 5-и подключений
  user: "practice_person",
  host: "localhost",
  database: "practice_meetup",
  password: "meetUP",
  port: 5432,
});


const getMeetup = (request, response) => {
  pool.query("SELECT * FROM meetup ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error; //исключение, те ошибка
    }
    response.setHeader("Access-Control-Allow-Origin", "*"); //public.Meetup || ACAO указывает, может ли ответ использоваться совместно с кодом запроса из данного источника
    response.status(200).json(results.rows); //запрос выполнен успешно
  });
};

const getMeetupById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query("SELECT * FROM meetup WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.status(200).json(results.rows); //запрос выполнен успешно
  });
};

const createMeetup = (request, response) => {
  const {error}= meetupValidation(request.body); 
  if (error) {
    res.send(schema.validate(req.body).error.details);
    return next({type: 'joi' ,error});
  }
  const { name, description, tag, venue, time } = request.body; //request.query//body-parser извлекает всю часть тела входящего потока запросов и предоставляет ее req.body
  pool.query( "INSERT INTO meetup(name, description, tag, venue, time) VALUES ($1, $2, $3, $4, $5)",  [name, description, tag, venue, time],
    (error, results) => {
      if (error) {
        throw error;

      }
      response.setHeader("Access-Control-Allow-Origin", "*");
      response.status(201).send(`meetup added with name: ${request.body.name}`); // запрос выполнен успешно и привёл к созданию ресурса
    }
  );
};

const updateMeetup = (request, response) => {
  const {error}= meetupValidation(request.body); 
    if (error) {
      console.log(error.details[0].message);
      return res.status(400).json({message:error.details[0].message});
    }
  const id = parseInt(request.params.id);
  const { name, description, tag, venue, time } = request.body;

  pool.query(
    "UPDATE meetup SET name = $1, description = $2, tag = $3, venue = $4, time = $5 WHERE id = $6", [name, description, tag, venue, time, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.setHeader("Access-Control-Allow-Origin", "*");
      response.status(200).send(`meetup modified with ID: ${id}`); // запрос выполнен успешно
    }
  );
};

const deleteMeetup = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query("DELETE FROM Meetup WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.status(200).send(`Meetup deleted with ID: ${id}`); // запрос выполнен успешно
  });
};

module.exports = {
  getMeetup,
  getMeetupById,
  createMeetup,
  updateMeetup,
  deleteMeetup,
};
