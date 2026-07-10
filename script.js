const shoppingListArray = [
  {
    itemName: "Shoes",
  },
  {
    itemName: "Shoes",
  },
  {
    itemName: "Shoes",
  },
];

const shoppingListContainer = document.querySelector(
  ".js-shopping-list-container",
);
const noItemContainer = document.querySelector(".no-item-container");
let bodyContainer = document.querySelector(".js-body-container");


renderNoItem();
renderShoppingList();
function renderShoppingList() {
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

function renderNoItem() {
  const emptyCode = `
    <div class="no-item-container js-no-item-container">
        <p class="no-item-text">There are no items, please add an item</p>
    </div>
 `;
  let code = ``;
  if (shoppingListArray.length < 1) {
    console.log(true)
    code = emptyCode;
    bodyContainer.innerHTML = code;
  } 
  
}
