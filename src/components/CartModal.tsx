import { IoCart } from "react-icons/io5";
import { useSelector } from "react-redux";
import { selectCart, clearCart } from "../store/features/cartSlice";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import CartModalProduct from "./CartModalProduct";
import { useDispatch } from "react-redux";
import "../styles/cartModal.scss";

const CartModal = () => {
  const [open, setOpen] = useState(false);
  const cartData = useSelector(selectCart);
  const dispatch = useDispatch();
  const getTotalAmount = () => {
    let amount = 0;
    cartData.items.forEach((item) => {
      amount = amount + item.qty;
    });
    return amount;
  };

  const getTotalPrice = () => {
    let price = 0;
    cartData.items.forEach((item) => {
      price = price + parseInt(item.product.price) * item.qty;
    });
    return price;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#fff",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <div className="cart-icon-container">
        <span className="cart-length-container">{getTotalAmount()}</span>
        <div role="button" onClick={() => setOpen(true)}>
          <IoCart size={40} color={cartData.items.length > 0 ? "#e6478a" : "#c4c4c4"} />
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="cart">
            <div className="row mx-auto mt-4">
              <div>
                <div className="cart-title">Koszyk</div>
                <div className="cart-items-container">
                  {cartData.items.map?.((item) => (
                    <CartModalProduct item={item.product} amount={item.qty} key={`cart-item-${item?.product?.id}`} />
                  ))}
                </div>
              </div>
              <div>
                <div className="cart-total">
                  <div className="d-flex justify-content-center">
                    <div className="cart-quantity">{getTotalAmount()} sztuk</div>
                    <div className="cart-total-price ms-3">{getTotalPrice()} zł</div>
                  </div>
                  <div className="mt-4 d-flex justify-content-center">
                    <button type="button" className="custom-btn" onClick={() => dispatch(clearCart())}>
                      Przejdź do realizacji zamówienia
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default CartModal;
