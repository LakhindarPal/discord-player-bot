// navbar
const menuButton = document.getElementById("menuButton");
const menuIcon = document.getElementById("menuIcon");
const nav = document.getElementById("navbar");

menuButton.addEventListener("click", () => {
  nav.classList.toggle("responsive");

  menuIcon.classList.toggle("fa-xmark");
});

// toggle active class
const currentLocation = window.location.href;
const navitems = document.querySelectorAll(".nav-link");
navitems.forEach((item) => {
  if (item.href === currentLocation) {
    item.classList.add("active");
  }
});

//darkmode

const htmlEl = document.getElementsByTagName("html")[0];
const icon = document.getElementById("sunMoonIcon");

document.addEventListener("DOMContentLoaded", () => {
  const theme = currentTheme();
  htmlEl.dataset.theme = theme;

  icon.className = theme === "light" ? "fa-solid fa-sun" : "fa-solid fa-moon";
});

const toggleBtn = document.getElementById("themeToggleButton");
toggleBtn.addEventListener("click", () => {
  const newTheme = currentTheme() === "dark" ? "light" : "dark";

  htmlEl.dataset.theme = newTheme;
  localStorage.setItem("theme", newTheme);

  icon.className = newTheme === "light" ? "fa-solid fa-sun" : "fa-solid fa-moon";
});

const currentTheme = () => {
  const defaultTheme = window.matchMedia("(prefers-color-scheme: dark)") ? "dark" : "light";

  return localStorage.getItem("theme") ?? defaultTheme;
};
