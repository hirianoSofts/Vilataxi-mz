// Carregamento automático do rodapé partilhado
function loadSharedFooter() {
  const footerPlaceholder = document.getElementById('shared-footer');
  if (!footerPlaceholder) return;

  // Deteta se estamos numa subpasta (ex: /download/)
  const isSubfolder = window.location.pathname.includes('/download/');
  const prefix = isSubfolder ? '../' : './';

  footerPlaceholder.innerHTML = `
    <footer class="footer" id="sobre">
      <div class="footer-main">
        <div class="footer-brand">
          <a class="brand brand-footer" href="${prefix}index.html#inicio">
            <img src="${prefix}assets/vilataxi-logo.png" alt="VilaTáxi">
          </a>
          <p>Movemos pessoas. Aproximamos destinos.<br>Mobilidade local feita para si.</p>
          <div class="socials">
            <a href="#" aria-label="Facebook"><i class="fi fi-brands-facebook"></i></a>
            <a href="#" aria-label="Instagram"><i class="fi fi-brands-instagram"></i></a>
            <a href="#" aria-label="WhatsApp"><i class="fi fi-brands-whatsapp"></i></a>
          </div>
        </div>
        <div class="footer-column">
          <h4>Explorar</h4>
          <a href="${prefix}index.html#inicio">Início</a>
          <a href="${prefix}index.html#como-funciona">Como funciona</a>
          <a href="${prefix}index.html#servicos">Serviços</a>
          <a href="${prefix}index.html#sobre">Sobre nós</a>
        </div>
        <div class="footer-column">
          <h4>Junte-se a nós</h4>
          <a href="https://www.cadastro.govilataxi.online/">Seja motorista</a>
          <a href="${prefix}download/index.html">Descarregar aplicação</a>
          <a href="#entrar">Entrar na conta</a>
        </div>
        <div class="footer-column footer-contact">
          <h4>Fale connosco</h4>
          <a href="mailto:info@govilataxi.online"><i class="fi fi-rr-envelope"></i> info@govilataxi.online</a>
          <span><i class="fi fi-rr-marker"></i> Vilankulos, Moçambique</span>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© <span id="year"></span> VilaTáxi. Todos os direitos reservados.</span>
        <div>
          <a href="#privacidade">Privacidade</a>
          <a href="#termos">Termos de utilização</a>
        </div>
        <a class="back-top" href="#top" aria-label="Voltar ao topo"><i class="fi fi-rr-arrow-up"></i></a>
      </div>
    </footer>
  `;

  // Atualizar o ano atual dinamicamente
  const yearEl = footerPlaceholder.querySelector('#year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

document.addEventListener('DOMContentLoaded', loadSharedFooter);
