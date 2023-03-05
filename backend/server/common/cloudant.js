const { CloudantV1 } = require("@ibm-cloud/cloudant");
const { IamAuthenticator } = require("ibm-cloud-sdk-core");

const cloudantApiKey = process.env.CLOUDANT_APIKEY;
const cloudantURL = process.env.CLOUDANT_URL;

function createCloudantClient() {
  const authenticator = new IamAuthenticator({
    apikey: cloudantApiKey,
  });
  const client = CloudantV1.newInstance({
    authenticator: authenticator,
  });
  client.setServiceUrl(cloudantURL);

  return client;
}

async function createDbAndDoc(client, docId, document, cloudantDbName) {
  return new Promise(async (resolve, reject) => {
    try {
      const putDatabaseResult = (
        await client.putDatabase({
          db: cloudantDbName,
        })
      ).result;
      if (putDatabaseResult.ok) {
        console.log(`"${cloudantDbName}" database created.`);
      }
    } catch (err) {
      if (err.code === 412) {
        console.log(
          `Cannot create "${cloudantDbName}" database, it already exists. Will connect to existing Db...`
        );
      } else {
        reject(err);
      }
    }

    try {
      resolve(await updateDoc(client, docId, document, cloudantDbName));
    } catch (err) {
      if (err.code === 404 || err.code === "noid" || Array.isArray(document)) {
        console.log(
          "Could not update document... Maybe it is a new insertion! Will try inserting..."
        );
        resolve(await createDoc(client, document, cloudantDbName));
      } else {
        console.log(err);
        reject(err);
      }
    }
  });
}

async function updateDoc(client, docId, document, cloudantDbName) {
  if (!docId) throw { code: "noid" };
  const existingDocument = (
    await client.getDocument({
      docId: docId,
      db: cloudantDbName,
    })
  ).result;

  document._rev = existingDocument._rev;
  document._id = docId;

  await client.postDocument({
    db: cloudantDbName,
    document: document,
  });

  return { status: "Document updated with success." };
}

async function createDoc(client, document, cloudantDbName) {
  if (Array.isArray(document)) {
    document.forEach((doc) => {
      delete doc._id;
      delete doc._rev;
    });
    console.log(
      await client.postBulkDocs({
        db: cloudantDbName,
        bulkDocs: (CloudantV1.BulkDocs = { docs: document }),
      })
    );
    return { status: "Documents created with success." };
  } else {
    delete document._id;
    delete document._rev;
    return await client.postDocument({
      db: cloudantDbName,
      document: document,
    });
  }
}

async function getDoc(client, docId, cloudantDbName) {
  return new Promise(async (resolve, reject) => {
    try {
      const getDocParams = { db: cloudantDbName, docId: docId };
      const response = await client.getDocument(getDocParams);
      const { result } = response;

      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
}

async function getAllDocs(client, cloudantDbName) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await client.postAllDocs({
        db: cloudantDbName,
        includeDocs: true,
      });
      resolve(response);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}

async function deleteDoc(client, docId, rev, cloudantDbName) {
  await client.deleteDocument({
    db: cloudantDbName,
    docId: docId,
    rev: rev,
  });
}

module.exports = {
  createCloudantClient,
  createDbAndDoc,
  getDoc,
  getAllDocs,
  deleteDoc,
};
