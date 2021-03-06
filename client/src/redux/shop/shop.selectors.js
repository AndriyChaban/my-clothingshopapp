import { createSelector } from "@reduxjs/toolkit";

export const selectShopCollections = createSelector(
    [(state) => state.shop],
    (shop) => shop.collections
);

export const selectShopCollectionsForPreview = createSelector(
    [selectShopCollections],
    (collections) => {
        return collections ? Object.keys(collections).map(key => collections[key]) : []
    })

export const selectCollection = collectionUrlParam =>
    createSelector(
        [selectShopCollections],
        collections => collections ? collections[collectionUrlParam] : null
    )

export const selectIsCollectionFetching = createSelector(
    [(state) => state.shop],
    shop => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
    [(state) => state.shop],
    shop=>!!shop.collections
)

export default selectShopCollections;