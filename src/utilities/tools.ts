import { ObjMap, Resolver, ResolverMiddleware } from 'graphql-compose';
import { IGraphQLContext } from '../types';

/**
 * Add middlewares to resolvers
 * https://graphql-compose.github.io/docs/api/Resolver.html#withmiddlewares
 */
export const requireMiddlewares = (
    middlewares: Array<ResolverMiddleware<unknown, IGraphQLContext>> = [],
    resolvers: ObjMap<Resolver>
): ObjMap<Resolver> => {
    const ks = Object.keys(resolvers);

    // eslint-disable-next-line no-restricted-syntax
    for (const k of ks) {
        // eslint-disable-next-line no-param-reassign
        resolvers[k] = resolvers[k].withMiddlewares([...middlewares]);
    }
    return resolvers;
};
