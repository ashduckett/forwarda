import './Cart.css';
import CartItem from './CartItem';

const Cart = (props) => {
    let total = 0;

    for (let cartItem of props.cartItems) {
        total += cartItem.item.price * cartItem.count
    }

    return(
        <div className="cart">
            <div className="cartContainer">
                {
                    props.cartItems.map(cartItem => <CartItem 
                        id={cartItem.item.id} 
                        count={cartItem.count} 
                        name={cartItem.item.name}
                        price={cartItem.item.price}
                        imageName={cartItem.item.imageName}
                        handlePlusPressed={props.handleItemAdded} 
                        handleMinusPressed={props.handleItemRemoved} 
                        handleRemoveButtonPressed={props.handleAllItemsRemovedFromCart}
                        key={cartItem.item.id}
                        />)
                }
                </div>
            <div className="total">
                {'Total £' + total.toFixed(2)}
            </div>
        </div>
    );
};

export default Cart;