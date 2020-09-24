import React from "react";
import CollectionItem from "../collection-item/CollectionItem";
import './CollectionPreview.scss';

export const CollectionPreview = ({title, items}) => (
    <div className='collection-preview'>
        <h1 className='title'>{title.toUpperCase()}</h1>
        <div className='preview'>
            {items
                .filter((item, idx) => idx < 3)
                .map((item) =>
                    <CollectionItem key={item.id} item={item}/>
                )}
        </div>
    </div>
)