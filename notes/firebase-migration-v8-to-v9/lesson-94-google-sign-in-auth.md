# Lesson 94: Google Sign In Authentication 

## Migration from Firestore v8 (lesson instructions) to v9 (current version)

In Firestore 9, the API has been updated from namespaced to modular functionality. You'll likely encounter errors when trying to follow along exactly with the Firestore lessons because of this update. 

I spent extra time during each lesson researching how to implement what was taught in each lesson using Firestore 9. Below you'll find documentation on errors you might receive during each lesson, a link to Yihua's repository for the corresponding lesson so you can consult v8 code implementation, and annotated code I wrote showing how to implement Yihua's instruction in v9.

## Related error messages

### \_\_\_[1]\_\_\_
**Error:**
`Attempted import error: 'firebase/app' does not contain a default export (imported as 'firebase').`

**Solution:**
Follow Firebase's instructions for proper v9 imports.
- [Initialize Cloud Firestore](https://firebase.google.com/docs/firestore/quickstart#initialize)
- [Handle the sign-in flow with the Firebase SDK](https://firebase.google.com/docs/auth/web/google-signin#handle_the_sign-in_flow_with_the_firebase_sdk) - see option #5 bullet point the first, Authenticate with Firebase using the Google provider object in popup window.

### \_\_\_[2]\_\_\_
**Error**:
`'firebase' is not defined`

**Solution:**
You updated your imports to work with v9 but the rest of your code is still trying to reference the v8 `firebase` import variable. 

### \_\_\_[3]\_\_\_
**Error:**
`Firebase: Error (auth/popup-closed-by-user).`

**Solution:**
This error occurs when closing the Google popup without authenticating. Error handling needs to be added to the `signInWithGoogle` handler function (see code below for example implementation).


## Yihua's repository for Lesson 94 (Firestore v8)

https://github.com/ZhangMYihua/lesson-9

## Firestore v9 equivalent

```javascript
// src/firestore.utils.js

import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const config = {
  // ... your Firestore config data here
};

// Initialise Firebase app
initializeApp(config)

// Create Google Auth Provider
const provider = new GoogleAuthProvider();
// Configure provider options
provider.setCustomParameters({ prompt: 'select_account' });

// Create Auth functionality
export const auth = getAuth();
// Get Firestore Database
// NOTE: in Firestore docs, you'll often see the variable 'db' used instead of 'firestore'. 
export const firestore = getFirestore();

// 
export const signInWithGoogle = () => {
  // In v8, 'auth.signInWithPopup(provider)' was called. In v9, 'signInWithPopup' is no longer namespaced, so 'auth' has to be passed as a parameter.
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
```

**Note:** the App, Header, and SignIn components are still implemented exactly as instructed in this lesson. `signInWithGoogle` and `auth` are the same in both versions; only the methods we use to obtain them vary between versions.

## Read More
[Firestore - Getting Started](https://firebase.google.com/docs/firestore/quickstart)

[Firebase Authentication - Google Sign-In](https://firebase.google.com/docs/auth/web/google-signin)

[Firebase Gist for how to use 'signInWithPopup' in v9](https://github.com/firebase/snippets-web/blob/2b9c3212d3844d394f8d98f30cadc03fdef8c2f5/snippets/auth-next/google-signin/auth_google_signin_popup.js)