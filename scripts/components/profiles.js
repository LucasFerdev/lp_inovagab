export function initProfiles() {
  const links = [...document.querySelectorAll("[data-profile-link]")];
  const panels = [...document.querySelectorAll("[data-profile-panel]")];

  if (!links.length || !panels.length) return;

  const show = (id) => {
    const target = panels.some((panel) => panel.id === id) ? id : panels[0].id;

    panels.forEach((panel) => {
      panel.hidden = panel.id !== target;
    });

    links.forEach((link) => {
      const active = link.getAttribute("href") === `#${target}`;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  };

  const idFromHash = () => location.hash.replace("#", "");

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href")?.slice(1);
      if (!panels.some((panel) => panel.id === id)) return;
      event.preventDefault();
      show(id);
      history.pushState(null, "", `#${id}`);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  window.addEventListener("hashchange", () => show(idFromHash()));
  show(idFromHash());
}
