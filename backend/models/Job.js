const mongoose = require('mongoose');


const jobSchema = new mongoose.Schema({
    title: { type: String, default: 'Untitled Position' },
    company: { type: String, default: 'Unknown Company' },
    location: { type: String },
    salary: { type: Number },
    status: { type: String, enum: ['open', 'closed', 'draft'], default: 'open' },
    description: { type: String },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);


module.exports = Job;
