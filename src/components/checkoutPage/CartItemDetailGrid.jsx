import axios from 'axios';
import { formatMoney } from '../../utils/money'
import DeliveryOptions from './DeliveryOptions';
import { useState } from 'react';
const CartItemDetailGrid = ({ cartItem, deliveryOptions, fetchCartItems }) => {
    const [isUpdatingQuantity, SetIsUpdatingQuantity] = useState(false);
    const [quantity, SetQuantity] = useState(cartItem.quantity);

    const deleteCartItem = async () => {
        await axios.delete(`/api/cart-items/${cartItem.product.id}`);
        await fetchCartItems();
    };
    const updateCartItem = async () => {
        await axios.put(`/api/cart-items/${cartItem.product.id}`, {
            quantity: parseInt(quantity)
        })
        await fetchCartItems();
    };
    const updateQuantity = () => {
        if (isUpdatingQuantity) {
            SetIsUpdatingQuantity(false)
            updateCartItem();
        } else {
            SetIsUpdatingQuantity(true)
        }
    };

    const handleQuantityKeyDown = (event) => {

        const keyPressed = event.key;
        if (keyPressed === 'Enter') {
            updateQuantity();
        } else if (keyPressed === 'Escape') {
            SetIsUpdatingQuantity(false);
        } else if (event.key === 'ArrowUp') {
            // Decrease count on Up arrow key
            SetQuantity(quantity => quantity - 1);
        } else if (event.key === 'ArrowDown') {
            // Increase count on Down arrow key
            SetQuantity(quantity => quantity + 1);
        }
    };

    return (
        <div className="cart-item-details-grid">
            <img className="product-image"
                src={cartItem.product.image} />

            <div className="cart-item-details">
                <div className="product-name">
                    {cartItem.product.name}
                </div>
                <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                    <span>
                        Quantity:
                        {isUpdatingQuantity ?
                            <input type='text' className='quantity-textbox' value={quantity}
                                onChange={(e) => {
                                    SetQuantity(e.target.value);
                                }}
                                onKeyDown={handleQuantityKeyDown}
                                style={{ opacity: isUpdatingQuantity ? 1 : 0 }}
                            />
                            :
                            <span className="quantity-label" style={{ opacity: isUpdatingQuantity ? 0 : 1 }}> {cartItem.quantity}</span>
                        } </span>
                    <span className="update-quantity-link link-primary"
                        onClick={updateQuantity}>
                        Update
                    </span>
                    <span className="delete-quantity-link link-primary"
                        onClick={deleteCartItem}>
                        Remove
                    </span>
                </div>
            </div>
            <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} fetchCartItems={fetchCartItems} />
        </div>
    )
}

export default CartItemDetailGrid