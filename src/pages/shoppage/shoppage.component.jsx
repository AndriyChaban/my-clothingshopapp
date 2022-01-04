import React from "react";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import { Route, Routes, useParams } from "react-router-dom";
import CollectionPage from "../collection/collectionpage.component";


const ShopPage = () => {    
    
    // const {collectionId} = useParams();
    

    return (<div className="shop-page">
        <Routes>
            {/* <Route path={`${params}`} element={<CollectionsOverview />} /> */}
            <Route path="/" element={<CollectionsOverview />}/>
            <Route path="/:collectionUrlParams" element={<CollectionPage/> }/>
             
            
        </Routes>
        
            </div>);
    }

export default ShopPage;