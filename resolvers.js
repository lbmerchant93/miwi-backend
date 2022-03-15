const JournalEntry = require('./models/JournalEntry.model');

const resolvers = {
    Query: {
      hello: () => {
        return "Hello World";
      },
      getAllJournalEntries: async () => {
        return await JournalEntry.find();
      },
      getJournalEntry: async (_parent, {id}, _context, _info) => {
        return await JournalEntry.findById(id);
      }
      // getJournalEntry: async (parent, args, context, info) => {
      //   const { id } = args
      // }
    },

    Mutation: {
      createJournalEntry: async (parent, args, context, info) => {
        const { date } = args.journalEntry;
        const journalEntry = new JournalEntry({ date });
        await journalEntry.save();
        return journalEntry;
      },
      deleteJournalEntry: async (parent, args, context, info) => {
        const { id } = args;
        await JournalEntry.findByIdAndDelete(id);
        return "Ok, journal entry deleted";
      },
      updateJournalEntry: async (parent, args, context, info) => {
        const { id } = args;
        const { date } = args.journalEntry;
        // const updates = {}
        // if (title !== undefined) {
        //   updates.title = title
        // }
        const journalEntry = await JournalEntry.findByIdAndUpdate(
          id, 
          // updates
          {date}, 
          {new: true}
        );
        return journalEntry;
      }
    },
};

module.exports = resolvers;