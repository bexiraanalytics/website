const menu = document.querySelector(".menu");
const links = document.querySelector(".nav-links");
menu?.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  menu.textContent = open ? "×" : "☰";
});
document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => {
  links.classList.remove("open");
  menu.textContent = "☰";
}));

/* Scroll reveal */
const revealEls = document.querySelectorAll('.reveal');
const revealIO = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); } });
}, { threshold: .15 });
revealEls.forEach(el => revealIO.observe(el));

/* Hero chart grow-in */
const chart = document.querySelector('.chart');
if (chart) {
  const chartIO = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('animate'); chartIO.unobserve(e.target); } });
  }, { threshold: .4 });
  chartIO.observe(chart);
}

/* Case study sparkline draw-in */
const caseVisual = document.querySelector('.case-visual');
if (caseVisual) {
  const caseIO = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('animate'); caseIO.unobserve(e.target); } });
  }, { threshold: .3 });
  caseIO.observe(caseVisual);
}

/* Subtle tilt on the hero data card, following the cursor */
const heroVisual = document.querySelector('.hero-visual');
const dataCard = document.querySelector('.data-card');
if (heroVisual && dataCard && window.matchMedia('(pointer:fine)').matches) {
  heroVisual.addEventListener('mousemove', (e) => {
    const r = heroVisual.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    dataCard.style.transform = `rotate(${2 + x * 6}deg) rotateX(${y * -6}deg)`;
  });
  heroVisual.addEventListener('mouseleave', () => { dataCard.style.transform = 'rotate(2deg)'; });
}
