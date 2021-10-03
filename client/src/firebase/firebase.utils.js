import { initializeApp } from 'firebase/app'
import { 
  GoogleAuthProvider, 
  getAuth, 
  signInWithPopup,
  onAuthStateChanged
} from 'firebase/auth'
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  writeBatch 
} from 'firebase/firestore'

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCv94I-9TMv39JjHu7Ndfx5j1BDNhaV3gw",
  authDomain: "crwn-clothing-994f7.firebaseapp.com",
  projectId: "crwn-clothing-994f7",
  storageBucket: "crwn-clothing-994f7.appspot.com",
  messagingSenderId: "1079611510053",
  appId: "1:1079611510053:web:88954bb097bc2a06fe9ecc",
  measurementId: "G-N27JWQEPKD"
};

// Initialize Firebase app
initializeApp(firebaseConfig)

// Initialize Auth provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' })

// Firestore
export const firestore = getFirestore()

// Auth
export const auth = getAuth()

// Sign in with Google
export const signInWithGoogle = () => {
  signInWithPopup(auth, googleProvider)
  .catch((error) => {
    // Handle errors here
    const errorCode = error.code
    const errorMessage = error.message
    // The email of the user's account used
    const email = error.email
    // The AuthCredential type that was used
    const credential = GoogleAuthProvider.credentialFromError(error)
    // Do whatever to handle error
    console.log({
      errorCode,
      errorMessage,
      email,
      credential
    })
  })
}

// Creates a Firestore user document for the logged-in user if one does not already exist
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(firestore, `users/${userAuth.uid}`)
  const userSnapshot = await getDoc(userRef)

  // Only create document if it does not already exist in Firestore
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()
    
    try {
      // Set the new user document in the database
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  // Return the user DocumentReference. Used for setting state in application
  return userRef
}

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data()

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  })

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection
    return accumulator
  }, {})
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, userAuth => {
      unsubscribe()
      resolve(userAuth)
    }, reject)
  })
}

// PRIVATE
// Utility function to add a new collection with its documents to Firestore
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