import { ShopActionTypes } from './shop.types'
import { collection, getDocs } from 'firebase/firestore'
import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils'

const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
})

const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
})

const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
})

export const fetchCollectionsStartAsync = () => {
  return (dispatch) => {
    const collectionRef = collection(firestore, 'collections')
    
    dispatch(fetchCollectionsStart())

    getDocs(collectionRef)
    .then((snapshot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
        dispatch(fetchCollectionsSuccess(collectionsMap))
      }
    ).catch((error) => dispatch(fetchCollectionsFailure(error.message)))
  }
}

