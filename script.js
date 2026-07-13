let shoppingListArray = load() || [];

const shoppingListContainer = document.querySelector(".js-shopping-list-container");
const bodyContainer = document.querySelector(".js-body-container");
const addButton = document.querySelector(".js-add-btn");
const inputBar = document.querySelector(".list-input");
const filtersContainer = document.querySelector(".js-filtering-container");
const clearButtonsContainer = document.querySelector(".js-clear-container");
const clearAllBtn = document.querySelector(".clear-all-btn");
const noItemMsgContainer = document.querySelector(".js-no-item-container");

render();

inputBar.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addItem();
    inputBar.value = "";
  }
});
addButton.addEventListener("click", () => {
  addItem();
  inputBar.value = "";
});

clearAllBtn.addEventListener("click", () => {
  formatAll();
  save();
  render();
});

function addItem() {
  const newObj = {
    itemName: `${inputBar.value}`,
    id: shoppingListArray.length,
  };
  shoppingListArray.push(newObj);
  console.log(shoppingListArray);
  save();
  render();
}

function renderShoppingList() {
  hideControlForShoopingList();

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

function render() {
  if (shoppingListArray.length < 1) {
    renderNoItem();
  } else if (shoppingListArray.length > 0) {
    renderShoppingList();
  }
}

function renderNoItem() {
  hideControlForNoItem();

  noItemMsgContainer.innerHTML = "";
  const p = document.createElement("p");
  p.className = "no-item-text";
  p.textContent = "There are no items, please add an item";
  noItemMsgContainer.appendChild(p);
}

deleteItem();
function deleteItem() {
  const deleteButton = document.querySelectorAll(".delete-icon");

  deleteButton.forEach((button) => {
    button.addEventListener("click", () => {
      const buttonId = Number(button.dataset.id);

      const newArray = shoppingListArray.filter((item) => {
        return item.id != buttonId;
      });

      shoppingListArray = newArray;
      save();
      render();
    });
  });
}

function save() {
  localStorage.setItem("shoppingListArray", JSON.stringify(shoppingListArray));
}

function load() {
  const data = localStorage.getItem("shoppingListArray");
  return JSON.parse(data);
}

function formatAll() {
  shoppingListArray.length = 0;
}

function hideControlForNoItem() {
  noItemMsgContainer.style.display = "flex";
  filtersContainer.style.display = "none";
  clearButtonsContainer.style.display = "none";
  shoppingListContainer.style.display = "none";
}

function hideControlForShoopingList() {
  filtersContainer.style.display = "block";
  shoppingListContainer.style.display = "flex";
  clearButtonsContainer.style.display = "block";
  noItemMsgContainer.style.display = "none";
}
