export interface IJWTDecoded {
    user: {
        _id: string;
    };
}

export interface IAuth extends IJWTDecoded {
    token: string;
    isAuthenticated: boolean;
}

export interface IGraphQLContext {
    req: {
        headers?: {
            authorization?: string;
        };
        auth?: IAuth;
    };
}
