import fastify from 'fastify';
import compress from 'fastify-compress';
import cors from 'fastify-cors';
// import Sentry from '@sentry/node';
import helmet from 'fastify-helmet';

import plugins from './plugins';

// Sentry.init({ enabled: process.env.NODE_ENV === 'production' });

export default (options = {}) => {
    const app = fastify({ ...options, ignoreTrailingSlash: true });

    app.register(helmet, {
        contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
    });
    app.register(cors, { credentials: true, origin: true });
    app.register(compress);

    app.register(plugins);

    app.all('/*', {}, (request, reply) => {
        reply.code(404).send({ message: 'Page not found 😞' });
    });

    return app;
};
