import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb";
import SortFilter from "../../components/SortFilter/SortFilter";
import Filter from "../../components/Filter/Filter";
import FilterMini from "../../components/Filter/FilterMini";
import AllProductItems from "../../components/AllProductItems/AllProductItems";
import { toggleFilter, addCountFilter} from "../../handlers/handlersFunctions";
import { increment, decrement } from "../../redux/actions/counterFilter";
import { sortLowToHighPrice } from "../../redux/actions/sortFilter";

const Mouses = () => {
const dispatch = useDispatch();

const {categories} = useSelector((state) => state.categories);
const filterCategories = categories.filter((item) => item.level === 1 && item.parentId === "Mouses");
const { filteredProducts } =  useSelector((state) => state.filteredProducts);
const [products, setProducts] = useState([]);
const filterFull = React.createRef();
const filterMini = useRef();
const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);
// const { subcategorie } = useSelector((state) => state.subcategory);


useEffect(() => {
  setProducts(filteredProducts);
}, [filteredProducts]);

useEffect(() => {
  dispatch(sortLowToHighPrice());
}, []);

const handleAddCountFilter = (e) => {
    addCountFilter(e, dispatch, increment, decrement);
  };
  
const handleToggleFilter = () => {
    toggleFilter(filterFull, filterMini, setIsFilterCollapsed);
  };

    return (
        <>
        <Breadcrumb />
        <section>
          <div className="container">
            <div className="products-section">
              <SortFilter products={products} isCollapsed={isFilterCollapsed}/>
              <Filter categories={filterCategories} subcategorieParent={"mouses"} toggle={handleToggleFilter} addCounter={handleAddCountFilter} ref={filterFull} apply={handleToggleFilter} />
              <FilterMini toggle={handleToggleFilter} ref={filterMini} />
              <AllProductItems />
            </div>
          </div>
        </section>
      </>
    );
};

export default Mouses;