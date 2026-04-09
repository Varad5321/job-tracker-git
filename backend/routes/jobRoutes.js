const authMiddleware = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();

const { addJob, getJobs, getJobById, updateJob, deleteJob } = require('../controllers/jobController');

// 👇 IMPORTANT
router.post('/jobs', authMiddleware, addJob);
router.get('/jobs', authMiddleware, getJobs);
router.get('/jobs/:id', authMiddleware, getJobById);
router.put('/jobs/:id', authMiddleware, updateJob);
router.delete('/jobs/:id', authMiddleware, deleteJob);



module.exports = router;