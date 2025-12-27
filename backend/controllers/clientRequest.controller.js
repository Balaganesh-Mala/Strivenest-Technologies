import Client from "../models/client.model.js";
import ClientRequest from "../models/clientRequest.model.js";
import generateClientId from "../utils/generateClientId.js";

/* ================= SUBMIT CLIENT REQUEST ================= */
export const submitClientRequest = async (req, res) => {
  const {
    fullName,
    email,
    phone,
    companyName,
    serviceType,
    projectTitle,
    projectDescription,
    estimatedBudget,
    expectedTimeline,
  } = req.body;

  if (!fullName || !email || !phone || !serviceType || !projectTitle) {
    return res.status(400).json({
      message: "Required fields missing",
    });
  }

  /* ================= FIND OR CREATE CLIENT ================= */
  let client = await Client.findOne({ email });

  if (!client) {
    const clientId = await generateClientId();

    client = await Client.create({
      clientId,
      fullName,
      email,
      phone,
      companyName,
    });
  }

  /* ================= CREATE REQUEST ================= */
  const request = await ClientRequest.create({
    client: client._id,
    clientId: client.clientId,
    serviceType,
    projectTitle,
    projectDescription,
    estimatedBudget,
    expectedTimeline,
  });

  res.status(201).json({
    success: true,
    message: "Request submitted successfully",
    clientId: client.clientId,
    requestId: request._id,
  });
};
