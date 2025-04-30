import { useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartItems = useSelector(({cartSlice}) => cartSlice.shoppingCart);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={{
              id: item.id,
              title: item.title,
              quantity: item.count,
              total: item.totalAmount,
              price: item.perCountAmount,
            }}
          />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
