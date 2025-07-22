export let Minicart = JSON.parse(localStorage.getItem("MiniCart")) || [];
// if (!Minicart) {
//   [
//     {
//       productId: "1",
//       quantity: 4,
//     },
//     {
//       productId: "5",
//       quantity: 10,
//     },
//   ];
// }
export function updateMiniCartQuantity() {
  let totalQuantity = Minicart.reduce(
    (acc, MiniCart) => acc + MiniCart.quantity,
    0
  );
  document.querySelector(".cartQuantity").innerHTML = totalQuantity;
}
export function removeFromCart(productId) {
  let newArr = Minicart.filter((items) => items.productId !== productId);

  // console.log("filtered array", newArr);

  //console.log(Minicart);
  Minicart.splice(0, Minicart.length, ...newArr);
  // update the UI
  let container = document.querySelector(
    `.cart-item-container-id-${productId}`
  );
  container.remove();
}
export function savaToLocalStorage() {
  return localStorage.setItem("MiniCart", JSON.stringify(Minicart));
}
