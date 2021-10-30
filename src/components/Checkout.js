import './Checkout.css';
import CheckoutForm from '../components/CheckoutForm';
import { useState } from 'react';



const Checkout = (props) => {
    const [isEnteringDetails, setIsEnteringDetails] = useState(true);
    const [isUsingCard, setIsUsingCard] = useState(true);

    const handlePayButtonPressed = (total) => {
        console.log('pay pressed');
        console.log(total)
    
        if (total !== 0) {
            setIsEnteringDetails(false);
        }
    };


    const array = isEnteringDetails ? [<CheckoutForm 
                                        totalDue={props.totalDue} 
                                        isUsingCard={isUsingCard} 
                                        handlePayButtonPressed={handlePayButtonPressed}
                                        />] : [<div className="thank-you">Thank you for your payment</div>];

    return array;
};

export default Checkout;