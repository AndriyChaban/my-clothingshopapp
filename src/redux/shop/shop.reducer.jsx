import { createSlice } from "@reduxjs/toolkit";
import SHOP_DATA from "./shop.data";

const INITIAL_STATE = {collections: SHOP_DATA}


export const collectionSlice = createSlice({
    name: 'shop',
    initialState: INITIAL_STATE,
    reducers: {}
},
)

export default collectionSlice.reducer;