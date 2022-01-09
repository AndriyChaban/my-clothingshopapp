import React from 'react';
import { useSelector } from "react-redux";
import { selectShopCollectionsForPreview } from '../../redux/shop/shop.selectors';
import CollectionPreview from '../collection-preview/collection-preview.component';


function CollectionsOverview() {

    const collections = useSelector(selectShopCollectionsForPreview)


    return (
        <div className='collections-overview'>
            {
                collections.map(({ id, ...otherCollectionProps }) => (
                    <CollectionPreview key={id} {...otherCollectionProps} />))
            }
        </div>
    )
}

export default CollectionsOverview
