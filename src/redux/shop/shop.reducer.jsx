import { createSlice } from "@reduxjs/toolkit";
import { firestore } from "../../firebase/firebase.utils";
import { convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import { collection, orderBy, query, getDocs } from "firebase/firestore";
// import { useDispatch } from "react-redux";
// import SHOP_DATA from "./shop.data";

// const INITIAL_STATE = { collections: SHOP_DATA };


// export const collectionSlice = createSlice({
//     name: 'shop',
//     initialState: INITIAL_STATE,
//     reducers: {}
// },
// )

// export default collectionSlice.reducer;

export const collectionSlice = createSlice({
    name: 'shop',
    // initialState: INITIAL_STATE,
    initialState: {
        collections: null,
        isFetching: false,
        errorMessage: undefined,
    },
    reducers: {
        fetchCollectionsStart: (state) => { state.isFetching = true },
        fetchCollectionsSuccess: (state, action) => { state.collections = action.payload; state.isFetching = false },
        fetchCollectionsFailure: (state, action) => { state.isFetching = false; state.errorMessage = action.payload },
        // updateCollections: (state, action) => { state.collections = action.payload }
    }

},
)
export const { fetchCollectionsStart, fetchCollectionsSuccess, fetchCollectionsFailure } = collectionSlice.actions;

export default collectionSlice.reducer;



export const fetchCollectionsStartAsync = () => (dispatch) => {

        const collectionRef = collection(firestore, 'collections');

        const q = query(collectionRef, orderBy("sortId", "asc"));
        console.log(q);
        dispatch(fetchCollectionsStart())
        
        getDocs(q).then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            dispatch(fetchCollectionsSuccess(collectionsMap));
        })
            .catch(error => dispatch(fetchCollectionsFailure(error.message)));
    }

////////////////////