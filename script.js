// --- Safe analytics wrapper ------------------------------------------
// Works with GA4, Plausible, or neither. Nothing is sent until the
// founder adds an analytics snippet to the <head> of the pages.
window.bexiraTrack = function (event, params) {
  params = params || {};
  try {
    if (typeof window.gtag === "function") window.gtag("event", event, params);
    if (typeof window.plausible === "function") window.plausible(event, { props: params });
    (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: event }, params));
  } catch (e) { /* never let analytics break a button */ }
};

// --- Tier CTA configuration -------------------------------------------
// Paste the Calendly / Cal.com event URL between the quotes when you have
// one. While it is empty, the Growth Partner button opens the brief form.
const CALENDLY_URL = ""; // e.g. "https://calendly.com/your-name/30min"
const BRIEF_FLOW = "start-a-project/";

document.querySelectorAll("[data-tier]").forEach(function (el) {
  var tier = el.getAttribute("data-tier");
  if (tier === "partner" && CALENDLY_URL) {
    el.setAttribute("href", CALENDLY_URL);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  } else {
    el.setAttribute("href", BRIEF_FLOW + "?tier=" + encodeURIComponent(tier));
  }
  el.addEventListener("click", function () {
    window.bexiraTrack("cta_click", { tier: tier });
  });
});

// --- Navigation menu ---------------------------------------------------
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
