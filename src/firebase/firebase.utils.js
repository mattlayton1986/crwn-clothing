import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

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
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })

// Firestore
export const firestore = getFirestore()

// Auth
export const auth = getAuth()

// Sign in with Google
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
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
  if (!userSnapshot.exists) {
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