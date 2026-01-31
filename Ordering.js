import {menuArray} from "./data.js";

const menuList = document.getElementById("main-menu");

document.addEventListener('click', (e) => {
    if(e.target.dataset.add) {
        console.log(e.target.dataset.add);
    }
})

const menuHTML = menuArray.map( (item) => {
    return `<div class="menu-item">
        <span class="food-icon"
        rol="img"
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
        data-add="${item.id}">+</button>
    </div>`
}).join('');

menuList.innerHTML = menuHTML;
