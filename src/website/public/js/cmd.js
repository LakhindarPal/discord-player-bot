// search cmd-box
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keyup", () => {
  const filter = searchInput.value.trim().toLowerCase();
  const allCmds = document.getElementsByClassName("cmd-box");

  for (let i = 0; i < allCmds.length; i++) {
    const cmd = allCmds[i];
    const cmdName = cmd.getElementsByClassName("cmd-name")[0];
    const txtValue = cmdName.textContent || cmdName.innerText;
    if (txtValue.toLowerCase().indexOf(filter) > -1) {
      cmd.style.display = "";
    } else {
      cmd.style.display = "none";
    }
  }
});

// filter by category
filterSelection("all");

function filterSelection(cat) {
  const x = document.getElementsByClassName("cmd-box");
  if (cat === "all") cat = "";
  for (let i = 0; i < x.length; i++) {
    cmdRemoveClass(x[i], "show");
    if (x[i].className.indexOf(cat) > -1) cmdAddClass(x[i], "show");
  }
}

function cmdAddClass(element, name) {
  const arr1 = element.className.split(" ");
  const arr2 = name.split(" ");
  for (let i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) === -1) {
      element.className += ` ${arr2[i]}`;
    }
  }
}

function cmdRemoveClass(element, name) {
  const arr1 = element.className.split(" ");
  const arr2 = name.split(" ");
  for (let i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// add active class to the current button (highlight it)
const btnContainer = document.getElementById("categoryButton");
const btns = btnContainer.getElementsByClassName("btn");
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", () => {
    const current = btnContainer.getElementsByClassName("active")[0];
    current.className = current.className.replace(" active", "");
    btns[i].className += " active";
  });
}

// cmd-box commamd description
const collapse = document.getElementsByClassName("cmd-name");
for (let i = 0; i < collapse.length; i++) {
  collapse[i].addEventListener("click", () => {
    collapse[i].classList.toggle("active");
    const content = collapse[i].nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
