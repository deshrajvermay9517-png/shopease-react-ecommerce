import { Link } from "react-router";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <div className="product-image">{product.image}</div>

      <div className="product-info">
        <p className="category">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="rating">⭐ {product.rating}</p>
        <p className="price">₹{product.price}</p>

        <div className="card-actions">
          <Link to={`/product/${product.id}`} className="details-btn">
            View Details
          </Link>

          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;