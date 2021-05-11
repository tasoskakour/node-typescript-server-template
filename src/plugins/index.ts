import plugin from 'fastify-plugin';

import { FastifyPluginCallback } from 'fastify';
import errorHandler from './error-handler';
import graphql from './graphql';

const registerPlugins: FastifyPluginCallback = (fastify, _, done) => {
    fastify.register(errorHandler);
    fastify.register(graphql);

    done();
};

export default plugin(registerPlugins);
