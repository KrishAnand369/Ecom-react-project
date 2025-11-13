import axios  from 'axios';
import { formatMoney } from '../../utils/money'
import DeliveryOptions from './DeliveryOptions';
const CartItemDetailGrid = ({cartItem,deliveryOptions,fetchCartItems}) => {
    const deleteCartItem = async ()=>{
       await axios.delete(`/api/cart-items/${cartItem.product.id}`);
       await fetchCartItems();
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
                        Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                    </span>
                    <span className="update-quantity-link link-primary">
                        Update
                    </span>
                    <span className="delete-quantity-link link-primary"
                        onClick={deleteCartItem}>
                        Delete
                    </span>
                </div>
            </div>
            <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} fetchCartItems={fetchCartItems}/>
        </div>
    )
}

export default CartItemDetailGrid