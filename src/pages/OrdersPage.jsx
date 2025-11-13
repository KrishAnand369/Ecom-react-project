import axios from 'axios';
import Header from '../components/Header'
import { useEffect, useState } from 'react';
import './OrdersPage.css'
import OrderHeader from '../components/ordersPage/OrderHeader';
import OrderDetailsGrid from '../components/ordersPage/OrderDetailsGrid';


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
                                <OrderHeader order={order} />

                                <OrderDetailsGrid order={order} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
export default OrdersPage;