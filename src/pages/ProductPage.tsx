import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Slide } from "react-slideshow-image";
import { addToCart, selectCart } from "../store/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { ProductProps } from "../types";
import { selectProducts } from "../store/features/productsSlice";
import "../styles/productPage.scss";
import "react-slideshow-image/dist/styles.css";

const ProductPage = () => {
  const { id } = useParams();
  const productsData = useSelector(selectProducts);
  const cartData = useSelector(selectCart);
  const currentItem = productsData.items.find((item) => item.id === id) as ProductProps;
  const [mainImage, setMainImage] = useState(currentItem?.image);
  const [selectedAmount, setSelectedAmount] = useState(1);
  const [productSliderCount, setProductSliderCount] = useState(3);
  const dispatch = useDispatch();

  const currentItemInCart = cartData.items.find((item) => item.product.id === id);

  const getAvailableAmount = () => {
    if (currentItemInCart) {
      return currentItem?.avaiableAmount - currentItemInCart.qty;
    } else {
      return currentItem?.avaiableAmount;
    }
  };

  const sliderProperties = {
    slidesToShow: productSliderCount,
    slidesToScroll: 1,
    autoplay: false,
    cssClass: "custom-slider",
    arrows: true,
  };

  const handleResize = () => {
    setProductSliderCount(window.innerWidth > 575 ? 3 : 2);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="product-page pt-4 pb-5">
      <div className="row mx-3">
        <div className="col-12 col-lg-6">
          <div className="main-image-container mb-4 mb-lg-0">
            <img src={mainImage} alt="" className="main-image pointer" />
          </div>
          <div className="slider-container mt-4">
            <Slide {...sliderProperties}>
              {currentItem?.images.map((image, index) => (
                <div key={`product-page-image-${index}`} className="product-page-image-container">
                  <img src={image} alt="" className="product-page-image pointer" onClick={() => setMainImage(image)} />
                </div>
              ))}
            </Slide>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="info-container">
            <div className="name mt-4 pb-4">{currentItem?.name}</div>
            <div className="item-price-container mt-4 d-flex align-items-center">
              <div className="item-price d-flex">{currentItem?.price} zł</div>
            </div>
            <div>Dostępna ilość: {getAvailableAmount()}</div>
            <div className="quantity mt-4 pb-5">
              Ilość:
              <div className="d-flex align-items-center">
                <input
                  className="amount-input"
                  type="number"
                  value={selectedAmount}
                  min={1}
                  max={getAvailableAmount()}
                  onChange={(e) => {
                    if (
                      parseInt(e.target.value) > 0 &&
                      parseInt(e.target.value) <= (currentItem?.avaiableAmount || 0)
                    ) {
                      setSelectedAmount(parseInt(e.target.value));
                    }
                  }}
                />
                <button
                  type="button"
                  className="add-to-cart-btn mt-2 ms-4"
                  onClick={() => dispatch(addToCart({ product: currentItem, qty: selectedAmount }))}
                >
                  DO KOSZYKA
                </button>
              </div>
            </div>
            <div className="desc pt-5">{currentItem?.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
