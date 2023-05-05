const meetupRepository = require('../repository/meetupsRepository');
function getAll(req, res) {
  return meetupRepository.getAll(req, res);
}

function save(newmeetup) {
  return meetupRepository.save(newmeetup);
}

function getById(meetupId) {
  return meetupRepository.getById(parseInt(meetupId, 10));
  // const result = await meetupRepository.getById(meetupId);
  // console.log(result)
  // return result;
}

function deleteById(meetupId) {
  return meetupRepository.deleteById(parseInt(meetupId, 10));
}

module.exports = {
  getAll,
  getById,
  save,
  deleteById,
};