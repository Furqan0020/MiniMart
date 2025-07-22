import {
  Minicart,
  updateMiniCartQuantity,
  removeFromCart,
  savaToLocalStorage,
} from "./data/cart.js";
import { productDiscount } from "./utils/moneyCalculations.js";
updateMiniCartQuantity();
let totalBill = 0;
let checkoutHTML = "";
Minicart.forEach((cartItems) => {
  let { productId, quantity } = cartItems;

  let getproducts = async () => {
    try {
      let response = await fetch(`https://dummyjson.com/products/${productId}`); //fetch all the product of the cart
      let productData;
      if (response.ok) {
        productData = await response.json();
      }

      // console.log(productData);
      checkoutHTML += `
        <div class="cart-item cart-item-container-id-${productData.id}" >
          <img src="${productData.thumbnail}" alt="" />
          <div class="item-info">
            <h2>${productData.title}</h2>
            <p><strong>Category:</strong> ${productData.category}</p>
            <p>
              <strong>Description:</strong> ${productData.description}
            </p>
            <p><strong>Stock:</strong> ${productData.availabilityStatus}</p>
          </div>
          <div class="item-controls">
            <div class="quantity">
              <button class='js-minus-icon' data-product-id = '${productData.id}'>-</button>
              <input type="text" value="${quantity}" id='js-quantity-${productData.id}'/>
              <button class='js-plus-icon ' data-product-id = '${productData.id}'>+</button>
            </div>
            <div class="price">$${productData.price}</div>
            <div class="remove" data-product-id = "${productData.id}">×</div>
          </div>
        </div>
      `;
      // console.log(checkoutHTML);
      document.querySelector(".cartCheckout").innerHTML = checkoutHTML;

      //make remove button interactive
      document.querySelectorAll(".remove").forEach((button) => {
        button.addEventListener("click", () => {
          let productId = button.dataset.productId;
          // console.log(productId);
          // console.log("orignal arr", Minicart);

          removeFromCart(productId);
          updateMiniCartQuantity();
          savaToLocalStorage();
          renderOrderSummerySection();
        });
      });
      // js for plus icon increase product quantity
      document.querySelectorAll(".js-plus-icon").forEach((icon) => {
        icon.addEventListener("click", () => {
          let productId = icon.dataset.productId;
          let selectedProduct = Minicart.filter(
            (item) => item.productId === productId
          );
          selectedProduct[0].quantity += 1;
          // console.log(selectedProduct);
          document.querySelector(`#js-quantity-${productId}`).value =
            selectedProduct[0].quantity;
          savaToLocalStorage();
          updateMiniCartQuantity();
          renderOrderSummerySection();
        });
      });
      // js for minus icon decrease product quantity
      document.querySelectorAll(".js-minus-icon").forEach((icon) => {
        icon.addEventListener("click", () => {
          let productId = icon.dataset.productId;
          let selectedProduct = Minicart.filter(
            (item) => item.productId === productId
          );
          selectedProduct[0].quantity -= 1;
          // console.log(selectedProduct);
          document.querySelector(`#js-quantity-${productId}`).value =
            selectedProduct[0].quantity;
          //if the product quantiy less than 1 it should remove form UI
          selectedProduct[0].quantity ? "" : removeFromCart(productId);
          savaToLocalStorage();
          updateMiniCartQuantity();
          renderOrderSummerySection();
        });
      });

      function renderOrderSummerySection() {
        //console.log("render order");
        //console.log(productData);

        const price = productData.price;
        const discount = productData.discountPercentage;
        const discountedPrice = productDiscount(price, discount);
        //console.log("discounted price", discountedPrice);
        const totalItemsQuantity = Minicart.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        //console.log("total item quantity", totalItemsQuantity);
        //console.log(totalItemsQuantity * discountedPrice);
        totalBill += totalItemsQuantity * discountedPrice;
        //console.log("total bill", totalBill);
        document.querySelector(".subtotal").innerHTML = `$${totalBill}`;
        document.querySelector(
          ".total"
        ).innerHTML = `<span>Total:</span><span class="total">$${totalBill}</span>`;
      }
      renderOrderSummerySection();
    } catch (error) {
      console.log(`Error : ${error}`);
    }
  };

  getproducts();
});
