import { formatDate } from '../../utils/date'
import CartItemDetailGrid from './CartItemDetailGrid';

const OrderSummary = ({ cartItems, deliveryOptions, fetchCartItems }) => {
    return (
        <div className="order-summary">
            {deliveryOptions.length > 0 && cartItems.map((cartItem) => {
                const selectedDeliveryOption = deliveryOptions
                    .find((deliveryOption) => {

                        return deliveryOption.id === cartItem.deliveryOptionId;
                    });

                return (
                    <div key={cartItem.productId}
                        className="cart-item-container">
                        <div className="delivery-date">
                            Delivery date: {formatDate(selectedDeliveryOption.estimatedDeliveryTimeMs)}
                        </div>
                        <CartItemDetailGrid deliveryOptions={deliveryOptions} cartItem={cartItem} fetchCartItems={fetchCartItems} />
                    </div>
                )
            })}
        </div>

    )
}

export default OrderSummary