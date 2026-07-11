const shoppingListArray = [
  {
    itemName: "Shoes",
    id: 0,
  },
  {
    itemName: "Shoes",
    id: 1,
  },
  {
    itemName: "Shoes",
    id: 2,
  },
];

const shoppingListContainer = document.querySelector(
  ".js-shopping-list-container",
);
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
    id: Date.now(),
  };
  shoppingListArray.push(newObj);
}

function renderShoppingList() {
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
        alt: "EDIT",
      },
      {
        class: "delete-icon",
        src: "icons/trash.png",
        alt: "TRASH",
      },
    ];
    imgArray.forEach((data) => {
      const img = document.createElement("img");
      img.className = data.class;
      img.src = data.src;
      img.alt = data.alt;
      subContainer.appendChild(img);
    });
    container.appendChild(subContainer);
    shoppingListContainer.appendChild(container);
  });
}

function renderNoItem() {
  const container = document.createElement("div");
  container.className = "no-item-container js-no-item-container";
  const p = document.createElement("p");
  p.className = "no-item-text";
  p.textContent = "There are no items, please add an item";
  container.appendChild(p);

  if (shoppingListArray.length < 1) {
    bodyContainer.appendChild(container);
  }
}
