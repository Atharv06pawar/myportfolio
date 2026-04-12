const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");
const navAnchors = document.querySelectorAll('.nav-panel a[href^="#"]');
const revealElements = document.querySelectorAll("[data-reveal]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function setMenuState(isOpen) {
  if (!menuToggle || !siteNav) {
    return;
  }

  menuToggle.classList.toggle("is-active", isOpen);
  siteNav.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = !siteNav.classList.contains("is-open");
    setMenuState(isOpen);
  });

  navAnchors.forEach((anchor) => {
    anchor.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("click", (event) => {
    const target = event.target;

    if (!(target instanceof Node)) {
      return;
    }

    if (!siteNav.contains(target) && !menuToggle.contains(target)) {
      setMenuState(false);
    }
  });
}

function revealImmediately() {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}

function handleReducedMotionChange(event) {
  if (event.matches) {
    revealImmediately();
  }
}

if (prefersReducedMotion.matches) {
  revealImmediately();
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -48px 0px"
    }
  );

  revealElements.forEach((element) => observer.observe(element));
}

if (typeof prefersReducedMotion.addEventListener === "function") {
  prefersReducedMotion.addEventListener("change", handleReducedMotionChange);
} else if (typeof prefersReducedMotion.addListener === "function") {
  prefersReducedMotion.addListener(handleReducedMotionChange);
}
