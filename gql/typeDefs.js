import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Collection {
    id: ID!
    title: String! 
    items: [Item!]!
  }
  type Item {
    id: ID!
    name: String!
    price: Float!
    imageUrl: String!
    # collection: Collection
  }
  type Query {
    collections: [Collection!]!
    collection(id: ID!): Collection
    getCollectionByTitle(title: String): Collection
  }
`;