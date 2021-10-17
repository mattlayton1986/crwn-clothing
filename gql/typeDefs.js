const { gql } = require("apollo-server-express");

module.exports = gql`
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
    getCollectionsByTitle(title: String): Collection
  }
`;
