import productTypes from "../type/getProducts";


export default function fillProducts(data) {
  return {
    type: productTypes.FILL_PRODUCTS,
    payload: data,
  };
}

export function sortProducts(data) {
  return {
    type: productTypes.SORT_PRODUCTS,
    payload: data,
  };
}
