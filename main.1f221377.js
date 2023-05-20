parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"epB2":[function(require,module,exports) {
document.addEventListener("DOMContentLoaded", function () {
  var shoppingList = document.querySelector("ul");
  var shoppingAddButton = document.querySelector("#addToList");
  var shoppingInput = document.querySelector("#nameProductToList");
  var removeListButton = document.querySelector("#removeList");
  var allTaskLink = document.querySelector("#allTask");
  var activeTaskLink = document.querySelector("#activeTask");
  var doneTaskLink = document.querySelector("#doneTask");
  var inputErrorMessage = "Enter something!";
  var listItemSelector = "li";
  var allTaskCounterElement = document.querySelector("#allTaskCounter");
  var activeTaskCounterElement = document.querySelector("#activeTaskCounter");
  var doneTaskCounterElement = document.querySelector("#doneTaskCounter");
  document.onselectstart = function () {
    return false;
  };
  var taskFilter = "all";
  function addElementToList() {
    if (shoppingInput.value === "") {
      alert(inputErrorMessage);
    } else {
      var newLi = document.createElement("li");
      var taskName = document.createElement("span");
      taskName.classList.add("task-name");
      taskName.textContent = shoppingInput.value;
      var removeButton = document.createElement("button");
      removeButton.classList.add("remove-button");
      removeButton.innerHTML = "❌";
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
    var removeButton = listItem.querySelector(".remove-button");
    removeButton.addEventListener("click", removeItem);
  }
  function createEditButtonElement(listItem) {
    var editButton = document.createElement("button");
    editButton.innerHTML = "🖊️";
    editButton.classList.add("edit-button");
    listItem.appendChild(editButton);
    editButton.addEventListener("click", editItem);
  }
  function removeItem(event) {
    var listItem = event.target.parentElement;
    listItem.remove();
    updateTaskCounters();
  }
  function editItem(event) {
    var listItem = event.target.parentElement;
    var taskName = listItem.querySelector(".task-name");
    var taskNameText = taskName.innerText;
    var input = document.createElement("input");
    input.value = taskNameText;
    input.classList.add("edit-input");
    listItem.replaceChild(input, taskName);
    input.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        var updatedTaskName = input.value.trim();
        if (updatedTaskName !== "") {
          var newTaskName = document.createElement("span");
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
    var taskName = listItem.querySelector("span.task-name");
    taskName.classList.toggle("completed");
    var taskStatus = listItem.querySelector(".task-status");
    if (listItem.classList.contains("completed")) {
      taskStatus.innerText = "Done";
    } else {
      taskStatus.innerText = "Active";
    }
    updateTaskCounters();
  }
  function markTaskAsDone(event) {
    var target = event.target;
    if (target.tagName === "SPAN") {
      var listItem = target.parentElement;
      toggleTaskStatus(listItem);
      updateTaskCounters();
    }
  }
  function removeListItems() {
    shoppingList.innerHTML = "";
    updateTaskCounters();
  }
  function updateTaskCounters() {
    var taskItems = shoppingList.querySelectorAll(listItemSelector);
    var allTaskCounter = taskItems.length;
    var doneTaskCounter = 0;
    taskItems.forEach(function (item) {
      if (item.classList.contains("completed")) {
        doneTaskCounter++;
      }
    });
    var activeTaskCounter = allTaskCounter - doneTaskCounter;
    allTaskCounterElement.innerText = allTaskCounter;
    activeTaskCounterElement.innerText = activeTaskCounter;
    doneTaskCounterElement.innerText = doneTaskCounter;
    taskItems.forEach(function (item) {
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
    var target = event.target;
    var isOutside = !shoppingAddButton.contains(target) && !shoppingInput.contains(target) && !removeListButton.contains(target);
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
    var target = event.target;
    if (target === allTaskLink) {
      taskFilter = "all";
    } else if (target === activeTaskLink) {
      taskFilter = "active";
    } else if (target === doneTaskLink) {
      taskFilter = "done";
    }
    var taskFilterLinks = document.querySelectorAll(".task-filter");
    taskFilterLinks.forEach(function (link) {
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
},{}]},{},["epB2"], null)