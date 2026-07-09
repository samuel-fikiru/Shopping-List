const shoppingListArray = [

];

const shoppingListContainer = document.querySelector(
  ".js-shopping-list-container",
);
const noItemContainer = document.querySelector('.no-item-container');
const bodyContainer = document.querySelector('.js-body-container');

renderShoppingList();
function renderShoppingList(){
let code = ``;
shoppingListArray.forEach((item) => {
  const itemName = item.itemName;
  code += `
    <div class="shopping-row-container">
        <input type="checkbox" class="checkbox">
        <p class="things-to-buy">${itemName}</p>
        <div class="icons-container">
            <img class="drag-icon" src="icons/drag.png" alt="">
            <img class="edit-icon" src="icons/edit.png" alt="">
            <img class="delete-icon" src="icons/trash.png" alt="">
        </div>
    </div>
    `;
});
shoppingListContainer.innerHTML = code;    
}

renderNoItem();
function renderNoItem(){
let ifExists = `
        <div class="filtering-container">
          <button class="filter">All</button>
          <button class="filter">Bought</button>
          <button class="filter">Not Bought</button>
        </div>
        <div class="shopping-list-container js-shopping-list-container"></div>

        <div class="clear-container">
          <button class="clear-all-btn">Clear All</button>
          <button class="clear-completed-btn">Clear Completed</button>
        </div>
 ` ;
const ifEmpty = `
 <div class="no-item-container js-no-item-container">
    <p class="no-item-text">There are no items, please add an item</p>
 </div>
 `
const code = (shoppingListArray.length === 0)? ifEmpty: ifExists;
bodyContainer.innerHTML = code;    
}