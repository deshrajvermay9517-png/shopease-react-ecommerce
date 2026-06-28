import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <h1>Your Cart</h1>
        <p className="empty-message">Your cart is empty.</p>
        <Link to="/" className="details-btn">
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <h1>Your Cart</h1>

      <section className="cart-list">
        {cartItems.map((item) => (
          <article className="cart-item" key={item.id}>
            <div className="cart-product">
              <div className="cart-image">{item.image}</div>

              <div>
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
              </div>
            </div>

            <div className="quantity-controls">
              <button onClick={() => decreaseQuantity(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQuantity(item.id)}>+</button>
            </div>

            <p className="item-total">₹{item.price * item.quantity}</p>

            <button
              className="remove-btn"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </article>
        ))}
      </section>

      <section className="cart-summary">
        <h2>Total: ₹{totalPrice}</h2>

        <div className="summary-actions">
          <button onClick={clearCart} className="remove-btn">
            Clear Cart
          </button>

          <button onClick={() => alert("Checkout feature coming soon!")}>
            Checkout
          </button>
        </div>
      </section>
    </main>
  );
}

export default Cart;