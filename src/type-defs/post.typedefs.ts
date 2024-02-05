export const postTypeDefs = `
  type Post {
    id: ID!
    createdAt : String!
    updatedAt : String!
    title: String!
    content: String!
    author: String!
  }

  type Query {
    posts: [Post!]!
  }

  type Mutation {
    createPosts(title: String!, content: String!,author : String!): Post!
  }
`
