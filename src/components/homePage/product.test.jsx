import { it, expect, describe, vi, beforeEach } from 'vitest';
import axios from 'axios'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import Product from './Product';

vi.mock('axios');

describe('Product component', () => {
    let product;

    let fetchCartMock;

    let user;

    // Reset mocks and set up common variables before each test 
    beforeEach(() => {
        product = {
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
                stars: 4.5,
                count: 87
            },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"]
        };

        fetchCartMock = vi.fn();

        user = userEvent.setup();
    })

    it('displays the product details correctly', () => {

        render(<Product product={product} fetchCartItems={fetchCartMock} />);

        expect(
            screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
        ).toBeInTheDocument();

        expect(
            screen.getByText('$10.90')
        ).toBeInTheDocument();

        expect(
            screen.getByTestId('product-image')
        ).toHaveAttribute('src', 'images/products/athletic-cotton-socks-6-pairs.jpg');

        expect(
            screen.getByTestId('product-rating-stars-image')
        ).toHaveAttribute('src', 'images/ratings/rating-45.png');

        expect(
            screen.getByText('87')
        ).toBeInTheDocument();
    });

    it('adds a product to cart', async () => {
        render(<Product product={product} fetchCartItems={fetchCartMock} />);

        const addToCartBtn = screen.getByTestId('add-to-cart-button')
        await user.click(addToCartBtn);

        expect(axios.post).toHaveBeenCalledWith(
            '/api/cart-items',
            {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1
            }
        );
        expect(fetchCartMock).toHaveBeenCalled();
    })

    it('selects a Quantity', async  () => {

        render(<Product product={product} fetchCartItems={fetchCartMock} />);
        const quantitySelecter = screen.getByTestId('product-quantity-selecter');
        expect(quantitySelecter).toHaveValue('1');

        await user.selectOptions(quantitySelecter,'3')
        expect(quantitySelecter).toHaveValue('3');

        const addToCartBtn = screen.getByTestId('add-to-cart-button')
        await user.click(addToCartBtn)
        expect(axios.post).toHaveBeenCalledWith(
            '/api/cart-items',
            {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 3
            }
        );
        expect(fetchCartMock).toHaveBeenCalled();
        
    })
});