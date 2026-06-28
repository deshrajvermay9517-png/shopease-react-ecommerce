import { Link, useParams } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <main className="details-page">
        <h2>Product not found</h2>
        <Link to="/">Go back home</Link>
      </main>
    );
  }

  return (
    <main className="details-page">
      <div className="details-card">
        <div className="details-image">{product.image}</div>

        <div className="details-content">
          <p className="category">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="rating">⭐ {product.rating}</p>
          <p className="price">₹{product.price}</p>
          <p className="description">{product.description}</p>

          <button onClick={() => addToCart(product)}>Add to Cart</button>

          <Link to="/" className="back-link">
            ← Back to products
          </Link>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;