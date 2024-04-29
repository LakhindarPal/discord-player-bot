const commands = document.querySelectorAll(".cmd-wrapper");

// search
const searchInput = document.querySelector(`input[type="search"]`);
searchInput.addEventListener("keyup", () => {
  const searchWord = searchInput.value.trim().toLowerCase();
  for (let i = 0; i < commands.length; i++) {
    const command = commands[i];
    const cmdName = command
      .querySelector(".cmd-name")
      .textContent.toLowerCase();
    command.style.display = cmdName.includes(searchWord) ? "block" : "none";
  }
});

// filter category
const containerH2 = document.querySelector("#commands h2");
const categories = document.querySelectorAll(".cat-btn");
categories.forEach((button) => {
  button.addEventListener("click", () => {
    const activeButton = document.querySelector("search button.active");
    activeButton.classList.remove("active");
    button.classList.add("active");
    const category = button.textContent;
    containerH2.textContent = `${category} Commands`;
    filterCommands(category.toLowerCase());
  });
});

function filterCommands(category) {
  commands.forEach((command) => {
    const commandCategory = command.dataset.category;
    if (category === "all" || category === commandCategory) {
      command.style.display = "block";
    } else {
      command.style.display = "none";
    }
  });
}

// accordion
commands.forEach((command) => {
  command.addEventListener("click", () => {
    const content = command.querySelector(".cmd-content");
    content.style.display = content.style.display === "none" ? "block" : "none";
  });
});
