import React from "react";
import { useDispatch} from "react-redux";

import { ReactComponent as ShoppingIcon } from '../../assets/120 shopping-bag.svg'
import './cart-icon.styles.scss';
import { triggerVisibility } from "../../redux/cart/cart.reducer";
import { SelectCartItemsCount } from "../../redux/cart/cart.selectors";


const CartIcon = () => {
    const dispatch = useDispatch();
    
    return (
        <div className="cart-icon" onClick={() => dispatch(triggerVisibility())} >
            <ShoppingIcon className="shopping-icon" />
            <span className="item-count"><SelectCartItemsCount/></span>
        </div>
    )
}

export default CartIcon;