import { FastifyPluginCallback } from 'fastify';
import plugin from 'fastify-plugin';
import mercurius from 'mercurius';

import { schema } from '../graphql';

const graphql: FastifyPluginCallback = (fastify, _, done) => {
    fastify.register(mercurius, {
        schema,
        graphiql: process.env.NODE_ENV === 'development',
    });

    done();
};

export default plugin(graphql);
