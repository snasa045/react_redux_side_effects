import { shoppingCartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending Data",
        message: "Cart data is being send!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-redux-side-effects-e921d-default-rtdb.firebaseio.com/shoppingCart.json",
        {
          method: "PUT",
          body: JSON.stringify({shoppingCart: cart.shoppingCart, totalQuantity: cart.totalQuantity}),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed!");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfuly!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};

export const fetchCartdata = () => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://react-redux-side-effects-e921d-default-rtdb.firebaseio.com/shoppingCart.json"
      );

      if (!response.ok) {
        throw new Error("Error during fetching cart data!");
      }

      return await response.json();
    };

    try {
      const responseData = await sendRequest();
      dispatch(shoppingCartActions.setInitialState({
        shoppingCart: responseData.shoppingCart || [],
        totalQuantity: responseData.totalQuantity
      }));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};