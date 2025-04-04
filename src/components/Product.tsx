import { IoBagAdd } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";
import { addToCart } from "../store/features/cartSlice";
import { useDispatch } from "react-redux";
import { ProductProps } from "../types";
import "../styles/product.scss";

const Product = ({ item }: { item: ProductProps }) => {
  const dispatch = useDispatch();
  return (
    <div className="store-item-container">
      <div className="store-item">
        <div className="icons-container">
          <span title="Do koszyka" onClick={() => dispatch(addToCart({ product: item, qty: 1 }))}>
            <IoBagAdd className="item-icon mx-2" size={45} />
          </span>
          <Link to={{ pathname: `/product/${item.id}` }}>
            <span title="Podgląd">
              <MdOutlineRemoveRedEye className="item-icon mx-2" size={45} />
            </span>
          </Link>
        </div>
        <div className="image-container">
          {item.images.length && <img src={item.images[0]} alt="" className="item-second-image" />}
          <img src={item.image} alt="" className="item-image" />
        </div>
        <div className="item-name">{item.name}</div>
        <div className="item-price-container">{item.price} zł Brutto</div>
      </div>
    </div>
  );
};

export default Product;
