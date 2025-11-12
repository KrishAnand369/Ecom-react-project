import {Routes,Route} from 'react-router'
import axios from 'axios'
import { useEffect, useState } from 'react'
import HomePage from './pages/HomePage'
import CheckoutPage from './pages/CheckoutPage'
import OrdersPage from './pages/OrdersPage'
import TrackingPage from './pages/TrackingPage'
import './App.css'

function App() {
const [cartItems,setCartItems] = useState([]);

useEffect (()=>{
axios.get('/api/cart-items?expand=product')
        .then((response)=>{
            setCartItems(response.data);
        });
},[])
  
   return (
    <Routes>
      <Route index element ={ <HomePage cartItems ={cartItems}/>} />
      <Route path='/checkout' element ={ <CheckoutPage cartItems ={cartItems} />} />
      <Route path='/orders' element ={ <OrdersPage/>} />
      <Route path='/tracking' element ={ <TrackingPage/>} />
    </Routes>
  )
}

export default App
