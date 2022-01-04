import { createSelector } from "@reduxjs/toolkit";

export const selectShopCollections = createSelector(
    [(state) => state.shop],
    (shop) => shop.collections
);

export const selectShopCollectionsForPreview = createSelector(
    [selectShopCollections],
    (collections) => {
        const array = Object.keys(collections).map(key => collections[key])
        // console.log(array);
        return array
    }
    
)

export const selectCollection = collectionUrlParam =>
    createSelector(
        [selectShopCollections],
        collections => collections[collectionUrlParam]
    )


export default selectShopCollections;