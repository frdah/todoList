const addTodo = document.querySelector("#addTodo");
const addTodoDate = document.querySelector("#addTodoDate");
const addButton = document.querySelector("#addBtn");
const addCategory = document.querySelector("#addCategory");
const ul = document.querySelector("ul");
const todoList = [];
const search = document.querySelector("#search");
const läxorBtn = document.querySelector("#Läxor");
const hushållsarbeteBtn = document.querySelector("#Hushållsarbete");
const allaBtn = document.querySelector("#Alla");
let currentList = todoList;

//default värde för datum
function todaysDate() {
  const d = new Date();
  const currentYear = d.getFullYear();
  let currentMonth = d.getMonth() + 1;
  let currentDate = d.getDate();
  if (currentMonth < 10) {
    currentMonth = "0" + currentMonth;
  }
  if (currentDate < 10) {
    currentDate = "0" + currentDate;
  }
  return `${currentYear}-${currentMonth}-${currentDate}`;
}

if (addTodoDate.value == "") {
  addTodoDate.value = todaysDate();
}

//lägga till ny todo
addButton.addEventListener("click", function() {
  for (let x = 0; x < todoList.length; x++) {
    if (
      todoList[x].todoText == addTodo.value &&
      todoList[x].todoDate == addTodoDate.value &&
      todoList[x].todoCategory == addCategory.value
    ) {
      alert("Denna todo finns redan!");
      defaultValues();
    }
  }
  if (
    addTodo.value != "" &&
    addTodoDate.value != "" &&
    addCategory.value != "Kategori"
  ) {
    todoList.push({
      todoText: addTodo.value,
      todoDate: addTodoDate.value,
      todoCategory: addCategory.value,
      todoString: `${addTodo.value} ${addTodoDate.value} ${addCategory.value}`,
      todoWarning: false,
      todoId: todoList.length
    });

    if (addTodoDate.valueAsNumber < new Date().getTime()) {
      todoList[todoList.length - 1].todoWarning = true;
    }
    showList(todoList);
  }
  //nollställer skapa fält
  defaultValues();
  document.querySelector("#addField").classList.toggle("hide");
  document.querySelector("#filterField").classList.toggle("hide");
  document.querySelector("#todoField").classList.toggle("hide");
});

function defaultValues() {
  addTodo.value = "";
  addTodoDate.value = todaysDate();
  addCategory.value = "Kategori";
  //uncheckar radiobtns vid ny todo
  const rButtons = document.getElementsByName("filterBtn");
  for (let x = 0; x < rButtons.length; x++) {
    rButtons[x].checked = false;
  }
}

function showList(arr) {
  ul.innerHTML = "";
  for (let x = 0; x < arr.length; x++) {
    const todo = document.createElement("li");
    todo.id = `li${x}`;
    todo.textContent = arr[x].todoString;

    if (arr[x].todoWarning == true) {
      const warningIMG = document.createElement("img");
      warningIMG.src = "warning_512x512.png";
      warningIMG.alt = "Datumet har passerat";
      warningIMG.classList.add("warningClass");
      todo.appendChild(warningIMG);
    }
    ul.appendChild(todo);
    const bin = document.createElement("img");
    bin.src = "recyclebin.png";
    bin.classList.add("binClass");
    bin.id = `bin${x}`;
    todo.appendChild(bin);
  }

  clickDeleteFunc();
}

function clickDeleteFunc() {
  for (let i = 0; i < currentList.length; i++) {
    document.querySelector(`#bin${i}`).addEventListener("click", function() {
      console.log(event.target);
      console.log("in click func: " + currentList.length);
      if (
        currentList[i].todoString ==
        document.querySelector(`#li${i}`).textContent
      ) {
        currentList.splice(i, 1);
      }

      //tar bort samma objekt i todoList
      for (let x = 0; x < todoList.length; x++) {
        if (
          todoList[x].todoString ==
          document.querySelector(`#li${i}`).textContent
        ) {
          todoList.splice(x, 1);
          document.querySelector(`#li${i}`).remove();
        }
      }

      showList(currentList);
    });
  }
}

function searchFunc(arr) {
  const filterarr = [];
  for (let x = 0; x < arr.length; x++) {
    const searchWord = event.currentTarget.value.toLowerCase();

    if (arr[x].todoString.toLowerCase().includes(searchWord)) {
      filterarr.push(arr[x]);
    }
  }
  currentList = filterarr;
  return showList(filterarr);
}

search.addEventListener("input", function() {
  let uncheckedBtns = 0;
  const rButtons = document.getElementsByName("filterBtn");
  for (let x = 0; x < rButtons.length; x++) {
    if (rButtons[x].checked == false) {
      uncheckedBtns++;
      if (uncheckedBtns == rButtons.length) {
        searchFunc(todoList);
      }
    }
  }
});

//Radiobuttons
läxorBtn.addEventListener("click", function() {
  currentList = radioBtns(event.target);
  showList(radioBtns(event.target));
  search.addEventListener("input", function() {
    searchFunc(radioBtns(läxorBtn));
  });
});

hushållsarbeteBtn.addEventListener("click", function() {
  currentList = radioBtns(event.target);
  showList(radioBtns(event.target));
  search.addEventListener("input", function() {
    searchFunc(radioBtns(hushållsarbeteBtn));
  });
});

//eftersom ingen event target på searchen
allaBtn.addEventListener("click", function() {
  currentList = todoList;
  showList(todoList);
  search.addEventListener("input", function() {
    searchFunc(todoList);
  });
});

function radioBtns(btn) {
  const filterRadio = [];
  for (x = 0; x < todoList.length; x++) {
    if (todoList[x].todoString.includes(btn.id)) {
      filterRadio.push(todoList[x]);
    }
  }
  return filterRadio;
}

document.querySelector("#openCreateBtn").addEventListener("click", function() {
  document.querySelector("#addField").classList.toggle("hide");
  document.querySelector("#filterField").classList.toggle("hide");
  document.querySelector("#todoField").classList.toggle("hide");
  if (document.querySelector("#openCreateBtn").textContent == "+") {
    document.querySelector("#openCreateBtn").textContent = "x";
  } else {
    document.querySelector("#openCreateBtn").textContent = "+";
  }
});
