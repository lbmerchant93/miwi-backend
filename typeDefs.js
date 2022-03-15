const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type JournalEntry {
    id: ID
    date: String
  }

  type Query {
    hello: String

    getAllJournalEntries: [JournalEntry]

    getJournalEntry(id: ID): JournalEntry
  }

  input JournalEntryInput {
    date: String
  }

  type Mutation {
    createJournalEntry(journalEntry: JournalEntryInput): JournalEntry

    deleteJournalEntry(id: ID): String

    updateJournalEntry(id: ID, journalEntry: JournalEntryInput): JournalEntry
  }
`;

module.exports = typeDefs;