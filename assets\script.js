// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const target = document.querySelector(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Active link highlight while scrolling
const sections = document.querySelectorAll("main section[id]");
const navLinks = [...document.querySelectorAll("nav a[href^='#']")];
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = "#" + entry.target.id;
    navLinks.forEach(link => link.classList.toggle("is-active", link.getAttribute("href") === id));
  });
}, { threshold: 0.6 });
sections.forEach(s => io.observe(s));
