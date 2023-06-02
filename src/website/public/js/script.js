// navbar
const menuButton = document.getElementById("menuButton");
const menuIcon = document.getElementById("menuIcon");
const nav = document.getElementById("navbar");

menuButton.addEventListener("click", () => {
  if (nav.className === "topnav") {
    nav.className = "topnav responsive";
  } else {
    nav.className = "topnav";
  }

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
const button = document.getElementById("darkModeButton");

button.addEventListener("click", () => {
  const icon = document.getElementById("sunMoonIcon");
  const navbar = document.getElementById("navbar");
  const cmds = document.querySelectorAll(".cmd-name");

  const footer = document.getElementsByTagName("footer")[0];

  document.body.classList.toggle("dark-mode");

  navbar.classList.toggle("dark");
  footer.classList.toggle("dark");
  cmds.forEach((element) => {
    element.classList.toggle("dark");
  });
  icon.classList.toggle("fa-moon");
});
