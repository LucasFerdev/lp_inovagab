export function initReveal() {
  const targets = document.querySelectorAll("[data-reveal]");
  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!targets.length) return;

  if (motionPreference.matches || !("IntersectionObserver" in window)) {
    targets.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  targets.forEach((target) => {
    if (target.getBoundingClientRect().top < window.innerHeight * 1.35) {
      target.classList.add("is-visible");
    }
  });

  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      activeObserver.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px 35% 0px", threshold: 0 });

  targets.forEach((target) => observer.observe(target));
}