import * as TypeGraphQL from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { JournalEntry } from "../../generated/type-graphql";
import { getPrismaFromContext } from "../../generated/type-graphql/helpers";
import { PrismaClient } from "../../generated/prisma-client";
import { ApolloContext } from "../../index";

@TypeGraphQL.InputType({
    isAbstract: true,
})
export class JournalEntryCreateInputData {
    @TypeGraphQL.Field(_type => String, {
    nullable: false
    })
    date!: string;

    @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
    })
    exercise!: number;

    @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
    })
    garlandPose!: number;

    @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
    })
    kegels!: number;

    @TypeGraphQL.Field(_type => Boolean, {
    nullable: false
    })
    prenatalVitamins!: boolean;

    @TypeGraphQL.Field(_type => Boolean, {
    nullable: false
    })
    probiotics!: boolean;

    @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
    })
    proteinIntake!: number;

    @TypeGraphQL.Field(_type => String, {
    nullable: false
    })
    authorId!: string;

    @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
    })
    waterIntake!: number;
}

@TypeGraphQL.ArgsType()
export class CustomCreateJournalEntryArgs {
    @TypeGraphQL.Field(_type => JournalEntryCreateInputData, {
        nullable: false,
    })
    data!: JournalEntryCreateInputData;
}

@TypeGraphQL.Resolver(_of => JournalEntry)
export class JournalEntryOverrideResolver {
    @TypeGraphQL.Mutation(returns => JournalEntry, { nullable: true })
    async createJournalEntry(
        @TypeGraphQL.Ctx() ctx: ApolloContext,
        @TypeGraphQL.Info() info: GraphQLResolveInfo,
        @TypeGraphQL.Args() args: CustomCreateJournalEntryArgs,
    ): Promise<JournalEntry> {
        const prisma: PrismaClient = getPrismaFromContext(ctx);

        const existingJournalEntry = await prisma.journalEntry.findFirst({
            where: {
                authorId: args.data.authorId,
                date: args.data.date
            },
        });

        if (existingJournalEntry)
            throw new Error(
                "A journal entry for the given date already exists.",
            );

        let journalEntry = await prisma.journalEntry.create({
            data: { ...args.data },
        });

        return journalEntry;
    }
}