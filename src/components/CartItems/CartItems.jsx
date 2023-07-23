import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import { Store } from "react-notifications-component";
import cloudinaryConfig from "../../config/cloudinaryConfig";
import {
  removeCartAsync,
  removeCart,
  increaseCart,
  increaseCartAsync,
  decreaseCartAsync,
  decreaseCart, updateCartQuantity, setCart
} from "../../redux/actions/cart";
import notificationsSettings from "../../constants/constants";

const CartItems = (props) => {
  const {
    cartQuantity,
    product: {
      name, currentPrice, imageUrls, itemNo
    },
  } = props.dataProducts;
  const location = useLocation();
  const isCheckoutPage = location.pathname === "/checkout";
  // eslint-disable-next-line no-unused-vars
  const [isCheckout, setIsCheckout] = useState(isCheckoutPage);
  const [inputValue, setInputValue] = useState(cartQuantity);
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.user.userInfo.token);
  const cartProducts = useSelector((state) => state.cart.cart);
  // eslint-disable-next-line no-underscore-dangle
  const itemId = props.dataProducts.product._id;
  // const cartProducts = useSelector((state) => state.cart.cart);
  useEffect(() => {
    setIsCheckout(isCheckoutPage);
  }, [isCheckoutPage]);

  useEffect(() => {
    const updatedCart = {
      products: cartProducts.map((item) => ({
        // eslint-disable-next-line no-underscore-dangle
        product: item.product._id,
        cartQuantity: item.cartQuantity
      }))
    };
    dispatch(setCart(updatedCart, userToken));
  }, [cartQuantity]);

  const OnDeleteItem = async (item, token) => {
    try {
      if (token) {
        dispatch(removeCartAsync(item, token));
        Store.addNotification({ ...notificationsSettings.basic, ...notificationsSettings.cartDeleted });
      } else {
        dispatch(removeCart(item));
        Store.addNotification({ ...notificationsSettings.basic, ...notificationsSettings.cartDeleted });
      }
    } catch (error) {
      Store.addNotification({ ...notificationsSettings.basic, ...notificationsSettings.cartNotDeleted });
      console.log(error);
    }
  };

  const onIncreaseItem = async (item, token) => {
    try {
      if (token) {
        dispatch(increaseCartAsync(item, token));
        setInputValue((prevState) => +prevState + 1);
        Store.addNotification({ ...notificationsSettings.basic, ...notificationsSettings.cartIncreased });
      } else {
        dispatch(increaseCart(item));
        setInputValue((prevState) => +prevState + 1);
        Store.addNotification({ ...notificationsSettings.basic, ...notificationsSettings.cartIncreased });
      }
    } catch (error) {
      Store.addNotification({ ...notificationsSettings.basic, ...notificationsSettings.cartNotIncreased });
      console.log(error);
    }
  };
  const onDecreaseItem = async (item, token) => {
    try {
      if (token) {
        dispatch(decreaseCartAsync(item, token));
        setInputValue((prevState) => prevState - 1);
        Store.addNotification({ ...notificationsSettings.basic, ...notificationsSettings.cartDecreased });
      } else {
        dispatch(decreaseCart(item));
        setInputValue((prevState) => prevState - 1);
        Store.addNotification({ ...notificationsSettings.basic, ...notificationsSettings.cartDecreased });
      }
    } catch (error) {
      console.log(error);
      Store.addNotification({ ...notificationsSettings.basic, ...notificationsSettings.cartNotDecreased });
    }
  };

  const handleInputChange = (value) => {
    if (/^\d{0,2}$/.test(value) && !(value.length > 1 && value === "0")) {
      setInputValue(value);
    }
  };

  const handleInputBlur = async (item, value) => {
    const {quantity} = props.dataProducts.product;
    const isValidValue = +value !== 0 && +value <= quantity;

    if (isValidValue) {
      if (userToken) {
        dispatch(updateCartQuantity(itemId, +value));
        Store.addNotification({ ...notificationsSettings.basic, ...notificationsSettings.cartQuantityChanged });
      } else {
        dispatch(updateCartQuantity(itemId, +value));
        Store.addNotification({ ...notificationsSettings.basic, ...notificationsSettings.cartQuantityChanged });
      }
    } else {
      Store.addNotification({ ...notificationsSettings.basic, ...notificationsSettings.cartQuantityNotChanged });
      setInputValue(cartQuantity);
    }
  };

    return (
    <>
      <li className={`cart-list__item ${isCheckout ? "none" : ""}`}>
        {/* <img className={"cart-list__item-image"} src={imageUrls[0]} alt="item-img" /> */}
        <Link className="cart-list__item-image-wrap" to={`/products/${itemNo}`}>
          {" "}
          <img
            className={"cart-list__item-image"}
            src={imageUrls[0]}
            alt="item-img"
          />
        </Link>
        <div className="cart-list__item-details">
          <Link to={`/products/${itemNo}`} className="cart-list__item-title">
            {name}
          </Link>
          <p className="cart-list__item-price">${currentPrice}</p>
          <div className="cart-list__item-quantity">
            <button
              type={"button"}
              className="cart-list__item-quantity-minus"
              onClick={() => onDecreaseItem(itemId, userToken)}
              disabled={cartQuantity <= 1}
            >
              -
            </button>
            <input
              type={"text"}
              className="cart-list__item-quantity-number"
              value={inputValue}
              onChange={(event) => handleInputChange(event.target.value)}
              onBlur={() => handleInputBlur(itemId, inputValue)}
            />
            <button
              type={"button"}
              className="cart-list__item-quantity-plus"
              onClick={() => onIncreaseItem(itemId, userToken)}
              disabled={cartQuantity === props.dataProducts.product.quantity}
            >
              +
            </button>
          </div>
          <button
            type={"button"}
            className={"cart-list__item-button"}
            onClick={() => OnDeleteItem(itemId, userToken)}
          >
            <Image
              cloudName={cloudinaryConfig.cloudName}
              publicId="cart-trash-icon_mwntsr"
              className={"cart-list__item-icon"}
              alt="delete item from cart"
            />
          </button>
        </div>
      </li>

      <li className={`checkout-cart-list__item ${isCheckout ? "" : "none"}`}>
        {/* <img className={"cart-list__item-image"} src={imageUrls[0]} alt="item-img" /> */}
        <Link
          className="checkout-cart-list__item-image-wrap"
          to={`/products/${itemNo}`}
        >
          {" "}
          <img
            className={"checkout-cart-list__item-image"}
            src={imageUrls[0]}
            alt="item-img"
          />
        </Link>
        <div className="checkout-cart-list__item-details">
          <Link
            to={`/products/${itemNo}`}
            className="checkout-cart-list__item-title"
          >
            {name}
          </Link>
          <p className="checkout-cart-list__item-price">${currentPrice}</p>
          <div className="checkout-cart-list__item-quantity">
            <button
              type={"button"}
              className="checkout-cart-list__item-quantity-minus"
              onClick={() => onDecreaseItem(itemId, userToken)}
              disabled={cartQuantity <= 1}
            >
              -
            </button>
            <input
              type={"text"}
              className="checkout-cart-list__item-quantity-number"
              onChange={(event) => handleInputChange(event)}
            />
            <button
              type={"button"}
              className="checkout-cart-list__item-quantity-plus"
              onClick={() => onIncreaseItem(itemId, userToken)}
              disabled={cartQuantity === props.dataProducts.product.quantity}
            >
              +
            </button>
          </div>
          <button
            type={"button"}
            className={"checkout-cart-list__item-button"}
            onClick={() => OnDeleteItem(itemId, userToken)}
          >
            <Image
              cloudName={cloudinaryConfig.cloudName}
              publicId="cart-trash-icon_mwntsr"
              className={"checkout-cart-list__item-icon"}
              alt="delete item from cart"
            />
          </button>
        </div>
      </li>
    </>
  );
};

export default CartItems;