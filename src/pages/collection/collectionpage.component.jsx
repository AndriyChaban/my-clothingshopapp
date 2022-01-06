import React from 'react';
import { useParams } from 'react-router-dom';
import CollectionItem from '../../components/collection-item/collection-item.component';
import { selectCollection } from '../../redux/shop/shop.selectors';
import { useSelector } from 'react-redux';
import './collectionpage.styles.scss'


function CollectionPage() {

    const { collectionUrlParams } = useParams();

    const selectedCollection = selectCollection(collectionUrlParams);

    const { title, items } = useSelector(selectedCollection);

    return (
        <div className='collection-page'>
            <h2 className='title'>{title}</h2>
            <div className='items'>
                {items.map((item) => <CollectionItem className='collection-item' key={item.id} item={item} />)}
            </div>
        </div>
    )
}

export default CollectionPage
