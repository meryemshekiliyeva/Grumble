const Complaint = require('../models/Complaint');

exports.getAllComplaints = async (req, res) => {
  const complaints = await Complaint.findAll();
  res.json(complaints);
};

exports.getComplaintById = async (req, res) => {
  const complaint = await Complaint.findByPk(req.params.id);
  if (!complaint) return res.status(404).json({ error: 'Complaint not found' });
  res.json(complaint);
};

exports.createComplaint = async (req, res) => {
  const complaint = await Complaint.create(req.body);
  res.status(201).json(complaint);
};

exports.updateComplaint = async (req, res) => {
  const complaint = await Complaint.findByPk(req.params.id);
  if (!complaint) return res.status(404).json({ error: 'Complaint not found' });
  await complaint.update(req.body);
  res.json(complaint);
};

exports.deleteComplaint = async (req, res) => {
  const complaint = await Complaint.findByPk(req.params.id);
  if (!complaint) return res.status(404).json({ error: 'Complaint not found' });
  await complaint.destroy();
  res.json({ message: 'Complaint deleted' });
};
