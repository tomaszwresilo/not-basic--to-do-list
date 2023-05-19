document.addEventListener("DOMContentLoaded", () => {
  const shoppingList = document.querySelector("ul");
  const shoppingAdButton = document.querySelector("#addToList");
  const shoppingInput = document.querySelector("#nameProductToList");
  const removeList = document.querySelector("#removeList");

  const inputErrorMessage = "Enter something!";
  const listItemSelector = "li";
  const allTaskCounterSelector = "#allTask";
  const activeTaskCounterSelector = "#activeTask";
  const doneTaskCounterSelector = "#doneTask";

  const allTaskCounterElement = document.querySelector(allTaskCounterSelector);
  const activeTaskCounterElement = document.querySelector(
    activeTaskCounterSelector
  );
  const doneTaskCounterElement = document.querySelector(
    doneTaskCounterSelector
  );

  document.onselectstart = function() {
    return false;
  };

  function addElementToList() {
    if (shoppingInput.value === "") {
      alert(inputErrorMessage);
    } else {
      const newLi = document.createElement("li");
      newLi.innerText = shoppingInput.value;
      shoppingList.appendChild(newLi);
      shoppingInput.value = "";
      updateTaskCounters();
    }
  }

  function removeListItems() {
    while (shoppingList.firstChild) {
      shoppingList.removeChild(shoppingList.firstChild);
    }
    updateTaskCounters();
  }

  function markTaskAsDone(event) {
    const target = event.target;
    target.classList.toggle("completed");
    updateTaskCounters();
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
  }

  function clearInput(event) {
    const target = event.target;
    const isOutside =
      !shoppingAdButton.contains(target) &&
      !shoppingInput.contains(target) &&
      !removeList.contains(target);
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

  shoppingAdButton.addEventListener("click", handleAddButtonClick);
  removeList.addEventListener("click", removeListItems);
  shoppingInput.addEventListener("keypress", handleEnterKeyPress);
  shoppingList.addEventListener("click", markTaskAsDone);
  document.addEventListener("click", clearInput);

  updateTaskCounters();
});
