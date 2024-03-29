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
            include: {
                goals: true
            }
        });
        
        if (existingUser && existingUser.goals === null) {
            const updateUser = await prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    goals: {
                        create: {
                            waterIntakeGoal: 70,
                            proteinIntakeGoal: 70,
                            exerciseGoal: 30,
                            kegelsGoal: 100,
                            garlandPoseGoal: 10
                        }
                    }
                },
                include: {
                    goals: true
                }
            })
            return updateUser
        }
        
        return !existingUser 
            ? await prisma.user.create({
                data: {
                    id, 
                    displayName, 
                    email, 
                    goals: { 
                        create: { 
                            waterIntakeGoal: 70, 
                            proteinIntakeGoal: 70, 
                            exerciseGoal: 30, 
                            kegelsGoal: 100, 
                            garlandPoseGoal: 10 
                        } 
                    }
                }
            })
            : existingUser
    }
}