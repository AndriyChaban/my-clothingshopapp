import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
// import SHOP_DATA from "../../redux/shop/shop.data";
import { fetchCollectionsStart } from "../../redux/shop/shop.reducer";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../collection/collectionpage.container";

const ShopPage = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCollectionsStart())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


return (<div className="shop-page">
    <Routes>
        <Route path="/" element={<CollectionsOverviewContainer />} />
        <Route path="/:collectionUrlParams" element={<CollectionPageContainer {...props} />} />
    </Routes>

</div>);
}

export default ShopPage;