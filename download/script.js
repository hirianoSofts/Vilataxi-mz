const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

function closeMenu() {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('menu-open');
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) closeMenu();
    else {
      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.setAttribute('aria-label', 'Fechar menu');
      mobileMenu.classList.add('open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.body.classList.add('menu-open');
    }
  });
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 760) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
}

const downloadLinks = document.querySelectorAll('.apk-download');
const progress = document.querySelector('.download-progress');
const toast = document.querySelector('.download-toast');
let toastTimer;

downloadLinks.forEach(link => {
  link.addEventListener('click', () => {
    // O atributo download inicia o download real do APK; a animação é apenas feedback visual.
    document.body.classList.add('download-started');
    if (progress) {
      progress.hidden = false;
      const message = progress.querySelector('.progress-message');
      if (message) message.textContent = 'A preparar o descarregamento…';
    }
    downloadLinks.forEach(item => item.classList.add('is-loading'));
    if (toast) {
      toast.classList.add('visible');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove('visible'), 3200);
    }
    setTimeout(() => {
      downloadLinks.forEach(item => item.classList.remove('is-loading'));
      if (progress) progress.hidden = true;
      document.body.classList.remove('download-started');
    }, 1800);
  });
});

document.querySelectorAll('.back-top').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
