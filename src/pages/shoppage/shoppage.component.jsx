import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import { Route, Routes } from "react-router-dom";
// import CollectionPage from "../collection/collectionpage.component";
// import WithSpinner from "../../components/with-spinner/with-spinner.component";
// import SHOP_DATA from "../../redux/shop/shop.data";
import { fetchCollectionsStart } from "../../redux/shop/shop.reducer";
// import { selectIsCollectionFetching, selectIsCollectionsLoaded } from "../../redux/shop/shop.selectors";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../collection/collectionpage.container";

// const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);

// const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = (props) => {

    const dispatch = useDispatch();

    // const isCollectionFetching = useSelector(selectIsCollectionFetching);
    // const isCollectionsLoaded = useSelector(selectIsCollectionsLoaded); 

    useEffect(() => {
        dispatch(fetchCollectionsStart())
           // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


return (<div className="shop-page">
    <Routes>
        <Route path="/" element={<CollectionsOverviewContainer />} />
        <Route path="/:collectionUrlParams" element={<CollectionPageContainer {...props} />} />
    </Routes>

</div>);
}

export default ShopPage;