import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import { Route, Routes } from "react-router-dom";
import CollectionPage from "../collection/collectionpage.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
// import SHOP_DATA from "../../redux/shop/shop.data";
import { fetchCollectionsStartAsync } from "../../redux/shop/shop.reducer";
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from "../../redux/shop/shop.selectors";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);

const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = (props) => {

    const dispatch = useDispatch();

    const isCollectionFetching = useSelector(selectIsCollectionFetching);
    const isCollectionsLoaded = useSelector(selectIsCollectionsLoaded); 

    useEffect(() => {
        dispatch(fetchCollectionsStartAsync())
    },[])


return (<div className="shop-page">
    <Routes>
        <Route path="/" element={<CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />} />
        <Route path="/:collectionUrlParams" element={<CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />} />
    </Routes>

</div>);
}

export default ShopPage;