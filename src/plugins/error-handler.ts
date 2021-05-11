import Sentry from '@sentry/node';
import { FastifyPluginCallback } from 'fastify';
import plugin from 'fastify-plugin';

const errorHandler: FastifyPluginCallback = (fastify, _, done) => {
    fastify.setErrorHandler((error, __, reply) => {
        Sentry.captureException(error);
        console.error(error);
        reply.code(500).send({ message: 'Something went wrong.' });
    });

    done();
};

export default plugin(errorHandler);
