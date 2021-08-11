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

let listSet = new Set();
let listSetChecked = new Set();
let mode = "light";

// clear the whole list function
function clearList() {
  while (listWrapper.firstChild) {
    listWrapper.removeChild(listWrapper.firstChild);
  }
}

// generate new list item function
function generateNewItem(list, checked) {
  let newInputWrapper = document.createElement("div");
  let newList = '';

  if (mode == "light") {
   newList =
    '<div class="checkbox__box --light '+checked+' "></div>' +
    '<label class="checkbox__label --show --light">' +
    '<input type="checkbox" class="--input"/>' +
    list +
    "</label>" +
    '<div class="--delete""></div>';
    newInputWrapper.classList.add("input__wrapper", "--show", "--light");
  } else {
    newList =
    '<div class="checkbox__box --dark '+checked+' "></div>' +
    '<label class="checkbox__label --show --dark">' +
    '<input type="checkbox" class="--input"/>' +
    list +
    "</label>" +
    '<div class="--delete""></div>';
    newInputWrapper.classList.add("input__wrapper", "--show", "--dark");
  }
 

    newInputWrapper.id = list;
    newInputWrapper.innerHTML = newList;
    listWrapper.appendChild(newInputWrapper);
}

// show active items funvtion
function showActiveItem() {
  //append all list back to UI
  listSet.forEach((list) => {
    generateNewItem(list,'');
  });
}

// show checked items
function showCheckedItem() {
  //append all list back to UI
  listSetChecked.forEach((list) => {
    generateNewItem(list, 'checked');
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

    itemAmount.innerHTML = listSet.size + " items left";
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

      if (listSet.has(id)) {
        listSet.delete(id);
        listSetChecked.add(id);
      } else {
        listSet.add(id);
        listSetChecked.delete(id);
      }

    itemAmount.innerHTML = listSet.size + " items left";
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
          listSetChecked.add(element.value);
          // showItem();

          //if item is not done
        } else if (!listSet.has(element.value)) {
          // save item into list set
          listSet.add(element.value);
          // showItem();
        } else {
          // validate duplicate
          alert("You have already add this in your list!");
          return false;
        }
          showItem();

      }

      element.value = "";
      //   console.log(listSet);
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
      if (listSetChecked.has(id)) {
        listSetChecked.delete(id);
      }
      if (listSet.has(id)) {
        listSet.delete(id);
      }
      //   console.log(listSet);
    } else if (element.classList.contains("--clear")) {
      listSetChecked.clear();
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
