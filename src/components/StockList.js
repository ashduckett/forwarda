import StockItem from './StockItem';
import './StockList.css';

const StockList = (props) => {
    

    return (
        <div className="scroll-box">
            <div className="stock-list">
                {props.stock.map((stockItem) => 
                    <StockItem 
                        id={stockItem.id} 
                        name={stockItem.name} 
                        price={stockItem.price} 
                        imageName={stockItem.imageName} 
                        addToCartPressed={props.handleItemPurchased}
                        key={stockItem.id} 
                        />
                )}
            </div>
        </div>
    );
};

export default StockList;