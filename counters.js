export function updateTaskCounters(
  list,
  listItemSelector,
  allTaskCounterElement,
  activeTaskCounterElement,
  doneTaskCounterElement,
  taskFilter
) {
  const taskItems = list.querySelectorAll(listItemSelector);
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
