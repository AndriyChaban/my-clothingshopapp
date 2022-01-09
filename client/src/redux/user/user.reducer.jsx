import { createSlice } from "@reduxjs/toolkit"
// const INITIAL_STATE = {
//     currentUser: null,
//     error: null
// }

// const userReducer = (state = INITIAL_STATE, action) => {
//     switch (action.type) {
//         case 'GOOGLE_SIGN_IN_SUCCESS':
//         case 'EMAIL_SIGN_IN_SUCCESS':
//             return {
//                 ...state,
//                 currentUser: action.payload,
//                 error: null
//             }
//         case 'GOOGLE_SIGN_IN_FAILURE':
//         case 'EMAIL_SIGN_IN_FAILURE':
//             return {
//                 ...state,
//                 error: action.payload
//             }

//         default: return state

//     }
// }

// export default userReducer;

export const userSlice = createSlice({
    name: 'user',
    // initialState: INITIAL_STATE,
    initialState: {
        currentUser: null,
        error: null
    },
    reducers: {
        googleSignInStart: (state) => { },
        emailSignInStart: (state, action) => { },
        signInSuccess: (state, action) => { state.currentUser = action.payload },
        signInFailure: (state, action) => { state.error = action.payload },
        checkUserSession: () => { },
        signOutStart: () => { },
        signOutSuccess: (state) => { state.currentUser = null },
        signOutFailure: (state, action) => { state.error = action.payload },
        signUpStart: () => { },
        signUpSuccess: (state, action) => { state.currentUser = action.payload },
        signUpFailure: (state, action) => { state.error = action.payload }

    }

},
)

export const { signUpStart, signUpSuccess, signUpFailure, signInSuccess, signInFailure, googleSignInStart, emailSignInStart, checkUserSession, signOutFailure, signOutStart, signOutSuccess } = userSlice.actions;

export default userSlice.reducer;