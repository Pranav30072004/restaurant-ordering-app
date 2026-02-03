import {menuArray} from "./data.js";

const menuList = document.getElementById("main-menu");
const cartDisplay = document.getElementById('item-container');
const totalCartPrice = document.getElementById('total-price');
const orderBtn = document.getElementById('order-btn');

document.addEventListener('click', (e) => {
    if (e.target.dataset.add) {
        document.getElementById('cart').style.display = 'flex';
        handleAddClick(e.target.dataset.add);
    }
    if(e.target.dataset.remove) {
        removeFromCart(e);
    }
})
let foodObjects = [];

function handleAddClick(foodId) {
    foodObjects.push(menuArray.find( (foodObject) => {
      return foodObject.id === Number(foodId);
    }) )

    cartDisplay.innerHTML = renderCart();

}

function renderCart() {
    let cartHTML = ``
    foodObjects.forEach( (foodObject, index) => {
        cartHTML += `
        <div class="cart-item" data-index = ${index}>
            <div class="cart-text">
                <p>${foodObject.name}</p>
                <p role="button" 
                class="remove-btn"
                
                data-remove=${foodObject.id}>remove</p>
            </div>
            <p class="cart-price">$${foodObject.price}</p>
        </div>
        `
    })
    totalCartPrice.innerText = `$${getTotalPrice()}`;
    return cartHTML


}

function removeFromCart(e) {
    const removeBtn = e.target.closest('.remove-btn');
    foodObjects.splice(Number(removeBtn.closest('.cart-item').dataset.index), 1);

    cartDisplay.innerHTML = renderCart();

}

function getTotalPrice() {
    const totalPrice = foodObjects.reduce((total, itemPrice) => {
        return total + itemPrice.price;
    }, 0)
    return totalPrice;
}


const menuHTML = menuArray.map( (item) => {
    return `<div class="menu-item">
        <span class="food-icon"
        role="img"
        aria-hidden="true">
        ${item.emoji}
        </span>
        
        <div class="menu-details">
            <h4 class="food-name">${item.name}</h4>
            <p class="ingredients">${item.ingredients.join(', ')}</p>
            <p class="price">$${item.price}</p>
        </div>
        <button class="add-item-btn" 
        aria-label="add menu item to cart"
        data-add=${item.id}>+</button>
    </div>`
}).join('');

menuList.innerHTML = menuHTML;
