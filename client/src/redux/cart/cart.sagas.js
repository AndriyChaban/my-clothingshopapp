import { all, call, takeLatest, put } from 'redux-saga/effects';
import { signOutSuccess } from '../user/user.reducer';
import { clearCart } from './cart.reducer';

export function* clearCartOnSignOut() {
    yield put(clearCart())
}


export function* onSignOutSuccess() {
    yield takeLatest(signOutSuccess, clearCartOnSignOut)
}


export function* cartSagas() {
    yield (all([
        call(onSignOutSuccess)
    ]))
}