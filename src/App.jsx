import { Routes, Route } from 'react-router'
import axios from 'axios'
import { useEffect, useState } from 'react'
import HomePage from './pages/HomePage'
import CheckoutPage from './pages/CheckoutPage'
import OrdersPage from './pages/OrdersPage'
import TrackingPage from './pages/TrackingPage'
import './App.css'

function App() {
  const [cartItems, setCartItems] = useState([]);
  const fetchCartItems = async () => {
    const response = await axios.get('/api/cart-items?expand=product')
    setCartItems(response.data);
  };
  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cartItems={cartItems} fetchCartItems={fetchCartItems} />} />
      <Route path='/checkout' element={<CheckoutPage cartItems={cartItems} fetchCartItems={fetchCartItems} />} />
      <Route path='/orders' element={<OrdersPage cartItems={cartItems} fetchCartItems={fetchCartItems} />} />
      <Route path='/tracking' element={<TrackingPage cartItems={cartItems} />} />
    </Routes>
  )
}

export default App
