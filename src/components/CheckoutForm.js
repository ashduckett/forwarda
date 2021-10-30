import './CheckoutForm.css';
import TextField from './TextField';
import { useState } from 'react';

const CheckoutForm = (props) => {
    // Using state for form data makes sense in order to use controlled inputs
    const [formInput, setFormInput] = useState({
        cardOrPayPal: 'card',
        firstName: '',
        firstNameError: '',
        lastName: '',
        lastNameError: '',
        email: '',
        emailError: '',
        cardNumber: '',
        cardNumberError: '',
        expiryDate: '',
        expiryDateError: '',
        cvv: '',
        cvvError: ''
    });
    
    const handleToggleCardOrPaypal = (evt) => {
        setFormInput((prevFormInput) => {
            return {
                ...prevFormInput,
                cardOrPayPal: evt.target.value
            }
        });
    };

    const handlePayButtonPressed = (evt) => {
        evt.preventDefault();
        console.log('button pressed')
        console.log(formInput)


        setFormInput(prevFormInput => {
            let firstNameError = formInput.firstName.trim() === '' ? 'Please enter your first name' : '';
            let lastNameError = formInput.lastName.trim() === '' ? 'Please enter your last name' : '';
            let cardNumberError = formInput.cardNumber.trim() === '' && formInput.cardOrPayPal === 'card' ? 'Please enter your card number' : '';
            let expiryDateError = formInput.expiryDate.trim() === '' && formInput.cardOrPayPal === 'card'? 'Please enter your card expiry date' : '';
            let cvvError = formInput.cvv.trim() === '' && formInput.cardOrPayPal === 'card' ? 'Please enter your CVV code' : '';

            return {
                ...prevFormInput,
                firstNameError,
                lastNameError,
                cardNumberError,
                expiryDateError,
                cvvError
            }
        });
        

        // Happy with the first few fields only if using paypal
        if (formInput.firstName && formInput.lastName && formInput.email && formInput.cardOrPayPal === 'paypal' ||
            formInput.firstName && formInput.lastName && formInput.email && formInput.cardNumber && formInput.cardOrPayPal === 'card' && formInput.expiryDate && formInput.cvv) { 
            console.log('we got here!')
            props.handlePayButtonPressed(props.totalDue);
        }
    };

    const handleFirstNameFieldChanged = (evt) => {
        setFormInput(prevFormInput => {
            return {
                ...prevFormInput,
                firstName: evt.target.value
            }
        });
    };

    const handleEmailFieldChanged = (evt) => {
        setFormInput(prevFormInput => {
            return {
                ...prevFormInput,
                email: evt.target.value
            }
        });
    };

    const handleLastNameFieldChanged = (evt) => {
        setFormInput(prevFormInput => {
            return {
                ...prevFormInput,
                lastName: evt.target.value
            }
        });
    };

    const handleCardNumberFieldChanged = (evt) => {
        setFormInput(prevFormInput => {
            return {
                ...prevFormInput,
                cardNumber: evt.target.value
            }
        });
    };

    const handleExpiryDateFieldChanged = (evt) => {
        setFormInput(prevFormInput => {
            return {
                ...prevFormInput,
                expiryDate: evt.target.value
            }
        });
    };

    const handleCVVFieldChanged = (evt) => {
        setFormInput(prevFormInput => {
            return {
                ...prevFormInput,
                cvv: evt.target.value
            }
        });
    };

    

    return(
        <div className="checkout">
            <h3>Checkout</h3>
            <form className="checkout-form">
                <TextField 
                    id="lastNameField"
                    onChange={handleFirstNameFieldChanged} 
                    value={formInput.firstName} 
                    placeholder="First Name..." 
                    errorMessage={formInput.firstNameError} 
                    type="text"
                />
                <TextField 
                    id="firstNameField"
                    onChange={handleLastNameFieldChanged} 
                    value={formInput.lastName} 
                    placeholder="Last Name..." 
                    errorMessage={formInput.lastNameError} 
                    type="text"
                />
                <TextField
                    id="emailField"
                    onChange={handleEmailFieldChanged} 
                    value={formInput.email} 
                    placeholder="Email..." 
                    errorMessage={formInput.emailError} 
                    type="email"
                />
                <div className="card-or-paypal">
                    <div className="radio-and-label">
                        <TextField
                            id="cardRadio" 
                            checked={formInput.cardOrPayPal === 'card'} 
                            onChange={handleToggleCardOrPaypal} 
                            value="card" 
                            type="radio"
                            className="radio-button"
                        />
                        <label htmlFor="cardRadio">Card</label>
                    </div>
                    <div className="radio-and-label">
                        <TextField
                            id="paypalRadio" 
                            checked={formInput.cardOrPayPal === 'paypal'} 
                            onChange={handleToggleCardOrPaypal} 
                            value="paypal" 
                            type="radio"
                            className="radio-button"
                        />
                        <label htmlFor="paypalRadio">Paypal</label>
                    </div>
                </div>

                <TextField
                    id="cardNumberField"
                    onChange={handleCardNumberFieldChanged} 
                    value={formInput.cardNumber} 
                    placeholder="Card Number..." 
                    errorMessage={formInput.cardNumberError} 
                    type="text"
                    style={{"display": (formInput.cardOrPayPal === 'card' ? 'block' : 'none')}}
                />
                <div className="expiry-and-cvv">
                <TextField
                    id="expiryDateField"
                    onChange={handleExpiryDateFieldChanged} 
                    value={formInput.expiryDate} 
                    placeholder="Expiry Date..." 
                    errorMessage={formInput.expiryDateError} 
                    type="date"
                    style={{"display": (formInput.cardOrPayPal === 'card' ? 'block' : 'none')}}
                />
                <TextField
                    id="cvvField"
                    onChange={handleCVVFieldChanged} 
                    value={formInput.cvv} 
                    placeholder="CVV" 
                    errorMessage={formInput.cvvError} 
                    type="text"
                    style={{"display": (formInput.cardOrPayPal === 'card' ? 'block' : 'none')}}
                />
                </div>
                <button onClick={handlePayButtonPressed} type="submit">Pay {props.totalDue !== 0 ? '£' + props.totalDue : ''}</button>
            </form>
        </div>
    );
}
export default CheckoutForm;