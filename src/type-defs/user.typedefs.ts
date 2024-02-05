export const userTypeDefs = `
  type User {
    id: ID!
    createdAt : String!
    updatedAt : String!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
  }
`
