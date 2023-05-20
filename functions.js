import {
  addElementToList,
  removeListItems,
  clearInput,
  handleEnterKeyPress,
  markTaskAsDone,
  handleTaskFilterClick
} from "./functions";
import { updateTaskCounters } from "./counters";

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

  function handleAddButtonClick(event) {
    event.preventDefault();
    addElementToList(shoppingInput, shoppingList, updateTaskCounters);
  }

  removeListButton.addEventListener("click", () => {
    removeListItems(shoppingList, updateTaskCounters);
  });

  document.addEventListener("click", event => {
    clearInput(event, shoppingAddButton, shoppingInput, removeListButton);
  });

  shoppingInput.addEventListener("keypress", event => {
    handleEnterKeyPress(
      event,
      addElementToList,
      shoppingInput,
      shoppingList,
      updateTaskCounters
    );
  });

  shoppingList.addEventListener("click", event => {
    markTaskAsDone(event, updateTaskCounters);
  });

  allTaskLink.addEventListener("click", event => {
    handleTaskFilterClick(event, "all", allTaskLink, updateTaskCounters);
  });

  activeTaskLink.addEventListener("click", event => {
    handleTaskFilterClick(event, "active", activeTaskLink, updateTaskCounters);
  });

  doneTaskLink.addEventListener("click", event => {
    handleTaskFilterClick(event, "done", doneTaskLink, updateTaskCounters);
  });

  shoppingAddButton.addEventListener("click", handleAddButtonClick);

  updateTaskCounters(
    shoppingList,
    listItemSelector,
    allTaskCounterElement,
    activeTaskCounterElement,
    doneTaskCounterElement,
    taskFilter
  );
});
