const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// SCROLL REVEAL

const reveals = document.querySelectorAll(".reveal, .reveal-scale");

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  reveals.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const revealPoint = 100;

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

const projectCards = document.querySelectorAll(".project-card");

function revealProjects() {
  const triggerBottom = window.innerHeight - 100;

  projectCards.forEach((card, index) => {
    const cardTop = card.getBoundingClientRect().top;

    if (cardTop < triggerBottom) {
      setTimeout(() => {
        card.classList.add("active");
      }, index * 150); // stagger effect
    }
  });
}

window.addEventListener("scroll", revealProjects);
window.addEventListener("load", revealProjects);