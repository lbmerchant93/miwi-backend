const mongoose = require('mongoose');

const JournalEntrySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    }, 
    date: {
        type: String,
        required: true
    }, 
    waterIntake: {
        type: Number,
        required: true
    },
    proteinIntake: {
        type: Number,
        required: true
    },
    exercise: {
        type: Number,
        required: true
    }, 
    kegels: {
        type: Number,
        required: true
    }, 
    garlandPose: {
        type: Number,
        required: true
    }, 
    prenatalVitamins: {
        type: Boolean,
        required: true
    }, 
    probiotics: {
        type: Boolean,
        required: true
    }, 
});

const JournalEntry = mongoose.model('journalEntry', JournalEntrySchema);
module.exports = JournalEntry;