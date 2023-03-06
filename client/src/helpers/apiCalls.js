import api from "../services/api";

export async function getAllGifts() {
  try {
    const response = await api.get("/cloudant/getAll");
    return response.data.result.rows;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export async function updateGifter(gift) {
  try {
    await api.post("/cloudant/insert", {
      docId: gift.id,
      document: gift.doc,
    });
  } catch (err) {
    console.log(err);
  }
}
