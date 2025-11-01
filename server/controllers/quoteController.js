import Quote from "../models/Quote.js";

export const createQuote = async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    if (!name || !email || !service) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newQuote = await Quote.create({
      name,
      email,
      phone,
      service,
      message,
      status: "Pending",
    });

    return res.status(201).json({
      message: "Quote submitted successfully!",
      quote: newQuote,
    });
  } catch (error) {
    console.error("Quote Creation Error:", error);
    res.status(500).json({ message: "Server error while submitting quote" });
  }
};

export const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.status(200).json(quotes);
  } catch (error) {
    console.error("Fetch Quotes Error:", error);
    res.status(500).json({ message: "Server error while fetching quotes" });
  }
};

export const getQuoteById = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }
    res.status(200).json(quote);
  } catch (error) {
    console.error("Get Quote Error:", error);
    res.status(500).json({ message: "Server error while fetching quote" });
  }
};

export const updateQuoteStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }

    quote.status = status || quote.status;
    await quote.save();

    res.status(200).json({
      message: `Quote ${status.toLowerCase()} successfully!`,
      updatedQuote: quote,
    });
  } catch (error) {
    console.error("Update Quote Error:", error);
    res.status(500).json({ message: "Server error while updating quote" });
  }
};

export const deleteQuote = async (req, res) => {
  try {
    const deletedQuote = await Quote.findByIdAndDelete(req.params.id);
    if (!deletedQuote) {
      return res.status(404).json({ message: "Quote not found" });
    }

    res.status(200).json({ message: "Quote deleted successfully" });
  } catch (error) {
    console.error("Delete Quote Error:", error);
    res.status(500).json({ message: "Server error while deleting quote" });
  }
};
