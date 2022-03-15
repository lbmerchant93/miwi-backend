const mongoose = require('mongoose');

const JournalEntrySchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },  
});

const JournalEntry = mongoose.model('journalEntry', JournalEntrySchema);
module.exports = JournalEntry;