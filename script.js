const START_DATE = new Date('2024-10-09T00:00:00');
const confettiLayer = document.querySelector('#confetti');
const egg = document.querySelector('#easter-egg');
const easterEggs = [
  'Netflix lui-même commence à s’inquiéter.',
  'Même son lit pense qu’ils sont colocataires.',
  'Tinder a signalé sa disparition.',
  'Deux ans de garantie constructeur préservée.'
];
let candleCount = 0;
let eggTimeout;

function updateElapsed() {
  const elapsedDays = Math.max(0, Math.floor((Date.now() - START_DATE.getTime()) / 86400000));
  document.querySelector('#elapsed-count').textContent = `${elapsedDays.toLocaleString('fr-FR')} jours`;
}

function animateStats() {
  document.querySelectorAll('[data-count]').forEach((counter) => {
    const target = Number(counter.dataset.count);
    if (target === 0) {
      counter.textContent = '0';
      return;
    }
    const started = performance.now();
    const duration = 1300;
    function tick(now) {
      const progress = Math.min((now - started) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      counter.textContent = Math.round(target * eased).toLocaleString('fr-FR');
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

function throwConfetti() {
  const colors = ['#982e45', '#edb5ba', '#e9cb8a', '#fffaf6', '#d67588'];
  for (let index = 0; index < 115; index += 1) {
    const piece = document.createElement('span');
    piece.className = `confetti${Math.random() > .72 ? ' round' : ''}`;
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty('--drift', `${Math.round(Math.random() * 240 - 120)}px`);
    piece.style.setProperty('--spin', `${Math.round(Math.random() * 1080 - 540)}deg`);
    piece.style.animationDelay = `${Math.random() * .65}s`;
    confettiLayer.append(piece);
    piece.addEventListener('animationend', () => piece.remove(), { once: true });
  }
}

function showEgg(message) {
  egg.textContent = message;
  egg.classList.add('show');
  window.clearTimeout(eggTimeout);
  eggTimeout = window.setTimeout(() => egg.classList.remove('show'), 3200);
}

document.querySelector('#rsvp-button').addEventListener('click', () => {
  throwConfetti();
  document.querySelector('#thanks').textContent = 'Merci pour ton soutien. Marine en aura besoin pour sa troisième année.';
});

document.querySelector('#candle-button').addEventListener('click', () => {
  candleCount += 1;
  const counter = document.querySelector('#candle-count');
  counter.textContent = candleCount;
  counter.classList.remove('counter-flash');
  void counter.offsetWidth;
  counter.classList.add('counter-flash');
  if (candleCount % 5 === 0) showEgg('La lumière est là. Les prétendants, toujours pas.');
});

document.querySelectorAll('[contenteditable="true"]').forEach((field) => {
  field.addEventListener('focus', () => {
    const hint = field.querySelector('.edit-hint');
    if (hint) hint.remove();
  }, { once: true });
});

document.addEventListener('click', (event) => {
  if (event.target.closest('button, [contenteditable="true"]')) return;
  const sparkle = document.createElement('span');
  sparkle.className = 'sparkle-cursor';
  sparkle.textContent = '✦';
  sparkle.style.left = `${event.clientX}px`;
  sparkle.style.top = `${event.clientY}px`;
  document.body.append(sparkle);
  sparkle.addEventListener('animationend', () => sparkle.remove(), { once: true });
});

let tapCount = 0;
let tapReset;
document.querySelector('.medallion').addEventListener('click', () => {
  tapCount += 1;
  window.clearTimeout(tapReset);
  tapReset = window.setTimeout(() => { tapCount = 0; }, 1100);
  if (tapCount === 5) {
    tapCount = 0;
    showEgg(easterEggs[Math.floor(Math.random() * easterEggs.length)]);
  }
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    if (entry.target.querySelector('[data-count]')) animateStats();
    revealObserver.unobserve(entry.target);
  });
}, { threshold: .15 });
document.querySelectorAll('.reveal').forEach((section) => revealObserver.observe(section));
updateElapsed();
window.setInterval(updateElapsed, 60000);
