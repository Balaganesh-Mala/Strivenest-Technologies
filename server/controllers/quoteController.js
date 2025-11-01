import Quote from "../models/Quote.js";

/**
 * @desc Submit a new quote request
 * @route POST /api/quotes
 */
export const createQuote = async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    if (!name || !email || !service) {
      return res.status(400).json({ message: "Name, email, and service are required" });
    }

    const newQuote = await Quote.create({
      name,
      email,
      phone,
      service,
      message,
      status: "Pending",
    });

    res.status(201).json({
      message: "✅ Quote submitted successfully!",
      quote: newQuote,
    });
  } catch (error) {
    console.error("❌ Quote Creation Error:", error);
    res.status(500).json({ message: "Server error while submitting quote" });
  }
};

/**
 * @desc Get all quotes (Admin only)
 * @route GET /api/quotes
 */
export const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.status(200).json(quotes);
  } catch (error) {
    console.error("❌ Fetch Quotes Error:", error);
    res.status(500).json({ message: "Server error while fetching quotes" });
  }
};

/**
 * @desc Get single quote by ID
 * @route GET /api/quotes/:id
 */
export const getQuoteById = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }
    res.status(200).json(quote);
  } catch (error) {
    console.error("❌ Get Quote Error:", error);
    res.status(500).json({ message: "Server error while fetching quote" });
  }
};

/**
 * @desc Update quote status (Accept / Decline)
 * @route PUT /api/quotes/:id
 */
export const updateQuoteStatus = async (req, res) => {
  try {
    const { status } = req.body; // "Accepted" or "Declined"
    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }

    quote.status = status || quote.status;
    await quote.save();

    res.status(200).json({
      message: `✅ Quote ${status.toLowerCase()} successfully!`,
      updatedQuote: quote,
    });
  } catch (error) {
    console.error("❌ Update Quote Error:", error);
    res.status(500).json({ message: "Server error while updating quote" });
  }
};

/**
 * @desc Delete quote (Admin only)
 * @route DELETE /api/quotes/:id
 */
export const deleteQuote = async (req, res) => {
  try {
    const deletedQuote = await Quote.findByIdAndDelete(req.params.id);
    if (!deletedQuote) {
      return res.status(404).json({ message: "Quote not found" });
    }

    res.status(200).json({ message: "🗑️ Quote deleted successfully" });
  } catch (error) {
    console.error("❌ Delete Quote Error:", error);
    res.status(500).json({ message: "Server error while deleting quote" });
  }
};
