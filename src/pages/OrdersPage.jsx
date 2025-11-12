import axios from 'axios';
import Header from '../components/Header'
import { Link } from 'react-router';
import './OrdersPage.css'
import { formatDateByFormat } from '../utils/date'
import { formatMoney } from '../utils/money'
import { Fragment, useEffect, useState } from 'react';


function OrdersPage({ cartItems }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('/api/orders?expand=products')
            .then((response) => {
                console.log(response.data);
                setOrders(response.data)
            });
    }, []);

    return (
        <>
            <title>Orders</title>
            <Header cartItems={cartItems} />

            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <div className="orders-grid">
                    {orders.map((order) => {
                        return (
                            <div key={order.id} className="order-container">
                                <div className="order-header">
                                    <div className="order-header-left-section">
                                        <div className="order-date">
                                            <div className="order-header-label">Order Placed:</div>
                                            <div>{formatDateByFormat(order.orderTimeMs, 'MMMM D')}</div>
                                        </div>
                                        <div className="order-total">
                                            <div className="order-header-label">Totald:</div>
                                            <div>{formatMoney(order.totalCostCents)}</div>
                                        </div>
                                    </div>

                                    <div className="order-header-right-section">
                                        <div className="order-header-label">Order ID:</div>
                                        <div>{order.id}</div>
                                    </div>
                                </div>

                                <div className="order-details-grid">
                                    {order.products.map((orderProduct) => {

                                        return (
                                            <Fragment key={orderProduct.productId}>
                                                <div className="product-image-container">
                                                    <img src={orderProduct.product.image} />
                                                </div>

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
                                                    <button className="buy-again-button button-primary">
                                                        <img className="buy-again-icon" src="images/icons/buy-again.png" />
                                                        <span className="buy-again-message">Add to Cart</span>
                                                    </button>
                                                </div>

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
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
export default OrdersPage;