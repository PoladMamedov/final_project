
import { NavLink } from "react-router-dom";
import './style.scss';
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleMenu } from "../../redux/actions/burgerMenu";
import Categories from "../Categories";
// import { fetchCategories } from "../../redux/actions/categories";
const Header = () => {
   const dispatch = useDispatch()
   const { isMenuOpen } = useSelector((state) => state.isMenuOpen)
// const categoriesList = useSelector((state) => state.categories.categories);
  // const categories = useSelector((state) => state.categories.categories);
      // const { isMenuOpen, categories } = useSelector((state) => state);
   const [activePage, setActivePage] = useState(0)
   const pages = ['Products', 'About']

// console.log(categories);

      // useEffect(() => {
      //   dispatch(fetchCategories());
      // }, [dispatch]);
   
   const handleBtnClick = () => {
      dispatch(toggleMenu())
   }
   const handleLinkClick = (index) => {
      setActivePage(index)
      dispatch(toggleMenu())
   }

   return (
     <div>
       <header className="header">
         <div className="header__container">
           <NavLink
             className="header__company-logo"
             to="/"
             onClick={() => handleLinkClick(0)}
           >
             <img src="/img/main-logo.png" alt="" width={150} />
           </NavLink>

           <nav className={`header__nav${isMenuOpen ? "--open" : ""}`}>
             <ul className="header__nav-list">
               <li className="header__nav-item" key={1}>
                 <NavLink
                   className={`header__nav-link${
                     activePage === 0 ? "--active" : ""
                   }`}
                   onClick={() => handleLinkClick(0)}
                   to={"/"}
                 >
                   Home
                 </NavLink>
               </li>
               {pages.map((item, index) => (
                 <li className="header__nav-item" key={index + 1}>
                   <NavLink
                     className={`header__nav-link${
                       activePage === index + 1 ? "--active" : ""
                     }`}
                     onClick={() => handleLinkClick(index + 1)}
                     to={`/${item.toLowerCase()}`}
                   >
                     {item}
                   </NavLink>
                 </li>
               ))}

               <li
                 className="header__nav-item header__nav-item--tablet"
                 key={4}
               >
                 <NavLink
                   to={"/cart"}
                   key={4}
                   className="header__nav-link--cart"
                   onClick={() => handleLinkClick(4)}
                 >
                   <img
                     className="header__nav-cart"
                     src="img/cart-logo.png"
                     alt="cart-logo"
                     width={29}
                     height={32}
                   />
                   <span className="header__nav-cart--count">1</span>

                   {/* В спан записать с редакса количество в корзине */}
                 </NavLink>
               </li>
               <li
                 className="header__nav-item--loginBtn  header__nav-item--tablet"
                 key={5}
               >
                 <NavLink
                   to={"/login"}
                   key={5}
                   className="header__nav-link--loginBtn"
                   onClick={() => handleLinkClick(4)}
                 >
                   Login
                 </NavLink>
               </li>
             </ul>
           </nav>

           <div className="header__nav-btn-wrap">
             <NavLink
               to={"/cart"}
               key={4}
               className="header__nav-link--cart"
               onClick={() => handleLinkClick(4)}
             >
               <img
                 className="header__nav-cart"
                 src="img/cart-logo.png"
                 alt="cart-logo"
                 width={29}
                 height={32}
               />
               <span className="header__nav-cart--count">1</span>

               {/* В спан записать с редакса количество в корзине */}
             </NavLink>
             <NavLink
               to={"/login"}
               key={5}
               className="header__nav-link--loginBtn"
               onClick={() => handleLinkClick(4)}
             >
               Login
             </NavLink>
           </div>

           <button
             onClick={() => handleBtnClick()}
             className={`header__menu-btn${isMenuOpen ? "--active" : ""}`}
             type="button"
           >
             <span className="header__menu-lines"></span>
             <span className="header__menu-lines"></span>
             <span className="header__menu-lines"></span>
           </button>
         </div>
         </header>
         
         <Categories/>
     </div>
   );

}

export default Header



           
{/* <ul>
  {categoriesList.map((category) => (
    <li key={category.id}>
      <NavLink to={`/${category.link}`}>{category.name}</NavLink>
    </li>
  ))}
</ul>; */}