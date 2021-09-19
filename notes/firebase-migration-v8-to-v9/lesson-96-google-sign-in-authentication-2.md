# Lesson 96: Google Sign In Authentication 2

## Migration from Firestore v8 (lesson instructions) to v9 (current version)

In Firestore 9, the API has been updated from namespaced to modular functionality. You'll likely encounter errors when trying to follow along exactly with the Firestore lessons because of this update. 

I spent extra time during each lesson researching how to implement what was taught in each lesson using Firestore 9. Below you'll find documentation on errors you might receive during each lesson, a link to Yihua's repository for the corresponding lesson so you can consult v8 code implementation, and annotated code I wrote showing how to implement Yihua's instruction in v9.

## Related error messages

### \_\_\_[1]\_\_\_
**Error:**

`Unhandled Rejection (TypeError): firestore.doc is not a function`

`Unhandled Rejection (TypeError): userRef.get is not a function` 

`Unhandled Rejection (TypeError): userRef.onSnapshot is not a function`

`Unhandled Rejection (TypeError): userRef.set is not a function` 

**Solution:**
All these errors pertain to the way Firebase v9 is now organized - as modules instead of namespaced functions. You'll need to update your imports as follows: 

```javascript
// src/firebase.utils.js
import { doc, getDoc, setDoc } from 'firebase/firestore'

// src/App.js
import { onSnapshot } from 'firebase/firestore'
```
See below for full code.

## Yihua's repository for Lesson 96 (Firestore v8)

https://github.com/ZhangMYihua/lesson-10 

## Firestore v9 equivalent
**IMPORTANT NOTE:** Be careful directly copying my code below. I have changed some variable and component names to suit my preference. Err on the side of caution and type it out or cherry-pick the lines you need and verify the variable/component names are correct when doing so. 

```javascript
// src/firebase.utils.js

import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
// update these imports
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

// Firebase configuration
const firebaseConfig = {
  // ... your Firestore config data here
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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // Now calls the `doc` function; reference to Firestore database is 
  // passed as first argument
  const userRef = doc(firestore, `users/${userAuth.uid}`)
  // Now calls the `getDoc` function; DocumentReference is now passed as the argument
  const userSnapshot = await getDoc(userRef)

  if (!userSnapshot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()
    
    try {
      // Now calls `setDoc` function; DocumentReference passed as first argument
      // and data to set is second argument
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

  return userRef
}
```

```javascript
// App.js
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import LoginPage from './pages/login/login.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
// update your import statement here
import { onSnapshot } from 'firebase/firestore';

import './App.css';

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        // Now calls `onSnapshot` as a function; DocumentReference passed as first argument
        // and callback function is now the second argument
        onSnapshot(userRef, (snapshot) => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
      } else {
        // user is not signed in, so userAuth will be null
        this.setState({ currentUser: userAuth })
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    console.log(this.state.currentUser)
    return (
      <div>
        <Header 
          currentUser={this.state.currentUser}
        />
        <Switch>
          <Route path="/shop" component={ShopPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    );
  }
}

export default App;

```

## Read More
[Set a document](https://firebase.google.com/docs/firestore/manage-data/add-data#set_a_document) - doc, setDoc

[Get a document](https://firebase.google.com/docs/firestore/query-data/get-data#get_a_document) - doc, getDoc

[Get realtime updates with Cloud Firestore](https://firebase.google.com/docs/firestore/query-data/listen) - onSnapshot; also contains information about subscribing/unsubscribing to snapshot changes

[API - DocumentReference onSnapshot](https://firebase.google.com/docs/reference/js/v8/firebase.firestore.DocumentReference#onsnapshot)
