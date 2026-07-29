let shoppingListArray = load() || [];
let dataForFilter = shoppingListArray;

const shoppingListContainer = document.querySelector(".js-shopping-list-container");
const bodyContainer = document.querySelector(".js-body-container");
const addButton = document.querySelector(".js-add-btn");
const inputBar = document.querySelector(".list-input");
const filtersContainer = document.querySelector(".js-filtering-container");
const clearButtonsContainer = document.querySelector(".js-clear-container");
const clearAllBtn = document.querySelector(".js-clear-all-btn");
const noItemMsgContainer = document.querySelector(".js-no-item-container");
const filterButtons = document.querySelectorAll(".js-filter");
const clearBoughtBtn = document.querySelector(".js-clear-bought-btn");

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
    checkStatus: 0,
  };
  shoppingListArray.push(newObj);
  console.log(shoppingListArray);
  save();
  render();
}

function renderShoppingList() {
  hideControlForShoopingList();

  shoppingListContainer.innerHTML = "";
  dataForFilter.forEach((item) => {
    const itemName = item.itemName;
    const container = document.createElement("div");
    container.className = "shopping-row-container";
    container.draggable='true';
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox js-checkbox";
    checkbox.dataset.id = item.id;
    container.appendChild(checkbox);
    const p = document.createElement("p");
    p.className = "things-to-buy js-things-to-buy";
    p.dataset.id = item.id;
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
        class: "edit-icon js-edit-icon",
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
  clearBoughtOnly();
  updateCheckedStatus();
  controlFilters();
  editItem();
}

function render() {
  if (shoppingListArray.length < 1) {
    renderNoItem();
  } else {
    renderShoppingList();
    renderCheck();
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
      dataForFilter = newArray;
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

function updateCheckedStatus() {
  const checkbox = document.querySelectorAll(".js-checkbox");
  checkbox.forEach((box) => {
    box.addEventListener("change", (event) => {
      const clickedBoxId = Number(box.dataset.id);
      if (event.target.checked) {
        shoppingListArray.forEach((item) => {
          if (item.id === clickedBoxId) {
            item.checkStatus = 1;
          }
        });
      } else {
        shoppingListArray.forEach((item) => {
          if (item.id === clickedBoxId) {
            item.checkStatus = 0;
          }
        });
      }
      save();
      renderCheck();
    });
  });
}

function renderCheck() {
  const buyItems = document.querySelectorAll(".js-things-to-buy");
  const checkbox = document.querySelectorAll(".js-checkbox");

  shoppingListArray.forEach((itemObj) => {
    if (itemObj.checkStatus) {
      buyItems.forEach((item) => {
        const itemId = Number(item.dataset.id);
        if (itemId === itemObj.id) {
          item.classList.add("bought");
        }
      });
      checkbox.forEach((box) => {
        const boxId = Number(box.dataset.id);

        if (itemObj.id === boxId && !box.checked) {
          box.checked = true;
        }
      });
    } else {
      buyItems.forEach((item) => {
        const itemId = Number(item.dataset.id);

        if (itemId === itemObj.id) {
          item.classList.remove("bought");
        }
      });
    }
  });
}

function controlFilters() {
  const allFilterBtn = document.querySelector(".js-all-filter");
  allFilterBtn.classList.add("clickedFilter");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      decideFilter(button.innerHTML);

      filterButtons.forEach((button) => {
        button.classList.remove("clickedFilter");
      });
      button.classList.add("clickedFilter");
    });
  });
}

function decideFilter(filter) {
  if (filter === "Bought") {
    dataForFilter = shoppingListArray.filter((item) => {
      return item.checkStatus === 1;
    });
    render();
  } else if (filter === "Not Bought") {
    dataForFilter = shoppingListArray.filter((item) => {
      return item.checkStatus === 0;
    });
    render();
  } else {
    dataForFilter = shoppingListArray;
    render();
  }
}

function clearBoughtOnly() {
  clearBoughtBtn.addEventListener("click", () => {
    shoppingListArray = shoppingListArray.filter((item) => {
      return item.checkStatus === 0;
    });
    dataForFilter = shoppingListArray;
    save();
    render();
  });
}

function editItem() {
  const editIcons = document.querySelectorAll(".js-edit-icon");
  const saveButton = document.querySelector(".js-save-btn");
  editIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      const iconId = Number(icon.dataset.id);
      shoppingListArray.forEach((item) => {
        if (item.id === iconId) {
          inputBar.value = item.itemName;
          inputBar.focus();
          addButton.style.display = "none";
          saveButton.style.display = "flex";

          const itemIndex = Number(icon.dataset.id);
          saveButton.addEventListener("click", () => {
            shoppingListArray[itemIndex].itemName = inputBar.value;
            inputBar.value = "";
            inputBar.focus();
            save();
            dataForFilter = shoppingListArray;
            addButton.style.display = "flex";
            saveButton.style.display = "none";
            render();
          });
        }
      });
    });
  });
}


let dragItem = null;
shoppingListContainer.addEventListener('dragstart', (e)=>{
  dragItem = e.target;
  setTimeout(()=>{
    e.target.classList.add('dragging');
  },0);

  e.dataTransfer.setData("text/plain", "");
  e.dataTransfer.dropeffect='move';
})

shoppingListContainer.addEventListener('dragend', (e)=>{
  dragItem=null;
  e.target.classList.remove('dragging');
})

