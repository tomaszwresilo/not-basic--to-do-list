document.addEventListener("DOMContentLoaded", () => {
  const shoppingList = document.querySelector("ul");
  const shoppingAdButton = document.querySelector("#addToList");
  const shoppingInput = document.querySelector("#nameProductToList");
  const removeList = document.querySelector("#removeList");

  document.onselectstart = function() {
    return false;
  };

  function addElementToList() {
    if (shoppingInput.value === "") {
      alert("Enter something!");
    } else {
      const newLi = document.createElement("li");
      newLi.innerText = shoppingInput.value;
      shoppingList.appendChild(newLi);
      shoppingInput.value = "";
    }
  }

  function removeListItems() {
    while (shoppingList.firstChild) {
      shoppingList.removeChild(shoppingList.firstChild);
    }
    updateTaskCounters();
  }

  function toggleTask(event) {
    const target = event.target;
    if (target.style.textDecoration === "line-through") {
      target.style.textDecoration = "";
      doneTaskCounter--;
    } else {
      target.style.textDecoration = "line-through";
      doneTaskCounter++;
    }
    updateTaskCounters();
  }

  function updateTaskCounters() {
    let listItems = shoppingList.querySelectorAll("li");
    allTaskCounter = listItems.length;
    activeTaskCounter = allTaskCounter - doneTaskCounter;
    document.querySelector("#allTask").innerText = allTaskCounter;
    document.querySelector("#activeTask").innerText = activeTaskCounter;
    document.querySelector("#doneTask").innerText = doneTaskCounter;
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
    activeTaskCounter = 0;
    doneTaskCounter = 0;
    allTaskCounter = 0;
    event.preventDefault();
    addElementToList();
    updateTaskCounters();
  }

  function handleEnterKeyPress(event) {
    if (event.key === "Enter") {
      addElementToList();
      updateTaskCounters();
    }
  }

  shoppingAdButton.addEventListener("click", handleAddButtonClick);
  removeList.addEventListener("click", removeListItems);
  shoppingInput.addEventListener("keypress", handleEnterKeyPress);
  shoppingList.addEventListener("click", toggleTask);
  document.addEventListener("click", clearInput);

  let activeTaskCounter = 0;
  let doneTaskCounter = 0;
  let allTaskCounter = 0;
});
