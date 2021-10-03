# Lesson 188: Promise Pattern

## Migration from Firestore v8 (lesson instructions) to v9 (current version)

In Firestore 9, the API has been updated from namespaced to modular functionality. You'll likely encounter errors when trying to follow along exactly with the Firestore lessons because of this update. 

I spent extra time during each lesson researching how to implement what was taught in each lesson using Firestore 9. Below you'll find documentation on errors you might receive during each lesson, a link to Yihua's repository for the corresponding lesson so you can consult v8 code implementation, and annotated code I wrote showing how to implement Yihua's instruction in v9.

## Firestore v9 equivalent

### \_\_\_[1]\_\_\_ - Promise-based retrieval
```javascript
// src/pages/shop/shop.component.jsx
import { collection, getDocs } from 'firebase/firestore'

class ShopPage extends React.Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    const { updateCollections } = this.props
    const collectionRef = collection(firestore, 'collections')

    // Use `getDocs` to retrieve collection; returns a Promise
    getDocs(collectionRef)
    .then((snapshot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
        updateCollections(collectionsMap)
        this.setState({ loading: false })
      }
    )
  }

  // ... other stuff in ShopPage component ... //
}

```

**Note:** As Yihua noted in this lesson, using this Promise-based method for getting the `collections` collection from Firebase means we aren't automatically subscribing to changes on the shop data; `collections` will only be retrieved from Firebase when the Shop Page component (re)mounts, so if the Firebase data changes after mounting, our application will not automatically receive the new data.

### \_\_\_[2]\_\_\_ - Fetching Firestore data using REST API

This method works exactly the same way as Yihua explained in the video, since the REST API is not version-dependent. However, for fetching Firestore data, it is not recommended, since the data we need is so deeply nested in the resultant object. 

## Read More
[Get all documents in a collection](https://firebase.google.com/docs/firestore/query-data/get-data#get_all_documents_in_a_collection)
