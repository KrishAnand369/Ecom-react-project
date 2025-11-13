import axios from 'axios'
import CheckoutHeder from '../components/checkoutPage/CheckoutHeader';
import './CheckoutPage.css'
import './Checkout-header.css'
import { useState, useEffect } from 'react';
import OrderSummary from '../components/checkoutPage/OrderSummary';
import PaymentSummary from '../components/checkoutPage/PaymentSummary';


function CheckoutPage({ cartItems }) {
    let totalItems = 0;

    cartItems.forEach(cartItem => {
        totalItems += cartItem.quantity;
    });
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    useEffect(() => {

        const fetchCheckoutData = async () => {
            let response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
            setDeliveryOptions(response.data)
        
            response = await axios.get('/api/payment-summary')
            setPaymentSummary(response.data)
        }
        fetchCheckoutData();

    }, []);



    return (
        <>

            <title>Checkout</title>
            <CheckoutHeder totalItems={totalItems} />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary cartItems={cartItems} deliveryOptions={deliveryOptions} />
                    <PaymentSummary paymentSummary={paymentSummary} />
                </div>
            </div>
        </>
    )
}

export default CheckoutPage;