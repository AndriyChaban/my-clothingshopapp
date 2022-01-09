import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as Logo } from '../../assets/083 crown.svg';
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCartVisible } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { signOutStart } from "../../redux/user/user.reducer";
import { HeaderContainer, LogoContainer, OptionsContainer, OptionDiv, OptionLink } from "./header.styles";



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
    )
}

export default Header;