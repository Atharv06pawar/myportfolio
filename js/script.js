// ============================
// NAVBAR TOGGLE
// ============================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// ============================
// SMOOTH INERTIA SCROLL SYSTEM
// ============================

const wrapper = document.getElementById("smooth-wrapper");
const content = document.getElementById("smooth-content");

let current = 0;
let target = 0;
let ease = 0.08;

function setBodyHeight() {
  document.body.style.height = content.getBoundingClientRect().height + "px";
}

function smoothScroll() {
  target = window.scrollY;
  current += (target - current) * ease;

  content.style.transform = `translateY(${-current}px)`;

  requestAnimationFrame(smoothScroll);
}

setBodyHeight();
smoothScroll();
window.addEventListener("resize", setBodyHeight);

// ============================
// SCROLL REVEAL (ADJUSTED)
// ============================

const reveals = document.querySelectorAll(".reveal, .reveal-scale");
const projectCards = document.querySelectorAll(".project-card");

function revealOnScroll() {
  reveals.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      element.classList.add("active");
    }
  });

  projectCards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      setTimeout(() => {
        card.classList.add("active");
      }, index * 150);
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);