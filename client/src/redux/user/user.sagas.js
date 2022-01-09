import { takeLatest, put, all, call } from 'redux-saga/effects';
import { googleProvider, auth, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { signUpStart, signUpSuccess, signUpFailure, googleSignInStart, emailSignInStart, signInSuccess, signInFailure, checkUserSession, signOutStart, signOutFailure, signOutSuccess } from './user.reducer'


export function* getSnapshotFromUserAuth(userAuth) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth);
        yield put(signInSuccess({ id: userRef.id, ...userRef.data() }))
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield signInWithPopup(auth, googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* signInWithEmail(action) {
    try {
        const { email, password } = action.payload;
        const { user } = yield signInWithEmailAndPassword(auth, email, password);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    } catch (error) {
        yield put(signInFailure(error))
    }
}

export function* signOutSaga() {
    try {
        yield signOut(auth);
        yield put(signOutSuccess())
    }
    catch (error) { yield put(signOutFailure(error)) }
}

export function* signUpSaga(action) {
    try {
        const { email, password, displayName } = action.payload;
        const userCredentials = yield createUserWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;
        const userRef = yield call(createUserProfileDocument, user, {displayName});
        yield put(signUpSuccess({ id: userRef.id, ...userRef.data() }))

    } catch (error) {
        yield put(signUpFailure(error));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(googleSignInStart, signInWithGoogle)
}

export function* onEmailSignInStart() {
    yield takeLatest(emailSignInStart, signInWithEmail)
}

export function* onCheckUserSession() {
    yield takeLatest(checkUserSession, isUserAuthenticated)
}

export function* onSignOutStart() {
    yield takeLatest(signOutStart, signOutSaga)
}

export function* onSignUpStart() {
    yield takeLatest(signUpStart, signUpSaga)
}

export function* userSagas() {
    yield all(
        [
            call(onGoogleSignInStart),
            call(onEmailSignInStart),
            call(onCheckUserSession),
            call(onSignOutStart),
            call(onSignUpStart)
        ])
}