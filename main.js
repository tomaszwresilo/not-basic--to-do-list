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
      const taskName = document.createElement("span");
      taskName.classList.add("task-name");
      taskName.textContent = shoppingInput.value;
      const removeButton = document.createElement("button");
      removeButton.classList.add("remove-button");
      removeButton.innerHTML = " ❌";
      newLi.appendChild(taskName);
      newLi.appendChild(removeButton);
      shoppingList.appendChild(newLi);
      shoppingInput.value = "";

      createRemoveButtonElement(newLi);
      createEditButtonElement(newLi);
      updateTaskCounters();
    }
  }

  function createRemoveButtonElement(listItem) {
    const removeButton = listItem.querySelector(".remove-button");
    removeButton.addEventListener("click", removeItem);
  }

  function createEditButtonElement(listItem) {
    const editButton = document.createElement("button");
    editButton.innerHTML = "🖊️";
    editButton.classList.add("edit-button");
    listItem.appendChild(editButton);
    editButton.addEventListener("click", editItem);
  }

  function removeItem(event) {
    const listItem = event.target.parentElement;
    listItem.remove();
    updateTaskCounters();
  }

  function editItem(event) {
    const listItem = event.target.parentElement;
    const taskName = listItem.querySelector(".task-name");
    const taskNameText = taskName.innerText;

    const input = document.createElement("input");
    input.value = taskNameText;
    input.classList.add("edit-input");

    listItem.replaceChild(input, taskName);

    input.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        const updatedTaskName = input.value.trim();
        if (updatedTaskName !== "") {
          const newTaskName = document.createElement("span");
          newTaskName.innerText = updatedTaskName;
          newTaskName.classList.add("task-name");

          listItem.replaceChild(newTaskName, input);
        }
      }
    });

    input.focus();
  }

  function toggleTaskStatus(listItem) {
    listItem.classList.toggle("completed");
    const taskName = listItem.querySelector("span.task-name");
    taskName.classList.toggle("completed");

    updateTaskCounters();
  }

  function markTaskAsDone(event) {
    const target = event.target;
    if (target.tagName === "SPAN") {
      const listItem = target.parentElement;
      toggleTaskStatus(listItem);
      updateTaskCounters();
    }
  }

  function removeListItems() {
    shoppingList.innerHTML = "";
    updateTaskCounters();
  }

  function updateTaskCounters() {
    const taskItems = shoppingList.querySelectorAll(listItemSelector);
    const allTaskCounter = taskItems.length;
    let doneTaskCounter = 0;

    taskItems.forEach((item) => {
      if (item.classList.contains("completed")) {
        doneTaskCounter++;
      }
    });

    const activeTaskCounter = allTaskCounter - doneTaskCounter;

    allTaskCounterElement.innerText = allTaskCounter;
    activeTaskCounterElement.innerText = activeTaskCounter;
    doneTaskCounterElement.innerText = doneTaskCounter;

    taskItems.forEach((item) => {
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
    taskFilterLinks.forEach((link) => {
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
