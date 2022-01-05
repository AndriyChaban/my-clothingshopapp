import React, { useEffect, useState }  from "react";
import { useDispatch } from "react-redux";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import { Route, Routes } from "react-router-dom";
import CollectionPage from "../collection/collectionpage.component";
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import { collection, onSnapshot } from "firebase/firestore";
import { updateCollections } from '../../redux/shop/shop.reducer';
import WithSpinner from "../../components/with-spinner/with-spinner.component";


const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);

const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = (props) => { 

    ////////////////////////////////

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true)

    let unsubscribeFromSnapshot = [];
    unsubscribeFromSnapshot = null;

    // let unSubscribeRef = useRef();

    useEffect(() => {
        const collectionRef = collection(firestore, 'collections');
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
        unsubscribeFromSnapshot = onSnapshot(collectionRef, async (snapShot) => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
            console.log(collectionsMap);
            // collectionsMap ? dispatch(updateCollections(collectionsMap)) : null;
            dispatch(updateCollections(collectionsMap));
            setLoading(false);
        });        
        }
    , [])
    
    // const { match } = useParams();
    
    //////////////////////////////
    

    return (<div className="shop-page">
        <Routes>
            {/* <Route path={`${params}`} element={<CollectionsOverview />} /> */}
            <Route path="/" element={<CollectionsOverviewWithSpinner isLoading={loading} {...props} />}/>
            <Route path="/:collectionUrlParams" element={<CollectionPageWithSpinner isLoading={loading} {...props}/> }/>
             
            
        </Routes>
        
            </div>);
    }

export default ShopPage;