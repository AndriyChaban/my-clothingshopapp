import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import './header.styles.scss';
// import { Link } from "react-router-dom";
import {ReactComponent as Logo} from '../../assets/083 crown.svg';
import CartIcon from "../cart-icon/cart-icon.component";
import { auth } from "../../firebase/firebase.utils";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCartVisible} from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { HeaderContainer, LogoContainer, OptionsContainer, OptionDiv, OptionLink } from "./header.styles";
import { signOut } from "firebase/auth";
import { signOutStart } from "../../redux/user/user.reducer";
// import { setCurrentUser } from "../../redux/user/user.reducer";


const Header = () => {    
   
    const visibleDropdown = useSelector(selectCartVisible);
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    

    return (
        <HeaderContainer>
            <LogoContainer to='/'>
                <Logo className="logo" />
            </LogoContainer>
            <OptionsContainer>
                <OptionLink to='/shop'>
                    SHOP
                </OptionLink>
                <OptionLink to='/contact'>
                    CONTACT
                </OptionLink>
                {
                    currentUser ?
                        <OptionDiv onClick={() => { dispatch(signOutStart()) }}>
                            SIGN OUT
                        </OptionDiv> :
                        <OptionLink to="/signin">
                            SIGN IN
                        </OptionLink>
                }
                <CartIcon />
            </OptionsContainer>
            {visibleDropdown ? <CartDropdown /> : null}


        </HeaderContainer>
)}

// const mapStateToProps = (state) => ({
//     currentUser: state.user.currentUser
// })

export default Header;