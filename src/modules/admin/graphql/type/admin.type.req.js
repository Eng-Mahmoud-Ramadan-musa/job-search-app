import { GraphQLID, GraphQLNonNull} from "graphql"

export const idReq = {
    id: {type: new GraphQLNonNull(GraphQLID)}
}
