import Assignment from "../models/ProjectAssignment.js";
import Quote from "../models/quote.js"; // 👈 Make sure you have quote.js model in models folder

// 🔹 Create new assignment & update quote status
export const createAssignment = async (req, res) => {
  try {
    const {
      quoteId,
      clientName,
      email,
      phone,
      service,
      message,
      assignedTo,
      startDate,
      deadline,
      priority,
      remarks,
      status,
    } = req.body;

    // Validation
    if (!quoteId || !assignedTo || !deadline || !startDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if assignment already exists for this quote
    const existing = await Assignment.findOne({ quoteId });
    if (existing) {
      return res.status(400).json({ message: "Project already assigned" });
    }

    // Create new assignment
    const newAssignment = new Assignment({
      quoteId,
      clientName,
      email,
      phone,
      service,
      message,
      assignedTo,
      startDate,
      deadline,
      priority,
      remarks,
      status: status || "Assigned",
    });

    await newAssignment.save();

    // 🔹 Update quote status in DB
    await Quote.findByIdAndUpdate(quoteId, { status: "Assigned" });

    res.status(201).json({
      message: "Project assigned successfully",
      assignment: newAssignment,
    });
  } catch (err) {
    console.error("Error creating assignment:", err);
    res.status(500).json({ message: "Server error while creating assignment" });
  }
};

// 🔹 Get all assignments
export const getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    res.status(200).json(assignments);
  } catch (err) {
    console.error("Error fetching assignments:", err);
    res.status(500).json({ message: "Failed to load assignments" });
  }
};

// 🔹 Update assignment status (e.g. to "In Progress" or "Completed")
export const updateAssignmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updated = await Assignment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.status(200).json({
      message: "Assignment status updated successfully",
      assignment: updated,
    });
  } catch (err) {
    console.error("Error updating assignment:", err);
    res.status(500).json({ message: "Failed to update assignment status" });
  }
};

// 🔹 Delete assignment
export const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Assignment.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    // Optionally revert the quote status to "Accepted"
    await Quote.findByIdAndUpdate(deleted.quoteId, { status: "Accepted" });

    res.status(200).json({ message: "Assignment deleted successfully" });
  } catch (err) {
    console.error("Error deleting assignment:", err);
    res.status(500).json({ message: "Failed to delete assignment" });
  }
};
