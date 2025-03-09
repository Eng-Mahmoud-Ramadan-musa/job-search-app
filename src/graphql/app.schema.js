import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { adminQuery } from '../modules/admin/graphql/admin.query.js';
import { adminMutations } from '../modules/admin/graphql/admin.mutation.js';

// schema
  export const schema = new GraphQLSchema({
        query: new GraphQLObjectType({
            name: "RootQuery",
            fields: {
                ...adminQuery,
                }
        }),
        mutation: new GraphQLObjectType({
            name: "RootMutation",
            fields: {
                ...adminMutations,
            }
        })
    })