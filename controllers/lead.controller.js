const Lead = require('../models/lead.model');

// Create Lead
const createLead = async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.status(201).json({ success: true, message: "Lead created", lead });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Leads
const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Lead
const getLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Lead
const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Lead updated", lead });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Lead
const deleteLead = async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: "Lead deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    createLead,
    getLeads,
    getLead,
    updateLead,
    deleteLead

}
