export function initHome() {
  const visual = document.querySelector("[data-hero-visual]");
  const image = visual?.querySelector(".home-hero__image");

  if (!visual || !image) return;

  const markAsLoaded = () => visual.classList.add("is-loaded");

  if (image.complete && image.naturalWidth > 0) {
    markAsLoaded();
    return;
  }

  image.addEventListener("load", markAsLoaded, { once: true });
  image.addEventListener("error", () => visual.classList.add("is-image-error"), { once: true });
}