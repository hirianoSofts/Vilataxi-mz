// Carregamento automático do cabeçalho partilhado fixo
function loadSharedHeader() {
  const headerPlaceholder = document.getElementById('shared-header');
  if (!headerPlaceholder) return;

  // Deteta se estamos numa subpasta (ex: /download/)
  const isSubfolder = window.location.pathname.includes('/download/');
  const prefix = isSubfolder ? '../' : './';

  headerPlaceholder.innerHTML = `
    <div class="fixed-header-wrapper">
      <header class="topbar" id="top">
        <a class="brand" href="${prefix}index.html" aria-label="VilaTáxi — Início"><img src="${prefix}assets/vila-logo.png" alt="VilaTáxi"></a>
        <nav class="desktop-nav" aria-label="Navegação principal">
          <a href="${prefix}index.html#como-funciona">Como funciona</a>
          <a href="${prefix}index.html#servicos">Serviços</a>
          <a href="${prefix}index.html#motoristas">Motoristas</a>
          <a href="${prefix}index.html#sobre">Sobre nós</a>
        </nav>
        <div class="auth-actions">
          <a class="signin" href="#entrar">Sign in</a>
          <a class="login" href="#entrar">Login <i class="fi fi-rr-user"></i></a>
        </div>
        <button class="menu-toggle" aria-label="Abrir menu" aria-expanded="false"><i class="fi fi-rr-menu-burger"></i></button>
      </header>
      <div class="driver-strip">
        <span class="live-dot"></span>
        <span>Faça parte da mudança.</span>
        <a href="https://www.cadastro.govilataxi.online/">Seja motorista VilaTáxi <i class="fi fi-rr-arrow-right"></i></a>
      </div>
    </div>
    <div class="mobile-menu" aria-hidden="true">
      <a href="${prefix}index.html#como-funciona">Como funciona</a>
      <a href="${prefix}index.html#servicos">Serviços</a>
      <a href="${prefix}index.html#motoristas">Motoristas</a>
      <a href="${prefix}index.html#sobre">Sobre nós</a>
      <a href="${prefix}download/index.html">Baixar APK</a>
    </div>
  `;

  initMobileMenu();
}

// Inicialização do Menu Mobile
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const body = document.body;
  const mobileMenu = document.querySelector('.mobile-menu');

  if (!toggle || !mobileMenu) return;

  toggle.addEventListener('click', () => {
    const open = body.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    toggle.innerHTML = open ? '<i class="fi fi-rr-cross-small"></i>' : '<i class="fi fi-rr-menu-burger"></i>';
    mobileMenu.setAttribute('aria-hidden', String(!open));
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      body.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
      toggle.innerHTML = '<i class="fi fi-rr-menu-burger"></i>';
      mobileMenu.setAttribute('aria-hidden', 'true');
    });
  });
}

// Executar ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  loadSharedHeader();
  
  const yearEl = document.querySelector('#year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
