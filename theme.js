// Light / dark theme: the visitor's choice, else the system setting.
(function () {
  var root = document.documentElement, key = "vellum-theme", saved = null;
  try { saved = localStorage.getItem(key); } catch (e) {}
  var system = window.matchMedia ? matchMedia("(prefers-color-scheme: dark)") : null;
  function apply(theme) {
    root.setAttribute("data-theme", theme);
    var b = document.querySelector(".theme-toggle");
    if (b) b.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
  }
  apply(saved === "light" || saved === "dark" ? saved : (system && system.matches ? "dark" : "light"));
  if (system && system.addEventListener) system.addEventListener("change", function (e) {
    if (saved !== "light" && saved !== "dark") apply(e.matches ? "dark" : "light");
  });
  document.addEventListener("DOMContentLoaded", function () { apply(root.getAttribute("data-theme")); });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".theme-toggle")) return;
    saved = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    apply(saved);
    try { localStorage.setItem(key, saved); } catch (e2) {}
  });
})();
