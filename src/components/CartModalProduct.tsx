import { ProductProps } from "../types";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteFromCart, addToCart, decrementFromCart } from "../store/features/cartSlice";
import "../styles/cartModalProduct.scss";

const CartModalProduct = ({ item, amount }: { item: ProductProps; amount: number }) => {
  const dispatch = useDispatch();
  const getTotalPrice = () => {
    const price = parseInt(item?.price) * amount;
    return price;
  };

  const handleDecrement = () => {
    if (amount === 1) {
      dispatch(deleteFromCart({ product: item, qty: 0 }));
    } else {
      dispatch(decrementFromCart({ product: item, qty: -1 }));
    }
  };

  return (
    <div className="cart-item my-4 gap-4 d-flex align-items-center mx-auto justify-content-center">
      <div className="cart-image-container col-md-3 col-12">
        <img src={item?.image} alt="" className="cart-image" />
      </div>
      <div className="text-container col-md-4 col-12">
        <div className="cart-item-name text-center text-md-start mt-3 mt-md-0">{item?.name}</div>
        <div className="cart-item-price-container d-flex justify-content-center justify-content-md-start mt-2 mt-md-0">
          <div className="cart-item-price ms-1"> {item?.price} zł</div>
        </div>
      </div>
      <div className="quantity-container col-md col-12 d-flex justify-content-center justify-content-md-start mt-2 mt-md-0">
        <span className="mt-2 cart-item-quantity-change d-flex">
          <span role="button" className="pointer" onClick={handleDecrement}>
            -
          </span>
          <span className="mx-4">{amount}</span>
          <span role="button" className="pointer" onClick={() => dispatch(addToCart({ product: item, qty: 1 }))}>
            +
          </span>
        </span>
      </div>
      <div className="cart-item-total-price col-md col-12 text-center text-md-start mt-3 mt-md-0">
        {getTotalPrice()} zł
      </div>
      <div role="button" onClick={() => dispatch(deleteFromCart({ product: item, qty: 0 }))}>
        <MdDelete size={40} />
      </div>
    </div>
  );
};

export default CartModalProduct;
