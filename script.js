const menuBtn = document.querySelector('.menu-btn');
const mobileNav = document.querySelector('.mobile-nav');

menuBtn?.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.innerHTML = `<iconify-icon icon="hugeicons:${open ? 'cancel-01' : 'menu-01'}"></iconify-icon>`;
});

document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.innerHTML = '<iconify-icon icon="hugeicons:menu-01"></iconify-icon>';
  });
});

const progress = document.querySelector('.scroll-progress');
window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = max > 0 ? `${(window.scrollY / max) * 100}%` : '0%';
}, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('.feature-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    document.querySelectorAll('.feature-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
