// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("primary-nav");

navToggle.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!expanded));
  nav.classList.toggle("open");
});

// Smoothly close nav after clicking a link (on mobile)
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Active section highlighting using IntersectionObserver
const sections = document.querySelectorAll("main .section");
const navLinks = document.querySelectorAll(".nav a");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");
      navLinks.forEach((a) => {
        a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`);
      });
    }
  });
}, { threshold: 0.6 });

sections.forEach((sec) => observer.observe(sec));

// Project cards render from window.PROJECTS (see index.html)
function renderProjects() {
  const grid = document.getElementById("project-grid");
  if (!grid || !window.PROJECTS) return;

  grid.innerHTML = window.PROJECTS
    .map((p) => {
      const tags = (p.tags || []).map((t) => `<span class="tag">${t}</span>`).join("");
      const img = p.image ? `<img src="${p.image}" alt="${p.title} screenshot" loading="lazy">` : "";
      const liveBtn =
        p.live && p.live !== "#" ? `<a class="btn" href="${p.live}" target="_blank" rel="noopener">Live</a>` : "";
      const srcBtn =
        p.source && p.source !== "#" ? `<a class="btn btn-secondary" href="${p.source}" target="_blank" rel="noopener">Code</a>` : "";
      return `
      <article class="card">
        ${img}
        <div class="card-body">
          <h3 class="card-title">${p.title}</h3>
          <p>${p.description || ""}</p>
          <div class="taglist">${tags}</div>
          <div class="cta" style="margin-top:.75rem;">${liveBtn} ${srcBtn}</div>
        </div>
      </article>`;
    })
    .join("");
}
renderProjects();

// Current year in footer
document.getElementById("year").textContent = new Date().getFullYear();
