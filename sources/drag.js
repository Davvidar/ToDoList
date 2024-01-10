const sortableList = document.querySelector(".sortable-list");
const items = sortableList.querySelectorAll(".item");

items.forEach(item => {
  item.addEventListener("dragstart", () => {
    // Adding dragging class to an item after a delay
    setTimeout(() => item.classList.add("dragging"), 0);
  });
  // Removing dragging class from the item on the dragend event
  item.addEventListener("dragend", () => item.classList.remove("dragging"));
  localStorage.setItem('ToDo', JSON.stringify(listArray));
});

const initSortableList = (e) => {
  e.preventDefault();
  const draggingItem = document.querySelector(".dragging");
  // Getting all items except currently dragging and making an array of them
  let siblings = [...sortableList.querySelectorAll(".item:not(.dragging)")];

  // Finding the sibling after which the dragging item should be placed
  let nextSibling = siblings.find(sibling => {
    return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
  });

  // Inserting the dragging item before the found sibling
  sortableList.insertBefore(draggingItem, nextSibling);
  localStorage.setItem('ToDo', JSON.stringify(listArray));
}

sortableList.addEventListener("dragover", initSortableList);
sortableList.addEventListener("dragenter", e => e.preventDefault());

