import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import Notification from "./components/UI/Notification";
import { fetchCartdata, sendCartData } from "./components/store/cart-actions";

let isInitial = true;

function App() {
  const toggleMyCart = useSelector(({ uiSlice }) => uiSlice.toggleMyCart);
  const cart = useSelector(({ cartSlice }) => cartSlice);
  const notification = useSelector(({ uiSlice }) => uiSlice.notification);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchCartdata());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);


  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {toggleMyCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
