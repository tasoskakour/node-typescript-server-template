import { composeMongoose } from 'graphql-compose-mongoose';
import { schemaComposer } from 'graphql-compose';
import { requireMiddlewares } from '../../../utilities/tools';
import { authMiddleware } from '../../middlewares';
import User from '../../../models/user';

const UserTC = composeMongoose(User);

schemaComposer.Query.addFields({
    getUsers: UserTC.mongooseResolvers.findMany({ lean: true }),
});

schemaComposer.Mutation.addFields({
    createUser: UserTC.mongooseResolvers.createOne(),
    // An example below on how to protect resolvers with middlewares
    ...requireMiddlewares([authMiddleware], {
        removeUserById: UserTC.mongooseResolvers.removeById(),
    }),
});
