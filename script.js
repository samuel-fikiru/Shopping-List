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
const bodyContainer = document.querySelector(".js-body-container");
const addButton = document.querySelector('.js-add-btn');
const inputBar = document.querySelector('.list-input');


renderNoItem();
renderShoppingList();

addButton.addEventListener('click', ()=>{
  console.log(inputBar.value);
  const newObj = {
    itemName : `${inputBar.value}`
  }

})









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
    console.log(true);
    code = emptyCode;
    bodyContainer.innerHTML = code;
  }
}
