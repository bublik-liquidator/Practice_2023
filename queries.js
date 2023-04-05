const Pool = require("pg").Pool;
const pool = new Pool({ //пул из 5-и подключений 
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

module.exports = {
  getMeetup,
  getMeetupById,
};
