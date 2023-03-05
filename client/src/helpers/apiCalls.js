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
