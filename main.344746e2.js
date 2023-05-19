parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"epB2":[function(require,module,exports) {
document.addEventListener("DOMContentLoaded", function () {
  var shoppingList = document.querySelector("ul");
  var shoppingAdButton = document.querySelector("#addToList");
  var shoppingInput = document.querySelector("#nameProductToList");
  var removeList = document.querySelector("#removeList");
  var inputErrorMessage = "Enter something!";
  var listItemSelector = "li";
  var allTaskCounterSelector = "#allTask";
  var activeTaskCounterSelector = "#activeTask";
  var doneTaskCounterSelector = "#doneTask";
  var allTaskCounterElement = document.querySelector(allTaskCounterSelector);
  var activeTaskCounterElement = document.querySelector(activeTaskCounterSelector);
  var doneTaskCounterElement = document.querySelector(doneTaskCounterSelector);
  document.onselectstart = function () {
    return false;
  };
  function addElementToList() {
    if (shoppingInput.value === "") {
      alert(inputErrorMessage);
    } else {
      var newLi = document.createElement("li");
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
    var target = event.target;
    target.classList.toggle("completed");
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
  }
  function clearInput(event) {
    var target = event.target;
    var isOutside = !shoppingAdButton.contains(target) && !shoppingInput.contains(target) && !removeList.contains(target);
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
},{}]},{},["epB2"], null)