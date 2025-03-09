import { GraphQLID , GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

export const userResponse = new GraphQLObjectType({
    name: "oneUser",
    fields: {
        id: {type: GraphQLID, resolve: (parent) => {return parent._id}},
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        mobileNumber: {type: GraphQLString},
        role: {type: GraphQLString},
        isConfirmed: {type: GraphQLString},
        bannedAt: {type: GraphQLString},
        
    }
}); 

export const allUsersResponse = new GraphQLList(userResponse)
 
export const companyResponse = new GraphQLObjectType({
    name: "oneCompany",
    fields: {
        id: {type: GraphQLID, resolve: (parent) => {return parent._id}},
        companyName: {type: GraphQLString},
        industry: {type: GraphQLString},
        address: {type: GraphQLString},
        numberOfEmployees: {type: GraphQLString},
        bannedAt: {type: GraphQLString},
        approvedByAdmin: {type: GraphQLString},

    }
}); 

export const allCompaniesResponse = new GraphQLList(companyResponse)
export const allDataResponse = new GraphQLObjectType({
    name: "allData",
    fields: {
        users: {type: allUsersResponse},
        Companies: {type: allCompaniesResponse}

    }
})
