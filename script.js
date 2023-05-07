burger = document.querySelector('.burger');
navbar = document.querySelector('.navbar');
navlist = document.querySelector('.navlist');




burger.addEventListener('click', () => {
    navlist.classList.toggle('v-class-resp');
    navbar.classList.toggle('h-nav-resp');
})



//scrool - up

const heroSection = document.querySelector(".navbar");
const scrollElement = document.querySelector(".scrollup");

const scrollTop = () => {
    heroSection.scrollIntoView({ behavior: "smooth" });
};

scrollElement.addEventListener("click", scrollTop);

//login
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.popup');
const iconClose = document.querySelector('.icon-close');

loginLink.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
})

iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
})

//cart

//open and close

const open = document.querySelector('#cart');
const close = document.querySelector('#cart-close')
const cart = document.querySelector('.cart');

open.addEventListener("click", () => {
    cart.classList.add("active");
})

close.addEventListener("click", () => {
    cart.classList.remove("active");
})

//start
if (document.readyState == "loading") {
    document.addEventListener('DOMContentLoaded', start);
} else {
    start();
}

//START

function start() {
    addEvents();
}

//UPDATE AND RERENDER
function update() {
    addEvents();
    updateTotal();
}

//ADD EVENTS
function addEvents() {
    //remove items from cart
    let cartRemove_btns = document.querySelectorAll('.cart-remove');
    console.log(cartRemove_btns);
    cartRemove_btns.forEach((btn) => {
        btn.addEventListener("click", handle_removeCartItem);
    });

    //change item qunatity
    let cartQuantity_inputs = document.querySelectorAll('.cart-quantity');
    cartQuantity_inputs.forEach(input => {
        input.addEventListener("change", handle_changeItemQuantity);
    })

    //add item to cart
    let addCart_btns = document.querySelectorAll(".add-cart")
    addCart_btns.forEach(btn => {
        btn.addEventListener("click", handle_addCartItem);
    })
}

//HANDLE EVENTS FUNCTIONS

function handle_addCartItem() {
    let product = this.parentElement;
    let title = product.querySelector(".title").innerHTML;
    let price = product.querySelector(".price").innerHTML;
    let imgSrc = product.querySelector(".image").src;
    console.log(title, price, imgSrc);
}

let newToAdd = {
    title,
    price,
    imgSrc,
};

//add product to cart
let cartBoxElement = cartBoxComponent(title, price, imgSrc);
let newNode = document.createElement("div");
newNode.innerHTML = cartBoxElement;
const cartContent = cart.querySelector('.cart-content')
cartContent = appendChild(newNode);
update();


function handle_removeCartItem() {
    this.parentElement.remove();

    update();
}


function handle_changeItemQuantity() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    this.value = Math.floor(this.value) //to keep it iteger
    update();

}
//UPDATE AND RERENDER FUNCTION

function updateTotal() {
    let cartBoxes = document.querySelectorAll(".cart-box");
    const totalElement = cart.querySelector(".total-price");
    let total = 0;

    cartBoxes.forEach((cartBox) => {
        let priceElement = cartBox.querySelector(".cart-price");
        let price = parseFloat(priceElement.innerHTML.replace("$", ""));
        let quantity = cartBox.querySelector(".cart-quantity").value;
        total += price * quantity;
    });
    //keep 2 digits after the decimal point
    total = total.toFixed(2);
    totalElement.innerHTML = "$" + total;
}

//HTML COMPNENTS
function cartBoxComponent(title, price, imgSrc) {
    return ` <div class="cart-box">
<img src=${imgSrc} alt="" class="cart-img">
<div class="detail-box">
    <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price}</div>
    <input type="number" value="1" class="cart-quantity">
</div>
<i class="uil uil-trash  cart-remove"></i>
</div>`
}