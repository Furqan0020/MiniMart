let displayProducts = document.querySelector("main");
// we use dummyJson to get products
let productHTML = ""; //this will contain all the prducts html inside foreach loop
let getProducts = async () => {
  try {
    let response = await fetch("https://dummyjson.com/products");
    if (!response.ok) {
      throw new Error("network response was not ok......");
    }
    let data = await response.json();  // return the hole object 
    console.log(data);
    let products = data.products
    console.log(products)
    products.forEach((product) => {
      
      return productHTML += `
        <div class="prodcutContainer">
          
          <div class="productGallery">
            <a href="cart.html">
              <div class="productCard">
                <div class="image">
                  <img
                    src='${product.thumbnail}'
                    alt=""
                  />
                </div>
                <div class="name">${product.title}</div>
                <div class="price">
                  <span class="discountPrice">$${product.discountPercentage}</span>
                  <span class="actualPrice">$${product.price}</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      `;
      
    });
    displayProducts.innerHTML=productHTML
  } catch (error) {
    console.log(`Error : ${error}`)
  }
};
getProducts();




