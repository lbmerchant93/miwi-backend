const JournalEntry = require('./models/JournalEntry.model');

const resolvers = {
    Query: {
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
        const { 
          userId, 
          date, 
          waterIntake, 
          proteinIntake, 
          exercise, 
          kegels, 
          garlandPose, 
          prenatalVitamins, 
          probiotics  
        } = args.journalEntry;
        const journalEntry = new JournalEntry({ 
          userId, 
          date, 
          waterIntake, 
          proteinIntake, 
          exercise, 
          kegels, 
          garlandPose, 
          prenatalVitamins, 
          probiotics
        });
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
        const { 
          date, 
          waterIntake, 
          proteinIntake, 
          exercise, 
          kegels, 
          garlandPose, 
          prenatalVitamins, 
          probiotics  
        } = args.journalEntry;
        // const updates = {}
        // if (title !== undefined) {
        //   updates.title = title
        // }
        const journalEntry = await JournalEntry.findByIdAndUpdate(
          id, 
          // updates
          {
            date, 
            waterIntake, 
            proteinIntake, 
            exercise, 
            kegels, 
            garlandPose, 
            prenatalVitamins, 
            probiotics
          }, 
          {new: true}
        );
        return journalEntry;
      }
    },
};

module.exports = resolvers;