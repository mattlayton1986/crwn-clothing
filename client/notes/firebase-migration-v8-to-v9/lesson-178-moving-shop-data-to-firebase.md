# Lesson 178: Moving Our Shop Data to Firebase

## Migration from Firestore v8 (lesson instructions) to v9 (current version)

In Firestore 9, the API has been updated from namespaced to modular functionality. You'll likely encounter errors when trying to follow along exactly with the Firestore lessons because of this update. 

I spent extra time during each lesson researching how to implement what was taught in each lesson using Firestore 9. Below you'll find documentation on errors you might receive during each lesson, a link to Yihua's repository for the corresponding lesson so you can consult v8 code implementation, and annotated code I wrote showing how to implement Yihua's instruction in v9.

## Firestore v9 equivalent

```javascript
// src/firestore.utils.js
import { collection, doc, writeBatch } from 'firebase/firestore'

// ... other code from previous lessons ... //

// Adds a new collection with its documents to Firestore
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  // Create a collection reference in database 
  const collectionRef = collection(firestore, collectionKey)
  // Create a new batch write
  const batch = writeBatch(firestore)
  
  // Loop over the objects to add as documents
  objectsToAdd.forEach(obj => {

    // Create new document reference from the collection reference above
    const newDocRef = doc(collectionRef)
    // Set this document with the object data as a batched item
    batch.set(newDocRef, obj)
  })

  // Commit the batch once all items are set in batch, and return the results of the batch write
  // (Returning here gives us feedback on whether the batch was successful or failed.)
  return await batch.commit()
}
```

**Note:** App.js is set up exactly as instructed in this lesson, since it does not use any Firebase-specific functions. 

## Read More
[Add a Document](https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document) - I found the third example in this section to be particularly useful.

[Firestore - Batched Writes](https://firebase.google.com/docs/firestore/manage-data/transactions#batched-writes)