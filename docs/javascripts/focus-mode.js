// Focus Mode — hides both sidebars for distraction-free reading
(function () {
  const STORAGE_KEY = "focus-mode";

  function createToggle() {
    const btn = document.createElement("button");
    btn.id = "focus-toggle";
    btn.title = "Toggle Focus Mode";
    btn.setAttribute("aria-label", "Toggle Focus Mode");
    btn.innerHTML = "📖";
    document.body.appendChild(btn);

    btn.addEventListener("click", function () {
      const active = document.body.classList.toggle("focus-mode");
      localStorage.setItem(STORAGE_KEY, active ? "on" : "off");
      btn.innerHTML = active ? "📑" : "📖";
    });

    // Restore saved preference
    if (localStorage.getItem(STORAGE_KEY) === "on") {
      document.body.classList.add("focus-mode");
      btn.innerHTML = "📑";
    }
  }

  // Run when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createToggle);
  } else {
    createToggle();
  }
})();
