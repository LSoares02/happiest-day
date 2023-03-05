const {
  createCloudantClient,
  createDbAndDoc,
  getDoc,
  getAllDocs,
  deleteDoc,
} = require("../common/cloudant");

const cloudantDbName = process.env.CLOUDANT_DB_NAME;

async function insertOnCloudant(docId, document) {
  try {
    const client = createCloudantClient();
    return await createDbAndDoc(client, docId, document, cloudantDbName);
  } catch (err) {
    console.log(err);
    return { Error: "Insertion failed!" };
  }
}

async function getOneFromCloudant(docId) {
  try {
    const client = createCloudantClient();
    return await getDoc(client, docId, cloudantDbName);
  } catch (err) {
    if (err.code === 404) {
      return null;
    } else {
      console.log(err);
      return { Error: "Unnable to get documents!" };
    }
  }
}

async function getAllFromCloudant() {
  try {
    const client = createCloudantClient();
    return await getAllDocs(client, cloudantDbName);
  } catch (err) {
    if (err.code === 404) {
      return { Error: "Database not found" };
    } else {
      console.log(err);
      return { Error: "Unnable to get documents!" };
    }
  }
}

async function deleteFromCloundant(docId, rev) {
  try {
    const client = createCloudantClient();
    return await deleteDoc(client, docId, rev, cloudantDbName);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = {
  insertOnCloudant,
  getOneFromCloudant,
  getAllFromCloudant,
  deleteFromCloundant,
};
