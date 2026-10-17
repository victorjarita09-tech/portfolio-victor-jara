const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");
const modal = document.querySelector("[data-cv-modal]");
const openCvButtons = document.querySelectorAll("[data-open-cv]");
const closeCvButton = document.querySelector("[data-close-cv]");
const year = document.querySelector("[data-year]");
const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];

const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 24);

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuButton.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menú");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const sections = [...document.querySelectorAll("main section[id]")];
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-40% 0px -52%", threshold: 0 }
);

sections.forEach((section) => sectionObserver.observe(section));

openCvButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (typeof modal.showModal === "function") {
      modal.showModal();
      document.body.classList.add("modal-open");
    } else {
      window.open("assets/curriculum-victor-jara.pdf", "_blank", "noopener");
    }
  });
});

const closeModal = () => {
  modal.close();
  document.body.classList.remove("modal-open");
};

closeCvButton.addEventListener("click", closeModal);
modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});
modal.addEventListener("close", () => document.body.classList.remove("modal-open"));

year.textContent = new Date().getFullYear();
