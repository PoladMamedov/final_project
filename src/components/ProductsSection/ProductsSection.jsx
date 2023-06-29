/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-bind */
import React, { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { increment, decrement } from "../../redux/actions/counterFilter";
import Filter from "../Filter/Filter";
import FilterMini from "../Filter/FilterMini";
import Breadcrumb from "../BreadCrumb/BreadCrumb";
import useServer from "../../hooks/useServer";

const ProductsSection = () => {
  const server = useServer();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]); // тут хранятся продукты
  
  useEffect(() => {
    async function fetchProducts() {
       try {
         const responce = await server.getAllProducts();
         setProducts(responce);
       } catch (error) {
          console.error(error);
       }
    }
    fetchProducts();
 }, []);

  const filterFull = React.createRef();
  const filterMini = useRef();

  // для изменения кол-ва в скобках при свернутом фильтре
  function addCountFilter(e) {
    return e.target.checked ? dispatch(increment()) : dispatch(decrement());
  }

  // для переключения свернутого и развернуго фильтра на мобил.
  function toggleFilter() {
    filterFull.current.classList.toggle("hidden");
    filterMini.current.classList.toggle("visibility");
  }
  return (
    <>
      <Breadcrumb />
      <section>
        <div className="container">
          <div className="products-section">
            <Filter toggle={toggleFilter} addCounter={addCountFilter} ref={filterFull} />
            <FilterMini toggle={toggleFilter} ref={filterMini} />
            {/* <div className="products-section-cards">
            {
              products.map(({
                categories,
                currentPrice,
                name,
                itemNo
                }) => (
                <div key={itemNo} style={{ border: "1px solid black" }}>
                  <h4>{name}</h4>
                  <p>{categories}</p>
                  <p>{currentPrice}</p>
                </div>
              ))
              }
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsSection;
