// TODO Add graphql Middleware examples
import { schemaComposer } from 'graphql-compose';
import './resolvers/init-resolvers';

export const schema = schemaComposer.buildSchema();
