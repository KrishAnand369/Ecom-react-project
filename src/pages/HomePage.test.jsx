import { it, expect, describe, vi, beforeEach } from 'vitest';
import axios from 'axios'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import HomePage from './HomePage';

vi.mock('axios');

describe('HomePage Component', () => {
    let fetchMockCartItems;
    let user;

    beforeEach(() => {
        vi.clearAllMocks();
        fetchMockCartItems = vi.fn();

        axios.get.mockImplementation(async (urlPath) => {
            if (urlPath === '/api/products') {
                return {
                    data: [{
                        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                        rating: {
                            stars: 4.5,
                            count: 87
                        },
                        priceCents: 1090,
                        keywords: ["socks", "sports", "apparel"]
                    },
                    {
                        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                        image: "images/products/intermediate-composite-basketball.jpg",
                        name: "Intermediate Size Basketball",
                        rating: {
                            stars: 4,
                            count: 127
                        },
                        priceCents: 2095,
                        keywords: ["sports", "basketballs"]
                    }]
                }
            }
        });

        user = userEvent.setup();
    })

    it('displays the products correct', async () => {
        render(
            <MemoryRouter>
                <HomePage
                    cartItems={[]} fetchCartItems={fetchMockCartItems} />
            </MemoryRouter>
        );
        const productContainers = await screen.findAllByTestId('product-container') //same as getAllByTestId but wait till the axios request is finished

        expect(productContainers.length).toBe(2);

        expect(
            within(productContainers[0])
                .getByText("Black and Gray Athletic Cotton Socks - 6 Pairs")
        ).toBeInTheDocument();

        expect(
            within(productContainers[1])
                .getByText("Intermediate Size Basketball")
        ).toBeInTheDocument();
    })


    it('adds a product to the cart', async () => {
        render(
            <MemoryRouter>
                <HomePage
                    cartItems={[]} fetchCartItems={fetchMockCartItems} />
            </MemoryRouter>
        );
        const productContainers = await screen.findAllByTestId('product-container') //same as getAllByTestId but wait till the axios request is finished

        const addToCartBtn1 = within(productContainers[0])
            .getByTestId('add-to-cart-button')
        await user.click(addToCartBtn1)

        const addToCartBtn2 = within(productContainers[1])
            .getByTestId('add-to-cart-button')
        await user.click(addToCartBtn2)

        expect(axios.post).toHaveBeenNthCalledWith(1, '/api/cart-items', {
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1
        });

        expect(axios.post).toHaveBeenNthCalledWith(2, '/api/cart-items', {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1
        });

        expect(fetchMockCartItems).toHaveBeenCalledTimes(2)
    })

    it('adds a product to the cart with quantity', async () => {
        render(
            <MemoryRouter>
                <HomePage
                    cartItems={[]} fetchCartItems={fetchMockCartItems} />
            </MemoryRouter>
        );
        const productContainers = await screen.findAllByTestId('product-container') //same as getAllByTestId but wait till the axios request is finished

        const quantitySelecter1 = within(productContainers[0])
            .getByTestId('product-quantity-selecter');
        await user.selectOptions(quantitySelecter1, '3')
        expect(quantitySelecter1).toHaveValue('3');
        
        const addToCartBtn1 = within(productContainers[0])
            .getByTestId('add-to-cart-button')
        await user.click(addToCartBtn1)

        const quantitySelecter2 = within(productContainers[1])
            .getByTestId('product-quantity-selecter');
        await user.selectOptions(quantitySelecter2, '2')
        expect(quantitySelecter2).toHaveValue('2');

        const addToCartBtn2 = within(productContainers[1])
            .getByTestId('add-to-cart-button')

        await user.click(addToCartBtn2)

        expect(axios.post).toHaveBeenNthCalledWith(1, '/api/cart-items', {
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 3
        });

        expect(axios.post).toHaveBeenNthCalledWith(2, '/api/cart-items', {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 2
        });

        expect(fetchMockCartItems).toHaveBeenCalledTimes(2)
    })
})
