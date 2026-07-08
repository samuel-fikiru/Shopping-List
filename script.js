const shoppingList = [
    {
        itemName : 'Shopping List',
    },
    {
        itemName : 'Jordan Shoes',
    },{
        itemName : 'Throusar',
    }
];

const shoppingListContainer = document.querySelector('.js-shopping-list-container');

let code = ``;
shoppingList.forEach((item)=>{
    const itemName = item.itemName;
    code += `
    div class="shopping-list-container">
        <input type="checkbox" class="checkbox">
        <p class="things-to-buy">${itemName}</p>
        <div class="icons-container">
            <img class="drag-icon" src="icons/drag.png" alt="">
            <img class="edit-icon" src="icons/edit.png" alt="">
            <img class="delete-icon" src="icons/trash.png" alt="">
        </div>
    </div>
    `
}
)
shoppingListContainer.innerHTML;