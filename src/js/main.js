const checkboxAdd = document.querySelector("#checkboxAdd");
const checkbox = document.querySelector(".checkbox__box");
const listWrapper = document.querySelector(".list__wrapper");
const inputWrapper = document.querySelector(".input__wrapper");

let listSet = new Set();
let listSetChecked = new Set();

function clearList() {
  while (listWrapper.firstChild) {
    listWrapper.removeChild(listWrapper.firstChild);
  }
}

// show active items
function showActiveItem() {
  //append all list back to UI
  listSet.forEach((list) => {
    // console.log(list);
    let newList =
      '<div class="checkbox__box --light"></div>' +
      '<label class="checkbox__label --show --light">' +
      '<input type="checkbox" class="--input"/>' +
      list +
      "</label>" +
      '<div class="--delete""></div>';

    let newInputWrapper = document.createElement("div");
    newInputWrapper.id = list;
    newInputWrapper.classList.add("input__wrapper", "--show", "--light");
    newInputWrapper.innerHTML = newList;
    listWrapper.appendChild(newInputWrapper);
  });
}

// show checked items
function showCheckedItem() {
  //append all list back to UI
  listSetChecked.forEach((list) => {
    // console.log(list);
    let newList =
      '<div class="checkbox__box --light checked"></div>' +
      '<label class="checkbox__label --show --light">' +
      '<input type="checkbox" class="--input"/>' +
      list +
      "</label>" +
      '<div class="--delete""></div>';

    let newInputWrapper = document.createElement("div");
    newInputWrapper.id = list;
    newInputWrapper.classList.add("input__wrapper", "--show", "--light");
    newInputWrapper.innerHTML = newList;
    listWrapper.appendChild(newInputWrapper);
  });
}

// show all item function
function showItem() {
  //remove all list from UI

  //append all list back to UI

  // get hash location
  let hash = location.hash;

  if (hash == '') {
    hash = location.hash;
}
  console.log(hash);
  // append active list if hash is #active
  if (hash == "#active") {
  clearList();

    showActiveItem();
    // append checked list if hash is #completed
  } else if (hash == "#completed") {
  clearList();

    showCheckedItem();

    // append all list if hash is #all
  } else {
  clearList();

    showCheckedItem();
    showActiveItem();
  }


//   if (element.classList.contains('--active')) {
//     clearList();

//   showActiveItem();
        
//     } else if (element.classList.contains('--completed')) {
//     clearList();

//   showCheckedItem();
        
//     } else if (element.classList.contains('--all')) {
//     clearList();

//       showCheckedItem();
//       showActiveItem();
//     }
}

function showList() {
    document.addEventListener('click', (e) => {
        let element = e.target;
        if (element.classList.contains('btn')) {
            showItem();
        }
    })
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
    //   console.log(listSet);
    //   console.log(listSetChecked);
      // add and delete value from checked list set
    }
  });
}

// add item function
function addItem() {
  document.addEventListener("keyup", (e) => {
    let element = e.target;
    // get item value
    if (e.key == "Enter" && element.classList.contains("add")) {
      //save item value
      let newItem = element.value;
    //   console.log(newItem);
      //add item to set list
      if (!listSet.has(element.value)) {
        listSet.add(element.value);
        showItem();
      } else {
        alert("You have already add this in your list!");
        return false;
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
      if (listSet.has(id)) {
        listSet.delete(id);
        // remove item from UI
        showItem();
      }
    //   console.log(listSet);
    }
  });
}

showList();
checkItem();
addItem();
deleteItem();
