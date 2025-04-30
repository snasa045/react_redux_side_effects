import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import { uiActions } from '../store/ui-slice';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const totalCartCount = useSelector(({cartSlice}) => cartSlice.totalQuantity);

  const toggleMyCartHandler = () => {
    dispatch(uiActions.toggleMyCart());
  }

  return (
    <button className={classes.button} onClick={toggleMyCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalCartCount}</span>
    </button>
  );
};

export default CartButton;
