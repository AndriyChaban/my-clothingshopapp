import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import { Route, Routes } from "react-router-dom";
import CollectionPage from "../collection/collectionpage.component";
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import { collection, onSnapshot, orderBy, query, getDocs } from "firebase/firestore";
import { updateCollections } from '../../redux/shop/shop.reducer';
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import SHOP_DATA from "../../redux/shop/shop.data";
// import { getDatabase, ref, child, get } from "firebase/database";


const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);

const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = (props) => {

    ////////////////////////////////

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true)

    let unsubscribeFromSnapshot = null;


    // let unSubscribeRef = useRef();
    let connection = false;

    if (navigator.onLine) {
        fetch('https://www.google.com/', { mode: 'no-cors' }).then(() => { connection = true; console.log(connection) }).catch((error) => { connection = false; console.log(connection, error) })
    }

    useEffect(() => {
        // if (connection) {
        //     console.log(connection);

        const collectionRef = collection(firestore, 'collections');

        ////////////////////////////REST API//////////////////////////////////

        // fetch('https://firestore.googleapis.com/v1/projects/my-shop-project-1ca82/databases/(default)/documents/collections')
        //     .then(response => response.json())
        //     .then(collections => console.log(collections));

        //////////////////////////////////////////////////////////////////////

        // eslint-disable-next-line react-hooks/exhaustive-deps
        // unsubscribeFromSnapshot = onSnapshot(collectionRef, async (snapShot) => {
        //     const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
        //     dispatch(updateCollections(collectionsMap));
        //     setLoading(false);
        // },
        // const dbRef = ref(getDatabase());

        getDocs(collectionRef).then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            dispatch(updateCollections(collectionsMap));
            setLoading(false);
        })
    }
            // (error) => { dispatch(updateCollections(SHOP_DATA)) }//);
    // }

        /////////////////////////////////////////////
        // }
        //         // else {
        //         //     console.log("UPDATED FROM LOCAL STORAGE");
        //         //     dispatch(updateCollections(SHOP_DATA));
        //         //     setLoading(false)}
        // }

        , [])

// const { match } = useParams();

//////////////////////////////


return (<div className="shop-page">
    <Routes>
        {/* <Route path={`${params}`} element={<CollectionsOverview />} /> */}
        <Route path="/" element={<CollectionsOverviewWithSpinner isLoading={loading} {...props} />} />
        <Route path="/:collectionUrlParams" element={<CollectionPageWithSpinner isLoading={loading} {...props} />} />


    </Routes>

</div>);
}

export default ShopPage;