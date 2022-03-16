const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type JournalEntry {
    id: ID
    userId: String
    date: String
    waterIntake: Int
    proteinIntake: Int
    exercise: Int
    kegels: Int
    garlandPose: Int
    prenatalVitamins: Boolean
    probiotics: Boolean
  }

  type Query {
    getAllJournalEntries: [JournalEntry]
    getJournalEntry(id: ID): JournalEntry
  }

  input JournalEntryInput {
    date: String
    userId: String
    waterIntake: Int
    proteinIntake: Int
    exercise: Int
    kegels: Int
    garlandPose: Int
    prenatalVitamins: Boolean
    probiotics: Boolean
  }

  type Mutation {
    createJournalEntry(journalEntry: JournalEntryInput): JournalEntry
    deleteJournalEntry(id: ID): String
    updateJournalEntry(id: ID, journalEntry: JournalEntryInput): JournalEntry
  }
`;

module.exports = typeDefs;