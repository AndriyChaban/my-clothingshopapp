import { takeLatest, call, put, all } from 'redux-saga/effects';
import { fetchCollectionsStart, fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.reducer';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { getDocs, query, collection, orderBy } from 'firebase/firestore';

export function* fetchCollectionAsync() {
    yield console.log('I am fired');

    try {
        const collectionRef = collection(firestore, 'collections');
        const q = query(collectionRef, orderBy("sortId", "asc"));
        const snapshot = yield getDocs(q);
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
        console.log("I am fired after saga")
    }
    catch(error) {
        yield put(fetchCollectionsFailure(error.message))
    }
    // getDocs(q).then(snapshot => {
    //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //     dispatch(fetchCollectionsSuccess(collectionsMap));
    // })
    //     .catch(error => dispatch(fetchCollectionsFailure(error.message)));
}

export function* fetchCollectionsStartSaga() {
    yield takeLatest(fetchCollectionsStart, fetchCollectionAsync)
}

export function* shopSagas() {
    yield all([
        call(fetchCollectionsStartSaga)
    ])
}