import { takeLatest, call, put, all } from 'redux-saga/effects'
import { ShopActionTypes } from './shop.types'
import { collection, getDocs } from 'firebase/firestore'
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'
import { 
  fetchCollectionsSuccess, fetchCollectionsFailure
} from './shop.actions'

export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START, 
    fetchCollectionsAsync
  )
}

export function* fetchCollectionsAsync() {
  try {
    const collectionRef = collection(firestore, 'collections')
    const snapshot = yield getDocs(collectionRef)
    
    // Saga effect `call` calls a function but allows us to yield control
    // back to the saga middleware in case this function call needs to be 
    // cancelled
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot)

    // `put` effect is saga version of `dispatch`, but requires to be
    // yielded whenever it is called
    yield put(fetchCollectionsSuccess(collectionsMap))
  } catch (error) {
    put(fetchCollectionsFailure(error.message))
  }
}

export function* shopSagas() {
  yield all([
    call(fetchCollectionsStart)
  ])
}