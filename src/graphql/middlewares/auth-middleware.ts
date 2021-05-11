import { ResolverMiddleware } from 'graphql-compose';
import jwt from 'jsonwebtoken';
import { IAuth, IGraphQLContext, IJWTDecoded } from '../../types';

const verifyToken = (token: string) => {
    return new Promise<IAuth>((resolve, reject) => {
        if (!token || typeof token !== 'string' || token.trim().length === 0) {
            return reject();
        }

        const tokenString = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

        return jwt.verify(tokenString, process.env.JWT_SECRET, (error, decoded: IJWTDecoded) => {
            if (error) {
                return reject();
            }

            // maybe here check if account.activated = true in the future
            return resolve({ token: tokenString, isAuthenticated: true, user: decoded.user });
        });
    });
};

const authMiddleware: ResolverMiddleware<unknown, IGraphQLContext> = async (
    resolve,
    source,
    args,
    context,
    info
) => {
    const token = context.req?.headers?.authorization;

    try {
        const auth = await verifyToken(token);
        context.req = {
            ...context.req,
            auth,
        };
        return resolve(source, args, context, info);
    } catch {
        throw new Error('Not Authenticated');
    }
};

export default authMiddleware;
