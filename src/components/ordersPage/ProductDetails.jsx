import { formatDateByFormat } from '../../utils/date'
import axios from 'axios';

const ProductDetails = ({ orderProduct, fetchCartItems }) => {
    const addToCart = async () => {
        await axios.post('/api/cart-items', {
            productId: orderProduct.product.id,
            quantity: 1
        });
        await fetchCartItems();
    }
    return (
        <div className="product-details">
            <div className="product-name">
                {orderProduct.product.name}
            </div>
            <div className="product-delivery-date">
                Arriving on: {formatDateByFormat(orderProduct.estimatedDeliveryTimeMs, 'MMMM D')}
            </div>
            <div className="product-quantity">
                Quantity: {orderProduct.quantity}
            </div>
            <button className="buy-again-button button-primary"
                onClick={addToCart}>
                <img className="buy-again-icon" src="images/icons/buy-again.png" />
                <span className="buy-again-message">Add to Cart</span>
            </button>
        </div>
    )
}

export default ProductDetails