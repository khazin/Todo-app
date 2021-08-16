let checkboxAdd = document.querySelector("#checkboxAdd");
let checkbox = document.querySelectorAll(".checkbox__box");
let listWrapper = document.querySelector(".list__wrapper");
let inputWrapper = document.querySelectorAll(".input__wrapper");
let itemAmount = document.querySelector(".items__amount");
let container = document.querySelector(".container");
let textboxAdd = document.querySelector(".add");
let btnClear = document.querySelector(".btn.--clear");
let btnWrapper = document.querySelector(".btn__wrapper");
let footer = document.querySelector(".footer");

// reinstate elements with same classname
setInterval(() => {
  inputWrapper = document.querySelectorAll(".input__wrapper");
  checkbox = document.querySelectorAll(".checkbox__box");
}, 500);

let todoList = {
  currentList: {
    items: [
      "Jog around the park 3x",
      "10 minute meditation",
      "Read for 1 hour",
      "Pick up groceries",
      "Complete Todo App on Frontend Mentor",
    ],
    add: function (value) {
      this.items.push(value);
    },
    delete: function (value) {
      let index = this.items.indexOf(value);
      this.items.splice(index, 1);
    },
    has: function (value) {
      if (this.items.includes(value)) return true;
      return false;
    },
    sort: function (movedItemValue, afterMovedItemValue) {
      if (afterMovedItemValue == "none") {
        this.delete(movedItemValue);
        this.add(movedItemValue);
      } else {
        this.delete(movedItemValue);
        let afterMovedItemIndex = this.items.indexOf(afterMovedItemValue);
        this.items.splice(afterMovedItemIndex, 0, movedItemValue);
      }
    },
  },

  checkedList: {
    items: ["Complete online JavaScript course"],
    add: function (value) {
      this.items.push(value);
    },
    delete: function (value) {
      let index = this.items.indexOf(value);
      this.items.splice(index, 1);
    },
    has: function (value) {
      if (this.items.includes(value)) return true;
      return false;
    },
    clear: function () {
      this.items = [];
    },
  },

  getAllList: function () {
    let list = this.currentList.items.concat(this.checkedList.items);
    return list;
  },
};
let activeList = todoList.currentList;
let checkedList = todoList.checkedList;
let mode = "light";

function drag() {
  document.addEventListener("dragstart", (e) => {
    let element = e.target;
    if (element.classList.contains("draggable")) {
      element.classList.add("dragging");
    }
  });
  document.addEventListener("dragend", (e) => {
    let element = e.target;
    if (element.classList.contains("draggable")) {
      element.classList.remove("dragging");
    }
  });

  listWrapper.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(listWrapper, e.clientY);
    const draggable = document.querySelector(".dragging");

    if (afterElement == null) {
      activeList.sort(draggable.id, 'none');
      listWrapper.appendChild(draggable);
    } else {
      activeList.sort(draggable.id, afterElement.id);
      listWrapper.insertBefore(draggable, afterElement);
    }
  });

  function getDragAfterElement(listWrapper, y) {
    //put non-dragging elements in an array
    const draggableElements = [
      ...listWrapper.querySelectorAll(".draggable:not(.dragging)"),
    ];
    // console.log(draggableElements);
    let draggableElement = draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY, element: null }
    );

    return draggableElement.element;
  }
}

// clear the whole list function
function clearList() {
  while (listWrapper.firstChild) {
    listWrapper.removeChild(listWrapper.firstChild);
  }
}

// generate new list item function
function generateNewItem(list, checked, draggable) {
  let newInputWrapper = document.createElement("div");
  let newList = `<div class="checkbox__box --${mode} ${checked}"></div> 
    <label class="checkbox__label --show --${mode}"> 
    <input type="checkbox" class="--input"/> 
   ${list} 
    </label>
    <div class="--delete"></div>;`;

  newInputWrapper.classList.add(
    "input__wrapper",
    "--show",
    "--" + mode + "",
    draggable.class
  );
  newInputWrapper.draggable = draggable.attribute;
  newInputWrapper.id = list;
  newInputWrapper.innerHTML = newList;
  listWrapper.appendChild(newInputWrapper);
}

