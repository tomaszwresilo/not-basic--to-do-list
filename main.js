import "./style.css";
// dodac localstorage https://blog.logrocket.com/localstorage-javascript-complete-guide/
document.addEventListener("DOMContentLoaded", () => {
  const shoppingList = document.querySelector("ul");
  const shoppingAdButton = document.querySelector("#addToList");
  const shoppingInput = document.querySelector("#nameProductToList");
  const removeList = document.querySelector("#removeList");

  function addElementToList() {
    if (shoppingInput.value === "") {
      alert("Wpisz nazwę produktu!");
    } else {
      const newLi = document.createElement("li");
      newLi.innerText = shoppingInput.value;
      shoppingList.appendChild(newLi);
      shoppingInput.value = "";
    }
  }

  shoppingAdButton.addEventListener("click", (event) => {
    event.preventDefault();
    addElementToList();
  });

  // dodac to do funkcji
  removeList.addEventListener("click", (event) => {
    event.preventDefault();
    while (shoppingList.firstChild) {
      shoppingList.removeChild(shoppingList.firstChild);
    }
  });

  shoppingInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      addElementToList();
    }
  });

  shoppingList.addEventListener("click", (event) => {
    if (event.target.style.textDecoration === "line-through") {
      event.target.style.textDecoration = "";
    } else {
      event.target.style.textDecoration = "line-through";
    }
  });
});
