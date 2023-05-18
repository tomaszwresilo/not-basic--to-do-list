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
      // shoppingInput.placeholder = "Create new todo...";
    }
  }

  shoppingAdButton.addEventListener("click", event => {
    event.preventDefault();
    addElementToList();
  });

  // dodac to do funkcji
  removeList.addEventListener("click", event => {
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

  shoppingList.addEventListener("click", event => {
    if (event.target.style.textDecoration === "line-through") {
      event.target.style.textDecoration = "";
    } else {
      event.target.style.textDecoration = "line-through";
    }
  });
  // function handleFocus() {
  //   if (this.value === "Create new todo...") {
  //     this.value = "";
  //   }
  // }

  // function handleBlur() {
  //   if (this.value === "") {
  //     this.value = "Create new todo...";
  //   }
  // }

  // const inputElement = document.querySelector("#nameProductToList");
  // inputElement.addEventListener("focus", handleFocus);
  // inputElement.addEventListener("blur", handleBlur);
});
