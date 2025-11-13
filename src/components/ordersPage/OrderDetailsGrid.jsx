import { Link } from 'react-router';
import { Fragment } from 'react';
import ProductDetails from './ProductDetails';

const OrderDetailsGrid = ({ order }) => {
    return (
        <div className="order-details-grid">
            {order.products.map((orderProduct) => {

                return (
                    <Fragment key={orderProduct.productId}>
                        <div className="product-image-container">
                            <img src={orderProduct.product.image} />
                        </div>

                        <ProductDetails orderProduct={orderProduct} />

                        <div className="product-actions">
                            <Link to="/tracking">
                                <button className="track-package-button button-secondary">
                                    Track package
                                </button>
                            </Link>
                        </div>
                    </ Fragment>
                )
            })}
        </div>
    )
}

export default OrderDetailsGrid