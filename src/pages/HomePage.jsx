import axios from 'axios'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import ProdctsGrid from '../components/homePage/ProductsGrid'
import './HomePage.css'

function HomePage({cartItems, fetchCartItems}) {

    //using fetch to get data from backend API
    // fetch('http://localhost:3000/api/products')
    // .then((response)=>{
    //      return response.json();
    // }).then((data)=>{
    //             console.log(data)
    //         });


    //using axios to get data from backend API
    const [products,setProducts] = useState([]);
    

    useEffect ( ()=>{
        const getHomepageProducts = async () =>{
            const response = await axios.get('/api/products')
            setProducts(response.data);
        }
        getHomepageProducts();
    },[]);  //only loads once  as array is [] 

    

    return (
        <>
            <title>Homepage</title>
                    <Header cartItems ={cartItems} />

            <div className="home-page">
                <ProdctsGrid products={products} fetchCartItems ={fetchCartItems} />
            </div>
        </>
    );
}

export default HomePage;