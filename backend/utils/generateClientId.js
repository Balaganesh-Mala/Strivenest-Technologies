import Client from "../models/client.model.js";

const generateClientId = async () => {
  const count = await Client.countDocuments();
  const year = new Date().getFullYear();

  return `CLIENT-${year}-${String(count + 1).padStart(5, "0")}`;
};

export default generateClientId;
