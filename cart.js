//cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let Closecart = document.querySelector("#close-cart");

//for open cart
jQuery(document).ready(function(){
    jQuery(".cart").addClass("active");
})
jQuery("#close-cart").ready(function(){
    jQuery(".cart").removeClass("active");
})

//cart working js

if(document.readystate=="loading"){
    document.addEventListener("DOMContentLoaded", ready)
}
else{
    ready()
}

// making function
function ready(){
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    for(var i=0; i<removeCartButtons.lenghth; i++)
    {
var button = removeCartButtons[i];
button.addEventListener("click", removeCartItem);
    }
    // quantity changes
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for(var u=0; i<quantityInputs.length; i++)
    {
        var input = quantityInputs[i];
        button.addEventListener("click", quantityChanged);
    }
     // add to cart
     var addcart = document.getElementsByClassName("add-cart");
     for(var u=0; i<quantityInputs.length; i++)
     {
         var input = addcart[i];
         button.addEventListener("click", addCartClicked);
     }
     document
     .getElementsByClassName("btn-buy")[0]
     .addEventListener("click", buyButtonClicked);

    }

    // buy button
    function buyButtonClicked(){
        alert("your order is placed");
        var cartContent = document.getElementsByClassName("cart-content")[0];
        while(cartContent.hasChildNodes()){
            cartContent.removeChild(cartContent.firstChild);

        }
        updatetotal();
    }
    //remove item from cart
    function removeCartItem(event){
        var buyButtonClicked = event.remove();
        buttonClicked.parentElement.remove();
        updatetotal();
}
//quantity changes
function quantityChanged(event){
    var input=event.target;
    if(isNaN(input.value)|| input.value<=0)
    {
        input.value=1;
    }
    updatetotal();
}

// add to cart
function addCartClicked(event){
    var button = event.target;
    var shopProducts = buttonparentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg= shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title,price,productImg);
    updatetotal();
}
function addProductToCart(title, price, productImg){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = Document.getElementsByClassName("cart-content")[0];
    var cartItemNames = cartItems.getElementsByClassName("cart-product-title");
    for(var i=0; i<cartItemNames.lenghth; i++)
    {
        if(cartItemNames[i].innerText==title)
        {
            alert("you already added the item to cart. Increase your product quantity")
            return
        }
    }
    var cartBoxContent =  `<img src="${productImg}" class="cart-img">
                                <div class="detail-box">
                                <div class="cart-product-title">${title}</div>
                                <div class="cart-price">${price}</div>
                                <input type="number" value="1" class="cart-quantity">
                                </div>
                                <!--- remove product from cart-->
                                <i class="fa-solid fa-trash cart-remove"></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    updatetotal();
    cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
    cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", removeCartItem);
    cartShopBox
    .getElementsByClassName("cart-price")[0]
    .addEventListener("price", removeCartItem);
}

//update total
function updatetotal(){
    var cartContent=document.getElementsByClassName("cart-content")[0];
    var cartBoxes=document.getElementsByClassName("cart-box")[0];
    var total=0;
    for(var i =0; i<cartBoxes.length; i++)
    {
        var cartBox = cartBoxes[i];
        var priceElement = ccartBox.getElementsByClassName("cart-price")[0];
        var quantitylement = ccartBox.getElementsByClassName("cart-price")[0];
        var price = parseFloat(priceElement.innerText.replace("Rs ", ""));
        var quantity = quantitylement.value;
        total=total+price*quantity;
    }
    // if price contains some cents value
    total=Math.round(total*100)/100;
    document.getElementsByClassName("total-price")[0].innerText="$" + total;
}