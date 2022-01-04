import React from "react";
import MenuItem from "../menu-item/menu-item.component";
import './directory.styles.scss';
import { useSelector } from "react-redux";
import { selectDirectorySections } from '../../redux/directory/directory.selectors';

const Directory = () => {

    const directoryItems = useSelector(selectDirectorySections );

    return (
            <div className='directory-menu'>
                {directoryItems.map(({id, ...otherProps}) => (
                    <MenuItem key={id} {...otherProps}/>
                ))}
            </div>
        )
    }


export default Directory;


