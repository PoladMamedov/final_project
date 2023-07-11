export default function useServer() {
  const url = "https://final-project-backend-phi.vercel.app/api";

  //* User registration/login
  async function registerUser(newUserData) {
    const savedCustomer = await fetch(`${url}/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserData),
    })
      .then((res) => res.json())
      .catch((err) => err);
    return savedCustomer;
  }

  async function loginUser(userData) {
    const loginResult = await fetch(`${url}/customers/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .catch((err) => err);
    return loginResult;
  }

  async function getUser(token) {
    const user = await fetch(`${url}/customers/customer`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .catch((err) => err);
    return user;
  }

  //* User data and password changing
  async function updateUserData(userData, token) {
    const updateResult = await fetch(`${url}/customers`, {
      method: "PUT",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .catch((err) => err);
    return updateResult;
  }

  async function changeUserPassword(passwords, token) {
    const updateResult = await fetch(`${url}/customers/password`, {
      method: "PUT",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passwords),
    })
      .then((res) => res.json())
      .catch((err) => err);
    return updateResult;
  }

  //* Getting all categories
  async function getCategories() {
    const categories = await fetch(`${url}/catalog`)
      .then((res) => res.json())
      .catch((err) => err);
    return categories;
  }

  async function getPartners() {
    const categories = await fetch(`${url}/partners`)
      .then((res) => res.json())
      .catch((err) => err);
    return categories;
  }

  //* Getting products
  async function getAllProducts() {
    const products = await fetch(`${url}/products`)
      .then((res) => res.json())
      .catch((err) => err);
    return products;
  }
  async function getProduct(itemNo) {
    const product = await fetch(`${url}/products/${itemNo}`)
      .then((res) => res.json())
      .catch((err) => err);
    return product;
  }

  //* Getting slides
  async function getSlides() {
    const slides = await fetch(`${url}/slides`)
      .then((res) => res.json())
      .catch((err) => err);
    return slides;
  }

  //* Get filters
  async function getFilters() {
    const filters = await fetch(`${url}/filters`)
      .then((res) => res.json())
      .catch((err) => err);
    return filters;
  }
  // Get filters categories
  async function getFiltersCategories(categories, sort) {
    const filteredProducts = await fetch(`${url}/products/filter?categories=${categories.join(
      ","
    )}&sort=${sort}currentPrice`)
      .then((res) => res.json())
      .catch((err) => err);
    return filteredProducts;
  }

  // Get filters categories+price
  async function getFiltersCategoriesPrices(categories, min, max, sort) {
    const filteredProducts = await fetch(`${url}/products/filter?categories=${categories.join(
      ","
    )}&minPrice=${min}&maxPrice=${max}&sort=${sort}currentPrice`)
      .then((res) => res.json())
      .catch((err) => err);
    return filteredProducts;
  }

  // Get filters prices
  async function getFiltersPrices(min, max, sort) {
    const filteredProducts = await fetch(`${url}/products/filter?minPrice=${min}&maxPrice=${max}&sort=${sort}currentPrice`)
      .then((res) => res.json())
      .catch((err) => err);
    return filteredProducts;
  }

  // Get filtered products by input
  async function getSearchedProducts(searchPhrases) {
    const searchResult = await fetch(`${url}/products/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchPhrases),
    })
      .then((res) => res.json())
      .catch((err) => err);
    return searchResult;
  }

  // Get products and added into favorites
  async function addToFavorites({ itemNo, token}) {
    const user = await getUser(token);
    const {customerId} = user;
    const response = await fetch(`${url}/wishlist`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerId,
        products: [itemNo],
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to add product to favorites");
    }
    console.log(`Added ${itemNo} to favorite`);
  }

  return {
    registerUser,
    loginUser,
    getUser,
    updateUserData,
    changeUserPassword,
    getCategories,
    getPartners,
    getAllProducts,
    getProduct,
    getSlides,
    getFilters,
    getFiltersCategories,
    getFiltersCategoriesPrices,
    getFiltersPrices,
    getSearchedProducts,
    addToFavorites,
  };
}
