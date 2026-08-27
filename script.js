const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".site-nav");
const menuIcon = menuToggle?.querySelector("i");

const closeMenu = () => {
  if (!menuToggle || !menu || !menuIcon) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menu.classList.remove("is-open");
  menuIcon.className = "ph ph-list";
  document.body.classList.remove("menu-open");
};

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menu?.classList.toggle("is-open", !isOpen);
  if (menuIcon) menuIcon.className = isOpen ? "ph ph-list" : "ph ph-x";
  document.body.classList.toggle("menu-open", !isOpen);
});

menu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

window.addEventListener("resize", () => {
  if (window.innerWidth > 860) closeMenu();
});

const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 18);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const accordion = item?.parentElement;
    const willOpen = !item?.classList.contains("is-open");

    accordion?.querySelectorAll(".faq-item").forEach((otherItem) => {
      otherItem.classList.remove("is-open");
      otherItem.querySelector("button")?.setAttribute("aria-expanded", "false");
    });

    if (willOpen && item) {
      item.classList.add("is-open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

document.querySelectorAll(".review-card").forEach((card) => {
  const author = card.querySelector(".review-author h3")?.textContent?.trim();
  const rating = author === "Paciente" ? 4 : 5;
  const stars = document.createElement("div");
  stars.className = "review-stars";
  stars.setAttribute("aria-label", `${rating} de 5 estrelas`);

  for (let index = 1; index <= 5; index += 1) {
    const star = document.createElement("i");
    star.className = index <= rating ? "ph-fill ph-star" : "ph ph-star is-empty";
    star.setAttribute("aria-hidden", "true");
    stars.append(star);
  }

  card.querySelector(".review-author")?.insertAdjacentElement("afterend", stars);
});

const revealItems = document.querySelectorAll("[data-reveal]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.querySelectorAll("main > section").forEach((section) => {
  section.querySelectorAll("[data-reveal]").forEach((item, index) => {
    item.style.setProperty("--reveal-delay", `${Math.min(index, 4) * 70}ms`);
  });
});

const treatmentSlides = [
  {
    number: "01",
    title: "Diagnóstico",
    description: "Entender a origem de cada alteração é o primeiro passo para um tratamento seguro e eficaz.",
    procedures: ["Patch Test", "Biópsia de pele"],
    image: "assets/procedimento-diagnostico.webp",
    alt: "Avaliação dermatológica cuidadosa da pele",
  },
  {
    number: "02",
    title: "Procedimentos terapêuticos",
    description: "Recursos escolhidos conforme a avaliação clínica e a necessidade de cada paciente.",
    procedures: ["Crioterapia", "Fototerapia", "Remoção de lesões", "Cirurgia dermatológica"],
    image: "assets/procedimento-tratamento.webp",
    alt: "Procedimento terapêutico dermatológico em consultório",
  },
  {
    number: "03",
    title: "Saúde das unhas",
    description: "Avaliação e cuidado médico para alterações que causam dor, inflamação ou recorrência.",
    procedures: ["Correção de unhas encravadas"],
    image: "assets/procedimento-unhas.webp",
    alt: "Cuidado médico especializado com a saúde das unhas",
  },
];

const treatmentCarousel = document.querySelector("[data-treatment-carousel]");

if (treatmentCarousel) {
  const image = treatmentCarousel.querySelector("[data-treatment-image]");
  const preview = treatmentCarousel.querySelector("[data-treatment-preview]");
  const number = treatmentCarousel.querySelector("[data-treatment-number]");
  const title = treatmentCarousel.querySelector("[data-treatment-title]");
  const description = treatmentCarousel.querySelector("[data-treatment-description]");
  const procedures = treatmentCarousel.querySelector("[data-treatment-procedures]");
  const currentLabel = treatmentCarousel.querySelector("[data-treatment-current]");
  const progress = treatmentCarousel.querySelector("[data-treatment-progress]");
  const tabs = [...treatmentCarousel.querySelectorAll("[data-treatment-index]")];
  let currentIndex = 0;
  let isTransitioning = false;

  const renderTreatment = () => {
    const active = treatmentSlides[currentIndex];
    const previewIndex = (currentIndex + 1) % treatmentSlides.length;
    const upcoming = treatmentSlides[previewIndex];

    treatmentCarousel.dataset.slide = String(currentIndex);
    treatmentCarousel.dataset.preview = String(previewIndex);
    if (image) {
      image.src = active.image;
      image.alt = active.alt;
    }
    if (preview) preview.src = upcoming.image;
    if (number) number.textContent = active.number;
    if (title) title.textContent = active.title;
    if (description) description.textContent = active.description;
    if (currentLabel) currentLabel.textContent = active.number;
    if (progress) progress.style.width = `${((currentIndex + 1) / treatmentSlides.length) * 100}%`;

    if (procedures) {
      procedures.replaceChildren(...active.procedures.map((procedure) => {
        const item = document.createElement("li");
        item.textContent = procedure;
        return item;
      }));
    }

    tabs.forEach((tab, index) => {
      const isActive = index === currentIndex;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.setAttribute("tabindex", isActive ? "0" : "-1");
    });
  };

  const changeTreatment = (nextIndex, direction = "next") => {
    const normalizedIndex = (nextIndex + treatmentSlides.length) % treatmentSlides.length;
    if (isTransitioning || normalizedIndex === currentIndex) return;
    isTransitioning = true;
    treatmentCarousel.dataset.direction = direction;
    treatmentCarousel.classList.add("is-transitioning");

    window.setTimeout(() => {
      currentIndex = normalizedIndex;
      renderTreatment();
      requestAnimationFrame(() => requestAnimationFrame(() => {
        treatmentCarousel.classList.remove("is-transitioning");
        isTransitioning = false;
      }));
    }, reduceMotion ? 0 : 260);
  };

  treatmentCarousel.addEventListener("click", (event) => {
    const control = event.target.closest("button");
    if (!control) return;

    if (control.matches("[data-treatment-next]")) {
      changeTreatment(currentIndex + 1, "next");
    } else if (control.matches("[data-treatment-prev]")) {
      changeTreatment(currentIndex - 1, "previous");
    } else if (control.matches("[data-treatment-index]")) {
      const nextIndex = Number(control.dataset.treatmentIndex);
      changeTreatment(nextIndex, nextIndex > currentIndex ? "next" : "previous");
    } else {
      return;
    }

  });

  treatmentCarousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") changeTreatment(currentIndex + 1, "next");
    if (event.key === "ArrowLeft") changeTreatment(currentIndex - 1, "previous");
  });
  renderTreatment();
}

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

const navSections = [...document.querySelectorAll("main > section[id]")];
const navLinks = [...document.querySelectorAll(".site-nav a[href^='#']")];

if ("IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach((link) => link.classList.toggle("is-active", link.hash === `#${visible.target.id}`));
  }, { rootMargin: "-32% 0px -58% 0px", threshold: [0, .2, .5] });
  navSections.forEach((section) => navObserver.observe(section));
}

const year = document.querySelector("[data-year]");
if (year) year.textContent = new Date().getFullYear();
