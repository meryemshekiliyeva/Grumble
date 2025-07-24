const Company = require('../models/Company');

exports.getAllCompanies = async (req, res) => {
  const companies = await Company.findAll();
  res.json(companies);
};

exports.getCompanyById = async (req, res) => {
  const company = await Company.findByPk(req.params.id);
  if (!company) return res.status(404).json({ error: 'Company not found' });
  res.json(company);
};

exports.createCompany = async (req, res) => {
  const company = await Company.create(req.body);
  res.status(201).json(company);
};

exports.updateCompany = async (req, res) => {
  const company = await Company.findByPk(req.params.id);
  if (!company) return res.status(404).json({ error: 'Company not found' });
  await company.update(req.body);
  res.json(company);
};

exports.deleteCompany = async (req, res) => {
  const company = await Company.findByPk(req.params.id);
  if (!company) return res.status(404).json({ error: 'Company not found' });
  await company.destroy();
  res.json({ message: 'Company deleted' });
};
