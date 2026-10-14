// ==========================================
// Hero Slideshow & Progress Animation
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.hero-slide');
  const progressItems = document.querySelectorAll('.progress-bar-item');
  
  if (slides.length === 0 || progressItems.length === 0) return;

  let currentIndex = 0;
  const slideIntervalTime = 5000; // 5 segundos por imagem
  let slideTimer;

  function goToSlide(index) {
slides.forEach(slide => slide.classList.remove('active'));

progressItems.forEach(item => {
item.classList.remove('active');

const fill = item.querySelector('.progress-fill');

if (fill) {
  fill.style.animation = 'none';
  fill.style.width = '0%';

  // Reinicia a animação do indicador
  void fill.offsetWidth;

  fill.style.animation = '';
}

});

currentIndex = index;

slides[currentIndex].classList.add('active');
progressItems[currentIndex].classList.add('active');
}

  function nextSlide() {
    let nextIndex = (currentIndex + 1) % slides.length;
    goToSlide(nextIndex);
  }

  function startSlider() {
    slideTimer = setInterval(nextSlide, slideIntervalTime);
  }

  function resetSlider() {
    clearInterval(slideTimer);
    startSlider();
  }

  // Permitir clique nos indicadores de progresso para mudar manualmente
  progressItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      goToSlide(index);
      resetSlider();
    });
  });

  // Iniciar carrossel automático
  startSlider();
});
