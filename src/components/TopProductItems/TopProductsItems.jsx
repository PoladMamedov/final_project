import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useServer from "../../hooks/useServer";
import ProductCard from "../ProductCard/ProductCard";
import fillProducts from "../../redux/actions/getProdicts";

function TopProductItem() {
  const { getAllProducts } = useServer();
  const [storedProducts, setStoredProducts] = useState([]);

  const dispatch = useDispatch()

  useEffect(() => {

    getAllProducts()
      .then((result) => {
        dispatch(fillProducts(result));
        const originalProducts = [...result];
        const selectedProducts = [];
        while (selectedProducts.length < 8 && originalProducts.length > 0) {
          const randomIndex = Math.floor(Math.random() * originalProducts.length);
          const randomElement = originalProducts[randomIndex];
          selectedProducts.push(randomElement);
          originalProducts.splice(randomIndex, 1);
        }
        setStoredProducts(selectedProducts);
      })
      .catch((error) => {
        console.error(error);
      });

  }, [] );

  return (
    <div className={"topProduct__wrapper"}>
      <div className="container flex_container">
        <h2 className={"topProduct"}>Top Products</h2>
        <div className="topProduct__card">
          {storedProducts.map((e) => (
            // eslint-disable-next-line no-underscore-dangle
            <ProductCard item={e} key={e._id} />
          ))}
        </div>
        <button type={"button"} className={"topProduct__btn-allProduct"}>
          ALL Product
          <svg className={"topProduct__svg"} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.16666 10H15.8333" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 4.16667L15.8333 10L10 15.8333" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default memo(TopProductItem);
