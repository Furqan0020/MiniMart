import { productDiscount } from "./utils/moneyCalculations.js";
import {
  Minicart,
  savaToLocalStorage,
  updateMiniCartQuantity,
} from "./data/cart.js";
updateMiniCartQuantity();
let displayProducts = document.querySelector("main");
// we use dummyJson to get products
let productHTML = ""; //this will contain all the prducts html inside foreach loop
let getProducts = async () => {
  try {
    let response = await fetch("https://dummyjson.com/products");
    if (!response.ok) {
      throw new Error("network response was not ok......");
    }
    let data = await response.json(); // return the hole object
    //console.log(data);
    let products = data.products;
    // console.log(products);
    products.forEach((product) => {
      return (productHTML += `
        <div class="prodcutContainer">
          
          <div class="productGallery">
            
            <div class="productCard">
              <div class="image">
                <img
                  src='${product.thumbnail}'
                  alt=""
                />
              </div>
              <div class="name">${product.title}</div>
              <div class="price">
              <span class="actualPrice">$${product.price}</span>
                <span class="discountPrice">$${productDiscount(
                  product.price,
                  product.discountPercentage
                )}</span>
              </div>
              <button class="jsAddToCart" data-product-id = "${
                product.id
              }">Add to cart</button>
            </div>
            
          </div>
        </div>
      `);
    });
    displayProducts.innerHTML = productHTML;
    //update cart code
    document.querySelectorAll(".jsAddToCart").forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.dataset.productId;
        let matchingItem;
        Minicart.forEach((cartItem) => {
          if (cartItem.productId == productId) {
            matchingItem = cartItem;
          }
        });
        // console.log(matchingItem);
        if (matchingItem) {
          matchingItem.quantity += 1;
        } else {
          Minicart.push({
            productId: productId,
            quantity: 1,
          });
        }
        //console.log(Minicart);
        //  update cart quantity code

        updateMiniCartQuantity();
        savaToLocalStorage();
      });
    });
  } catch (error) {
    console.log(`Error : ${error}`);
  }
};

getProducts();
