import { useState } from "react";
import StockList from './components/StockList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import './App.css';

const stock = [
  {
    id: 1,
    price: 200.00,
    name: 'Charvel Pro-Mod Dimas',
    imageName: 'guitar1.jpg'
  },
  {
    id: 2,
    price: 200.00,
    name: 'Charvel Pro-Mod Dimas 2',
    imageName: 'guitar2.jpg'
  },
  {
    id: 3,
    price: 200.00,
    name: 'Charvel Pro-Mod Dimas 3',
    imageName: 'guitar3.jpg'
  },
  {
    id: 4,
    price: 200.00,
    name: 'Charvel Pro-Mod Dimas 3',
    imageName: 'guitar4.jpg'
  },
  {
    id: 5,
    price: 200.00,
    name: 'Charvel Pro-Mod Dimas 3',
    imageName: 'guitar5.jpg'
  },

];

function App() {

    // State for Cart
    const [itemsPurchased, setItemsPurchased] = useState([]);
    const [totalDue, setTotalDue] = useState(0);

    const handleRemoveAllFromCart = (id) => {
        // Deduct the necessary amounts from the total due
        setTotalDue(prevTotal => {
            const relevantItems = itemsPurchased.filter(item => item.id === id);
            
            let total = 0;
            for (let i = 0; i < relevantItems.length; i++) {
                total += relevantItems[i].count * relevantItems[i].item.price;
            }

            return prevTotal - total;
        });
        
        // Remove all items of the type signified by the id from state.
        setItemsPurchased(prevItems => {
            const itemsPurchased = [...prevItems];
            return itemsPurchased.filter(item => item.id !== id);
        });

        



    };

    const handleItemRemovedFromCart = (id) => {

        
        const purchase = stock.find(item => item.id === id);
        setTotalDue(prevTotal => {
            return prevTotal - purchase.price;
        });




        setItemsPurchased(prevItems => {
            let itemsPurchased = [...prevItems];
            
            itemsPurchased = itemsPurchased.map(item => {
                if (item.id === id && item.count > 0) {
                    return {
                        ...item,
                        count: item.count--
                    }
                } else {
                    return {
                        ...item
                    }
                }
            });
            return itemsPurchased.filter(item => item.count > 0);
        });

    }
  
    const handleItemPurchased = (id) => {
        // New thinking. I want the data I store about what's been purchased to be in the form of an array.
        // I don't need the indexing, just the object representing the item and the count of how many have been purchased.
        // This could be represented as [{item: {...}, count: 0}] and this is what I want to work with.

        // 1. Set the initial value of itemsPurchased to be an empty array.
        // 2. Iterate over the array. If the current item id exists inside it we want to increment the count by 1.

        const purchase = stock.find(item => item.id === id);
        
        setTotalDue(prevTotal => {
            return prevTotal + purchase.price;
        });


        setItemsPurchased(prevItems => {

            // This will get a copy of the array as it is before modification.
            let currentItemsPurchased = [...prevItems];
            let exists = false;
            

            for (let i = 0; i < currentItemsPurchased.length; i++) {
                if (currentItemsPurchased[i].id === id) {
                    exists = true;
                }
            }

            if (exists) {
                currentItemsPurchased = currentItemsPurchased.map(itemPurchased => {
                    if (itemPurchased.id !== id) {
                        return itemPurchased;
                    } else {
                        return {
                            ...itemPurchased,
                            count: itemPurchased.count + 1
                        }
                    }
                });
            } else {
                currentItemsPurchased.push({
                    id: purchase.id,
                    count: 1,
                    item: purchase
                });
            }

            console.log(currentItemsPurchased)
            return currentItemsPurchased;
        });

    
    
  };

    // // Calculate the total due
    // console.log(itemsPurchased)
    // let total = 0;
    // for (let itemType of itemsPurchased) {
    //     total += itemType.count * itemType.item.price;
    // }
    // console.log(total);
  return (
    <div className="App">
        <div>{totalDue}</div>
      <StockList stock={stock} handleItemPurchased={handleItemPurchased} />
      <div className="cart-and-checkout">
        <Cart cartItems={itemsPurchased} handleItemRemoved={handleItemRemovedFromCart} handleItemAdded={handleItemPurchased} handleAllItemsRemovedFromCart={handleRemoveAllFromCart} />
        <Checkout totalDue={totalDue}/>
      </div>
    </div>
  );
}

export default App;
