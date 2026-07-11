let shoppingListArray = [
  {
    itemName: "Shoes",
    id: 0,
  },
  {
    itemName: "trouser",
    id: 1,
  },
  {
    itemName: "pen",
    id: 2,
  },
];

const shoppingListContainer = document.querySelector(".js-shopping-list-container");
const noItemContainer = document.querySelector(".no-item-container");
const bodyContainer = document.querySelector(".js-body-container");
const addButton = document.querySelector(".js-add-btn");
const inputBar = document.querySelector(".list-input");

renderNoItem();
renderShoppingList();

inputBar.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addItem();
    renderShoppingList();
    inputBar.value = "";
  }
});
addButton.addEventListener("click", () => {
  addItem();
  renderShoppingList();
  inputBar.value = "";
});

function addItem() {
  const newObj = {
    itemName: `${inputBar.value}`,
    id: shoppingListArray.length,
  };
  shoppingListArray.push(newObj);
}

function renderShoppingList() {
  shoppingListContainer.innerHTML = "";
  shoppingListArray.forEach((item) => {
    const itemName = item.itemName;
    const container = document.createElement("div");
    container.className = "shopping-row-container";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.className = "checkbox";
    container.appendChild(input);
    const p = document.createElement("p");
    p.className = "things-to-buy";
    p.textContent = itemName;
    container.appendChild(p);
    const subContainer = document.createElement("div");
    subContainer.className = "icons-container";
    imgArray = [
      {
        class: "drag-icon",
        src: "icons/drag.png",
        alt: "Drag",
      },
      {
        class: "edit-icon",
        src: "icons/edit.png",
        alt: "Edit",
      },
      {
        class: "delete-icon",
        src: "icons/trash.png",
        alt: "Trash",
      },
    ];
    imgArray.forEach((data) => {
      const img = document.createElement("img");
      img.className = data.class;
      img.src = data.src;
      img.alt = data.alt;
      img.dataset.id = item.id;
      subContainer.appendChild(img);
    });
    container.appendChild(subContainer);
    shoppingListContainer.appendChild(container);
  });
  deleteItem();
}

function renderNoItem() {
  const container = document.createElement("div");
  container.className = "no-item-container js-no-item-container";
  const p = document.createElement("p");
  p.className = "no-item-text";
  p.textContent = "There are no items, please add an item";
  container.appendChild(p);

  if (shoppingListArray.length < 1) {
    bodyContainer.innerHTML = "";
    bodyContainer.appendChild(container);
  }
}

deleteItem();
function deleteItem() {
  renderNoItem();
  const deleteButton = document.querySelectorAll(".delete-icon");

  deleteButton.forEach((button) => {
    button.addEventListener("click", () => {
      const buttonId = Number(button.dataset.id);

      const newArray = shoppingListArray.filter((item) => {
        return item.id != buttonId;
      });

      shoppingListArray = newArray;
      renderShoppingList();
    });
  });
}
