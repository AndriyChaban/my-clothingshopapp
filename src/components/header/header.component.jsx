import React from "react";
import { useSelector } from "react-redux";
import './header.styles.scss';
import { Link } from "react-router-dom";
import {ReactComponent as Logo} from '../../assets/083 crown.svg';
import CartIcon from "../cart-icon/cart-icon.component";
import { auth } from "../../firebase/firebase.utils";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCartVisible} from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";


const Header = () => {    
   
    const visibleDropdown = useSelector(selectCartVisible);
    const currentUser = useSelector(selectCurrentUser);
    

    return (
        <div className='header'>
            <Link className='logo-container' to='/'>
                <Logo className="logo" />
            </Link>
            <div className="options">
                <Link className='option' to='/shop'>
                    SHOP
                </Link>
                <Link className='option' to='/contact'>
                    CONTACT
                </Link>
                {
                    currentUser ?
                        <div className='option' onClick={() => auth.signOut()}>
                            SIGN OUT
                        </div> :
                        <Link className='option' to="/signin">SIGN IN</Link>
                }
                <CartIcon />
            </div>
            {visibleDropdown ? <CartDropdown /> : null}


        </div>
)}

// const mapStateToProps = (state) => ({
//     currentUser: state.user.currentUser
// })

export default Header;