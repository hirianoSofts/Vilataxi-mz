// Carregamento automático do cabeçalho partilhado
function loadSharedHeader() {
  const headerPlaceholder = document.getElementById('shared-header');
  if (!headerPlaceholder) return;

  // Deteta automaticamente a profundidade da página
  const pathname = window.location.pathname;
  const segments = pathname.split('/').filter(Boolean);

  // Se o caminho terminar num ficheiro HTML, ignora o nome do ficheiro
  const isFile = /\.[a-zA-Z0-9]+$/.test(segments[segments.length - 1] || '');
  const folderDepth = isFile ? segments.length - 1 : segments.length;

  // Cria o prefixo relativo: ./, ../, ../../, etc.
  const prefix = folderDepth > 0
    ? '../'.repeat(folderDepth)
    : './';

  // Links para a página inicial
  const home = `${prefix}index.html`;

  headerPlaceholder.innerHTML = `
    <div class="fixed-header-wrapper">
      <header class="topbar" id="top">

        <a class="brand" href="${home}" aria-label="VilaTáxi — Início">
          <img src="${prefix}assets/vila-logo.png" alt="VilaTáxi">
        </a>

        <nav class="desktop-nav" aria-label="Navegação principal">
          <a href="${home}#como-funciona">Como funciona</a>
          <a href="${home}#servicos">Serviços</a>
          <a href="${home}#motoristas">Motoristas</a>
          <a href="${home}#sobre">Sobre nós</a>
        </nav>

        <div class="auth-actions">
          <a class="signin" href="${home}#entrar">Entrar</a>
          <a class="login" href="${home}#entrar">
            Conecte-se <i class="fi fi-rr-user"></i>
          </a>
        </div>

        <button
          class="menu-toggle"
          aria-label="Abrir menu"
          aria-expanded="false"
          aria-controls="mobile-menu">
          <i class="fi fi-rr-menu-burger"></i>
        </button>

      </header>

      <div class="driver-strip">
        <span class="live-dot"></span>
        <span>Faça parte da mudança.</span>
        <a href="https://www.cadastro.vilataxi.me/">
          Seja motorista VilaTáxi
          <i class="fi fi-rr-arrow-right"></i>
        </a>
      </div>
    </div>

    <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
      <a href="${home}#como-funciona">Como funciona</a>
      <a href="${home}#servicos">Serviços</a>
      <a href="${home}#motoristas">Motoristas</a>
      <a href="${home}#sobre">Sobre nós</a>
      <a href="${prefix}download/index.html">Baixar APK</a>
    </div>
  `;

  initMobileMenu();
}

// Inicialização do menu mobile
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const body = document.body;
  const mobileMenu = document.querySelector('.mobile-menu');

  if (!toggle || !mobileMenu) return;

  toggle.addEventListener('click', () => {
    const open = body.classList.toggle('menu-open');

    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');

    toggle.innerHTML = open
      ? '<i class="fi fi-rr-cross-small"></i>'
      : '<i class="fi fi-rr-menu-burger"></i>';

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
