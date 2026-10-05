// Єдина інтерактивна логіка сторінки — мобільна навігація.
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-nav");
const desktop = window.matchMedia("(min-width: 64rem)");

function setMenu(open, restoreFocus = false) {
  menuButton.setAttribute("aria-expanded", String(open));
  navigation.hidden = !desktop.matches && !open;
  if (restoreFocus) menuButton.focus();
}

// Без JavaScript посилання залишаються видимими й доступними.
document.querySelector(".site-header").classList.add("menu-ready");
menuButton.hidden = false;
setMenu(false);

menuButton.addEventListener("click", () => {
  setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a") && !desktop.matches) setMenu(false, true);
});
document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    menuButton.getAttribute("aria-expanded") === "true"
  ) {
    setMenu(false, true);
  }
});
desktop.addEventListener("change", () => {
  const focusWasInside = navigation.contains(document.activeElement);
  setMenu(false, !desktop.matches && focusWasInside);
});
