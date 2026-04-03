const mongoose = require('mongoose');
const Job = require('../models/job');

const validateId = (id) => mongoose.Types.ObjectId.isValid(id);

const addJob = async (req, res) => {
  try {
    const job = new Job({
      ...req.body,
      userId: req.user.id
    });
    const savedJob = await job.save();
    res.json(savedJob);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
};


const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.user.id });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getJobById = async (req, res) => {
  if (!validateId(req.params.id)) {
    return res.status(400).json({ error: 'Invalid job id' });
  }
  try {
    const job = await Job.findOne({ _id: req.params.id, userId: req.user.id });
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateJob = async (req, res) => {
  if (!validateId(req.params.id)) {
    return res.status(400).json({ error: 'Invalid job id' });
  }
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedJob) return res.status(404).json({ error: 'Job not found' });
    res.json(updatedJob);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
};

const deleteJob = async (req, res) => {
  if (!validateId(req.params.id)) {
    return res.status(400).json({ error: 'Invalid job id' });
  }
  try {
    const deleted = await Job.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Job not found' });
    res.json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addJob, getJobs, getJobById, updateJob, deleteJob };