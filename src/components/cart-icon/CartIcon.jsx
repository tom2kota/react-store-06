import React from "react";
import {ReactComponent as ShoppingIcon} from "../../images/shopping-bag.svg";
import {connect} from "react-redux";
import {toggleCartHidden} from "../../redux/cart/cartActions";
import './CartIcon.scss';
import {selectCartItemsCount} from "../../redux/cart/cartSelectors";
import {createStructuredSelector} from "reselect";

const CartIcon = ({toggleCartHidden, itemCount}) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>
            {itemCount}
        </span>
    </div>
)

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

const mapStateToProps = createStructuredSelector({
    itemCount:  selectCartItemsCount
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon)