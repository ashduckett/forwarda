import './CartItem.css';

const CartItem = (props) => {
    return(
        <div className="cart-item">
            <div className="cart-item-image-container">
                <img className="cart-item-image" src={process.env.PUBLIC_URL + '/img/' + props.imageName} alt="Stock item" />
            </div>
            <div className="item-status">
                <p>{props.name} - {props.price}</p>
                <div className="add-remove">
                    <div className="remove">
                        <a href="#" onClick={() => props.handleRemoveButtonPressed(props.id)}>Remove</a>
                    </div>
                    <div className="plus-minus">
                        <button onClick={() => props.handleMinusPressed(props.id)}>-</button>
                        <div>{props.count}</div>
                        <button onClick={() => props.handlePlusPressed(props.id)}>+</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CartItem;