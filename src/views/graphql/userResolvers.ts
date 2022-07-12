import * as TypeGraphQL from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import { User } from "../../generated/type-graphql";
import { getPrismaFromContext } from "../../generated/type-graphql/helpers";
import { PrismaClient } from "../../generated/prisma-client";
import { ApolloContext } from "../../index";

@TypeGraphQL.InputType({
    isAbstract: true
})

export class UserLoginInputData {
    @TypeGraphQL.Field(_type => String, {
      nullable: false
    })
    id!: string;
  
    @TypeGraphQL.Field(_type => String, {
      nullable: true
    })
    displayName?: string | null;
  
    @TypeGraphQL.Field(_type => String, {
      nullable: false
    })
    email!: string; 
}

@TypeGraphQL.ArgsType()
export class CustomCreateUserArgs {
    @TypeGraphQL.Field(_type => UserLoginInputData, {
        nullable: false,
    })
    data!: UserLoginInputData;
}

@TypeGraphQL.Resolver(_of => User)
export class UserOverrideResolver {
    @TypeGraphQL.Mutation(returns => User, { nullable: false })
    async loginUser(
        @TypeGraphQL.Ctx() ctx: ApolloContext,
        @TypeGraphQL.Info() info: GraphQLResolveInfo,
        @TypeGraphQL.Args() args: CustomCreateUserArgs,
    ): Promise<User> {
        const prisma: PrismaClient = getPrismaFromContext(ctx);
        const { id, displayName, email } = args.data;

        const existingUser = await prisma.user.findFirst({
            where: {
                id: id,
                email: email
            },
        });

        return !existingUser 
            ? prisma.user.create({
                data: {
                    id, 
                    displayName, 
                    email, 
                    goals: { 
                        create: [ 
                            { 
                                waterIntakeGoal: null, 
                                proteinIntakeGoal: null, 
                                exerciseGoal: null, 
                                kegelsGoal: null, 
                                garlandPoseGoal: null 
                            } 
                        ]
                    }
                }
            })
            : existingUser
    }
}