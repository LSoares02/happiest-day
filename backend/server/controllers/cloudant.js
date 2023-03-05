const {
  insertOnCloudant,
  getOneFromCloudant,
  getAllFromCloudant,
} = require("../helpers/cloudant");

async function insertController(req, res) {
  const { docId, document } = req.body;
  res.send(await insertOnCloudant(docId, document));
}

async function getOneController(req, res) {
  const { docId } = req.body;
  res.send(await getOneFromCloudant(docId));
}

async function getAllController(req, res) {
  res.send(await getAllFromCloudant());
}

module.exports = { insertController, getOneController, getAllController };
