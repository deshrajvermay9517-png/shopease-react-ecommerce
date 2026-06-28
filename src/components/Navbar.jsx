import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { totalItems } = useCart();

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        ShopEase
      </Link>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/cart" className="cart-link">
          Cart ({totalItems})
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;