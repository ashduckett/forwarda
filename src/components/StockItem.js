import './StockItem.css';

const StockItem = (props) => {
    // const handleAddToCartPressed = (id) => {
        
    // };


    return(
        <div className="stock-item">
            <div className="stock-image-container">
                <img className="stock-image" src={process.env.PUBLIC_URL + '/img/' + props.imageName} alt="Stock item" />
            </div>
            <div className="stock-item-info">
                <p>{props.name}</p>
                <p>&pound;{props.price}</p>
            </div>
            <div className="button-container">
                <button className="add-to-cart" onClick={() => props.addToCartPressed(props.id)}>Add to Cart</button>
            </div>
        </div>
    );
};

export default StockItem;