document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     MOBILE NAVIGATION
  ========================================================= */
  const menuBtn = document.querySelector('.menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.innerHTML = `<iconify-icon icon="hugeicons:${open ? 'cancel-01' : 'menu-01'}"></iconify-icon>`;
    });

    document.querySelectorAll('.mobile-nav a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.innerHTML = `<iconify-icon icon="hugeicons:menu-01"></iconify-icon>`;
      });
    });
  }

  /* =========================================================
     SCROLL PROGRESS BAR
  ========================================================= */
  const progress = document.querySelector('.scroll-progress');

  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) {
      progress.style.width = max > 0 ? `${(window.scrollY / max) * 100}%` : '0%';
    }
  }, { passive: true });

  /* =========================================================
     REVEAL ANIMATION (INTERSECTION OBSERVER)
  ========================================================= */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* =========================================================
     PROCESSO DE DOWNLOAD DE APK COM PROGRESSO (BOTÃO PRINCIPAL)
  ========================================================= */
  const downloadBtn = document.getElementById('downloadButton');

  if (downloadBtn) {
    downloadBtn.addEventListener('click', function (e) {
      // Impede múltiplos cliques durante o download
      if (this.classList.contains('downloading')) {
        e.preventDefault();
        return;
      }

      e.preventDefault();

      const apkUrl = this.getAttribute('href') || '../download/android/vilataxi.apk';
      const btnText = this.querySelector('.btn-text');
      const btnPercent = this.querySelector('.btn-percent');
      const progressFill = this.querySelector('.btn-progress-fill');
      const btnIcon = this.querySelector('.btn-icon');

      this.classList.add('downloading');
      if (btnPercent) btnPercent.style.display = 'inline-block';

      let currentProgress = 0;

      // Simulação do progresso de transferência
      const interval = setInterval(() => {
        currentProgress += 4;

        if (progressFill) progressFill.style.width = `${currentProgress}%`;
        if (btnPercent) btnPercent.textContent = `${currentProgress}%`;

        if (currentProgress >= 100) {
          clearInterval(interval);

          if (btnText) btnText.textContent = 'A BAIXAR...';
          if (btnIcon) btnIcon.setAttribute('icon', 'hugeicons:checkmark-circle-02');

          // Despoleta o download real do APK
          const hiddenAnchor = document.createElement('a');
          hiddenAnchor.href = apkUrl;
          hiddenAnchor.download = 'vilataxi.apk';
          document.body.appendChild(hiddenAnchor);
          hiddenAnchor.click();
          document.body.removeChild(hiddenAnchor);

          // Restaura o botão após concluir
          setTimeout(() => {
            this.classList.remove('downloading');
            if (progressFill) progressFill.style.width = '0%';
            if (btnPercent) {
              btnPercent.style.display = 'none';
              btnPercent.textContent = '0%';
            }
            if (btnText) btnText.textContent = 'BAIXAR APK';
            if (btnIcon) btnIcon.setAttribute('icon', 'hugeicons:download-01');
          }, 2500);
        }
      }, 40); // Duração total aproximada de 1s
    });
  }

  /* =========================================================
     ANO ATUAL NO FOOTER
  ========================================================= */
  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }

});
