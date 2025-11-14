import { Link, useNavigate, useSearchParams } from 'react-router';
import './Header.css'
import { useState } from 'react';

function Header({ cartItems }) {
    const navigate = useNavigate();
    const [SearchParams] = useSearchParams();



    const SearchText = SearchParams.get('search');



    const [search, setSearch] = useState(SearchText || '');

    const updateSearchInput = (event) => {
        setSearch(event.target.value);
    };

    const searchProducts = () => {
        navigate(`/?search=${search}`)
    };

    let totalItems = 0;

    cartItems.forEach(cartItem => {
        totalItems += cartItem.quantity;
    });

    return (
        <div className="header">
            <div className="left-section">
                <Link to="/" className="header-link">
                    <img className="logo"
                        src="images/logo-white.png" />
                    <img className="mobile-logo"
                        src="images/mobile-logo-white.png" />
                </Link>
            </div>

            <div className="middle-section">
                <input className="search-bar" type="text" placeholder="Search"
                    value={search} onChange={updateSearchInput} />

                <button className="search-button" onClick={searchProducts} >
                    <img className="search-icon" src="images/icons/search-icon.png" />
                </button>
            </div>

            <div className="right-section">
                <Link className="orders-link header-link" to="/orders">
                    <span className="orders-text">Orders</span>
                </Link>

                <Link className="cart-link header-link" to="/checkout">
                    <img className="cart-icon" src="images/icons/cart-icon.png" />
                    <div className="cart-quantity">{totalItems}</div>
                    <div className="cart-text">Cart</div>
                </Link>
            </div>
        </div>
    )
}
export default Header;