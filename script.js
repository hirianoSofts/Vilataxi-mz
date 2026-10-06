/* =========================================================
   MOBILE NAV TOGGLE
   ========================================================= */
const menuBtn = document.querySelector('.menu-btn');
const mobileNav = document.querySelector('.mobile-nav');

menuBtn?.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.innerHTML = `<iconify-icon icon="hugeicons:${open ? 'cancel-01' : 'menu-01'}"></iconify-icon>`;
});

/* Fechar navegação mobile ao clicar em um link */
document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav?.classList.remove('open');  
    menuBtn?.setAttribute('aria-expanded', 'false');  
    if (menuBtn) {
      menuBtn.innerHTML = `<iconify-icon icon="hugeicons:menu-01"></iconify-icon>`;
    }
  });
});

/* =========================================================
   SCROLL PROGRESS
   ========================================================= */
const progress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) {
    progress.style.width = max > 0 ? `${(window.scrollY / max) * 100}%` : '0%';
  }
}, { passive: true });

/* =========================================================
   REVEAL ANIMATION
   ========================================================= */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {  
      entry.target.classList.add('visible');  
      observer.unobserve(entry.target);  
    }
  });
}, {
  threshold: 0.12
});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* =========================================================
   EXPERIENCE FEATURES
   ========================================================= */
document.querySelectorAll('.feature-item').forEach(item => {
  item.addEventListener('mouseenter', () => {  
    document.querySelectorAll('.feature-item').forEach(i => i.classList.remove('active'));  
    item.classList.add('active');  
  });
});

/* =========================================================
   CURRENT YEAR
   ========================================================= */
const year = document.getElementById('year');
if (year) {
  year.textContent = new Date().getFullYear();
}
