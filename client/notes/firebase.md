# Firebase v8 => v9 

```javascript
import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// Below imports not necessary unless exporting entire firebase object
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

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

// Auth
export const auth = getAuth()
// Firestore
export const firestore = getFirestore()

// Auth provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })

/**
 * Promise then/catch code below taken from 
 * https://github.com/firebase/snippets-web/blob/2b9c3212d3844d394f8d98f30cadc03fdef8c2f5/snippets/auth-next/google-signin/auth_google_signin_popup.js
 * to catch/prevent error if Google Sign In popup is closed without authenticating
 */
// Sign in with Google
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result)
      // const token = credential.accessToken;
      // The signed-in user info
      // const user = result.user;
      // Do something with the result
      // return user
      
    }).catch((error) => {
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

export default firebase
```

# Firestore v9 Getting Data

## Document Reference 

Reference to a document in the Firestore. Pointer object referencing a specific document, not the data from the object

```javascript
doc(firestore, 'users/adf234s')
// or 
doc(firestore, 'users', 'adf234s')
```

## Document Snapshot
Snapshot of a document object in Firestore. Takes a <DocumentReference> object as a parameter

```javascript
getDoc(
  doc(firestore, 'users/adf234s') // <DocumentReference> object
  )
```

auth.createUserWithEmailAndPassword is not a function