// show active items funvtion
function showActiveItem() {
  //append all list back to UI
  activeList.items.forEach((list) => {
    generateNewItem(list, "", { attribute: true, class: "draggable" });
  });
}

// show checked items
function showCheckedItem() {
  //append all list back to UI
  checkedList.items.forEach((list) => {
    generateNewItem(list, "checked", { attribute: false });
  });
}

// show all item function
function showItem() {
  setTimeout(() => {
    //clear list
    clearList();

    // get hash location
    let hash = location.hash;

    // append active list if hash is #active
    if (hash == "#active") {
      showActiveItem();

      // append checked list if hash is #completed
    } else if (hash == "#completed") {
      showCheckedItem();

      // append all list if hash is #all
    } else {
      showCheckedItem();
      showActiveItem();
    }

    itemAmount.innerHTML = activeList.items.length + " items left";
  }, 1);
}

function showList() {
  document.addEventListener("click", (e) => {
    let element = e.target;
    if (element.classList.contains("btn")) {
      showItem();
    }
  });
}

// check item function
function checkItem() {
  document.addEventListener("click", (e) => {
    let element = e.target;

    // click and return element node (.checkbox__box)
    if (element.classList.contains("checkbox__box")) {
      // toggle class to element to check
      element.classList.toggle("checked");

      //add and delete value from list set
      let id = element.parentNode.id;

      if (activeList.has(id)) {
        activeList.delete(id);
        checkedList.add(id);
      } else {
        activeList.add(id);
        checkedList.delete(id);
      }

      itemAmount.innerHTML = activeList.items.size + " items left";
    }
  });
}

// add item function
function addItem() {
  document.addEventListener("keyup", (e) => {
    let element = e.target;

    if (e.key == "Enter" && element.classList.contains("add")) {
      // get item value
      let newItem = element.value;

      // validate empty field
      if (newItem == "") {
        alert("Please enter a new item!");
        return false;
      } else {
        // if item is already done
        if (checkboxAdd.classList.contains("checked")) {
          // save item into checked list set
          checkedList.add(element.value);

          //if item is not done
        } else if (!activeList.has(element.value)) {
          // save item into list set
          activeList.add(element.value);
        } else {
          // validate duplicate
          alert("You have already add this in your list!");
          return false;
        }
        showItem();
      }

      element.value = "";
    }
  });
}

// delete item function
function deleteItem() {
  document.addEventListener("click", (e) => {
    let element = e.target;
    if (element.classList.contains("--delete")) {
      // get id of item
      let id = element.parentNode.id;
      //delete from set list if exist
      if (checkedList.has(id)) {
        checkedList.delete(id);
      }
      if (activeList.has(id)) {
        activeList.delete(id);
      }
      //   console.log(activeList);
    } else if (element.classList.contains("--clear")) {
      checkedList.clear();
    }

    // refresh list
    showItem();
  });
}

function toggleMode() {
  document.addEventListener("click", (e) => {
    let element = e.target;
    if (element.classList.contains("mode")) {
      //change mode
      if (mode == "light") {
        mode = "dark";
      } else {
        mode = "light";
      }

      // toggle class mode
      function toggleClassMode(_element) {
        _element.classList.toggle("--light");
        _element.classList.toggle("--dark");
      }

      toggleClassMode(element);
      toggleClassMode(container);
      for (let i = 0; i < inputWrapper.length; i++) {
        toggleClassMode(inputWrapper[i]);
        toggleClassMode(checkbox[i]);
      }

      toggleClassMode(textboxAdd);
      toggleClassMode(itemAmount);
      toggleClassMode(btnClear);
      toggleClassMode(btnWrapper);
      toggleClassMode(footer);
    }
  });
}

toggleMode();
showList();
checkItem();
addItem();
deleteItem();
drag();
