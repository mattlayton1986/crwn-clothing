import { takeLatest, put, all, call } from 'redux-saga/effects'
import UserActionTypes from './user.types'
import { 
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from '@firebase/auth'
import { getDoc } from '@firebase/firestore'
import { 
  auth, 
  googleProvider, 
  createUserProfileDocument, 
  getCurrentUser,
} from '../../firebase/firebase.utils'
import { 
  signInSuccess, 
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure
} from './user.actions'

// Reusable generator function for both google and email/pw sign ins below
export function* getSnapshotFromUserAuth(userAuth) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth)
    const userSnapshot = yield getDoc(userRef)
    yield put(signInSuccess({ 
      id: userSnapshot.id, 
      ...userSnapshot.data()
    }))
  } catch(error) {
    yield put(signInFailure(error))
  }
}

/// User listener sagas
export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}


// User handler sagas
export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser()
    if (!userAuth) return
    yield getSnapshotFromUserAuth(userAuth)
  } catch (error) {
    yield put(signInFailure(error))
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield signInWithPopup(auth, googleProvider)
    yield getSnapshotFromUserAuth(user)
  } catch (error) {
    yield put(signInFailure(error))
  }
}

export function* signInWithEmail({payload: { email, password }}) {
  try {
    const { user } = yield signInWithEmailAndPassword(auth, email, password)
    yield getSnapshotFromUserAuth(user)
  } catch (error) {
    yield put(signInFailure(error))
  }
}

export function* signOut() {
  try {
    yield auth.signOut()
    yield put(signOutSuccess())
  } catch (error) {
    put(signOutFailure(error))
  }
}

export function* signUp({ 
  payload : { displayName, email, password, confirmPassword }
}) {
  try {
    if (password !== confirmPassword) {
      yield put(signUpFailure('Passwords do not match'))
      return
    }

    const { user } = yield createUserWithEmailAndPassword(auth, email, password)
    yield put(signUpSuccess())
    yield getSnapshotFromUserAuth({...user, displayName})
  } catch (error) {
    put(signUpFailure(error))
  }
}

// Combine all sagas into one for export to root saga
export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignOutStart),
    call(onSignUpStart)
  ])
}