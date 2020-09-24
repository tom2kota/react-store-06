import React from "react";
import {HeaderContainer, LogoContainer, OptionsContainer, OptionsLink} from './headerStyles';
import {auth} from '../../firebase/firebase.utils';
import {createStructuredSelector} from "reselect";
import {connect} from 'react-redux';
import CartIcon from "../cart-icon/CartIcon";
import CartDropdown from "../cart-dropdown/CartDropdown";
import imgLogo from '../../images/logo192.png'
import {selectCartHidden} from "../../redux/cart/cartSelectors";
import {selectCurrentUser} from "../../redux/user/userSelectors";

const Header = ({currentUser, hidden}) => (
    <HeaderContainer>

        <LogoContainer to='/'>
            <img src={imgLogo} alt='Logo'/>
        </LogoContainer>

        <OptionsContainer>
            <OptionsLink to='/'>
                Home
            </OptionsLink>

            <OptionsLink to='/shop'>
                Shop
            </OptionsLink>

            <OptionsLink to='/contact'>
                Contact
            </OptionsLink>
            {!currentUser ?
                <OptionsLink to='/signin'>
                    Sign In
                </OptionsLink>
                :
                <OptionsLink as='div' onClick={() => auth.signOut()}>
                    Sign Out
                </OptionsLink>
            }
            <CartIcon/>
        </OptionsContainer>
        {hidden ? null : <CartDropdown/>}
    </HeaderContainer>
)

const mapStateToProps = createStructuredSelector ({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header)