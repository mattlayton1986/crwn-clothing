import { ApolloError, ValidationError } from "apollo-server-errors";

export const resolvers = {
  Query: {
    // All collections
    collections: async (_, __, ctx) => {
      const collections = await ctx.collection('collections').get()
      return collections.docs.map(collection => collection.data()) || null
    },
    // One collection by ID
    collection: async (_, { id }, ctx) => {
      try {
        const collectionSnapshot = await ctx.collection('collections').where('id', '==', id).get()

        const collection = collectionSnapshot.docs.map(coll => coll.data())
        return collection[0] || null
      } catch (error) {
        throw new ApolloError(error)
      }
    },
    // One collection by title
    getCollectionsByTitle: async (_, { title }, ctx) => {
      try {
        // capitalize first letter of 'title'
        title = title.charAt(0).toUpperCase() + title.slice(1)
        
        const collectionSnapshot = await ctx.collection('collections').where('title', '==', title).get()

        const collection = collectionSnapshot.docs.map(coll => coll.data())
        return collection[0] || null
      } catch (error) {
        throw new ApolloError(error)
      }
    }
  },
};