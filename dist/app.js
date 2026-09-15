const progress = document.querySelector('.progress span');
const previewModal = document.querySelector('#preview-modal');
const toast = document.querySelector('.toast');
const postDetail = document.querySelector('#post-detail');
const detailLabels = { Wajib: 'POS WAJIB', Aman: 'POS AMAN', Bebas: 'POS BEBAS', 'Masa Depan': 'POS MASA DEPAN' };

const updateProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = scrollable > 0 ? `${(window.scrollY / scrollable) * 100}%` : '0%';
};
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelector('[data-preview]').addEventListener('click', () => {
  previewModal.classList.add('open');
  previewModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
});
document.querySelectorAll('[data-close]').forEach((button) => {
  button.addEventListener('click', () => {
    previewModal.classList.remove('open');
    previewModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  });
});
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && previewModal.classList.contains('open')) {
    previewModal.classList.remove('open');
    previewModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
});

document.querySelectorAll('.post-card').forEach((card, index) => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.post-card').forEach((item) => item.classList.remove('active'));
    card.classList.add('active');
    const title = card.dataset.title;
    postDetail.innerHTML = `<div class="detail-index">0${index + 1}</div><div><span>${detailLabels[title]}</span><h3>${title === 'Wajib' ? 'Hidup tetap berjalan.' : title === 'Aman' ? 'Tenang sebelum tumbuh.' : title === 'Bebas' ? 'Nikmati tanpa rasa bersalah.' : 'Uangmu punya arah.'}</h3><p>${card.dataset.copy}</p></div>`;
    postDetail.animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 330, easing: 'cubic-bezier(.2,.8,.2,1)' });
  });
});

document.querySelector('[data-buy]').addEventListener('click', () => {
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 4200);
});

document.querySelectorAll('.magnetic').forEach((button) => {
  button.addEventListener('pointermove', (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = button.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.08;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.08;
    button.style.transform = `translate(${x}px, ${y}px)`;
  });
  button.addEventListener('pointerleave', () => { button.style.transform = ''; });
});
