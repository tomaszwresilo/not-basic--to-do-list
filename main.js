document.addEventListener("DOMContentLoaded", () => {
  const shoppingList = document.querySelector("ul");
  const shoppingAddButton = document.querySelector("#addToList");
  const shoppingInput = document.querySelector("#nameProductToList");
  const removeListButton = document.querySelector("#removeList");
  const allTaskLink = document.querySelector("#allTask");
  const activeTaskLink = document.querySelector("#activeTask");
  const doneTaskLink = document.querySelector("#doneTask");

  const inputErrorMessage = "Enter something!";
  const listItemSelector = "li";
  const allTaskCounterElement = document.querySelector("#allTaskCounter");
  const activeTaskCounterElement = document.querySelector("#activeTaskCounter");
  const doneTaskCounterElement = document.querySelector("#doneTaskCounter");

  document.onselectstart = function() {
    return false;
  };

  let taskFilter = "all";

  function addElementToList() {
    if (shoppingInput.value === "") {
      alert(inputErrorMessage);
    } else {
      const newLi = document.createElement("li");
      newLi.innerText = shoppingInput.value;
      shoppingList.appendChild(newLi);
      createRemoveButtonElement(newLi);
      shoppingInput.value = "";

      updateTaskCounters();
    }
  }

  function createRemoveButtonElement(listItem) {
    const removeButton = document.createElement("button");
    removeButton.innerHTML = "❌";
    removeButton.classList.add("remove-button");
    listItem.appendChild(removeButton);
    removeButton.addEventListener("click", removeItem);
  }

  function removeItem(event) {
    const listItem = event.target.parentElement;
    listItem.remove();
    updateTaskCounters();
  }

  function removeListItems() {
    while (shoppingList.firstChild) {
      shoppingList.firstChild.remove();
    }
    updateTaskCounters();
  }

  function markTaskAsDone(event) {
    const listItem = event.target;
    if (listItem.tagName === "LI") {
      listItem.classList.toggle("completed");
      updateTaskCounters();
    }
  }

  function updateTaskCounters() {
    const taskItems = shoppingList.querySelectorAll(listItemSelector);
    const allTaskCounter = taskItems.length;
    let doneTaskCounter = 0;

    taskItems.forEach(item => {
      if (item.classList.contains("completed")) {
        doneTaskCounter++;
      }
    });

    const activeTaskCounter = allTaskCounter - doneTaskCounter;

    allTaskCounterElement.innerText = allTaskCounter;
    activeTaskCounterElement.innerText = activeTaskCounter;
    doneTaskCounterElement.innerText = doneTaskCounter;

    taskItems.forEach(item => {
      if (taskFilter === "all") {
        item.style.display = "block";
      } else if (taskFilter === "active") {
        if (item.classList.contains("completed")) {
          item.style.display = "none";
        } else {
          item.style.display = "block";
        }
      } else if (taskFilter === "done") {
        if (item.classList.contains("completed")) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      }
    });
  }

  function clearInput(event) {
    const target = event.target;
    const isOutside =
      !shoppingAddButton.contains(target) &&
      !shoppingInput.contains(target) &&
      !removeListButton.contains(target);
    if (isOutside && shoppingInput.value !== "") {
      shoppingInput.value = "";
    }
  }

  function handleAddButtonClick(event) {
    event.preventDefault();
    addElementToList();
  }

  function handleEnterKeyPress(event) {
    if (event.key === "Enter") {
      addElementToList();
    }
  }

  function handleTaskFilterClick(event) {
    const target = event.target;
    if (target === allTaskLink) {
      taskFilter = "all";
    } else if (target === activeTaskLink) {
      taskFilter = "active";
    } else if (target === doneTaskLink) {
      taskFilter = "done";
    }

    const taskFilterLinks = document.querySelectorAll(".task-filter");
    taskFilterLinks.forEach(link => {
      if (link === target) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    updateTaskCounters();
  }

  shoppingAddButton.addEventListener("click", handleAddButtonClick);
  removeListButton.addEventListener("click", removeListItems);
  document.addEventListener("click", clearInput);
  shoppingInput.addEventListener("keypress", handleEnterKeyPress);
  shoppingList.addEventListener("click", markTaskAsDone);

  allTaskLink.addEventListener("click", handleTaskFilterClick);
  activeTaskLink.addEventListener("click", handleTaskFilterClick);
  doneTaskLink.addEventListener("click", handleTaskFilterClick);

  updateTaskCounters();
});
