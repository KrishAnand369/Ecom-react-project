import Product from './Product';
export default function ProductsGrid({ products, fetchCartItems }) {

    return (
        <div className="products-grid">

            {products.map((product) => {

                return (
                    <Product key={product.id} product={product} fetchCartItems={fetchCartItems} />
                );
            })}
        </div>
    )
}