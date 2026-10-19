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

function getEventDetail(label) {
  const detail = [...document.querySelectorAll('.detail')].find((item) => item.querySelector('.detail-label').textContent.includes(label));
  if (!detail) return 'À définir';
  const value = detail.querySelector('.detail-value').cloneNode(true);
  value.querySelector('.edit-hint')?.remove();
  return value.textContent.trim() || 'À définir';
}

function drawSadCake(context) {
  context.save();
  context.translate(600, 755);

  context.fillStyle = '#d7b89f';
  context.beginPath();
  context.ellipse(0, 117, 236, 28, 0, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = '#fffaf6';
  context.beginPath();
  context.ellipse(0, 108, 230, 27, 0, 0, Math.PI * 2);
  context.fill();

  const cake = context.createLinearGradient(-160, 0, 160, 0);
  cake.addColorStop(0, '#b9445d');
  cake.addColorStop(.5, '#e18a91');
  cake.addColorStop(1, '#b9445d');
  context.fillStyle = cake;
  context.beginPath();
  context.roundRect(-170, -10, 340, 112, 18);
  context.fill();

  context.fillStyle = '#fff3e3';
  context.beginPath();
  context.moveTo(-178, -25);
  context.bezierCurveTo(-170, -68, -124, -77, -85, -59);
  context.bezierCurveTo(-37, -83, 6, -75, 27, -57);
  context.bezierCurveTo(75, -81, 135, -70, 178, -28);
  context.lineTo(178, -8);
  context.bezierCurveTo(153, 9, 143, -7, 125, 3);
  context.bezierCurveTo(104, 17, 93, 7, 80, -1);
  context.bezierCurveTo(59, -14, 43, 5, 23, 5);
  context.bezierCurveTo(1, 5, -9, -9, -29, -3);
  context.bezierCurveTo(-50, 5, -63, 16, -82, 5);
  context.bezierCurveTo(-103, -7, -117, 5, -137, 8);
  context.bezierCurveTo(-160, 11, -172, -3, -178, -8);
  context.closePath();
  context.fill();

  context.fillStyle = '#4b202e';
  context.beginPath();
  context.arc(-54, 35, 8, 0, Math.PI * 2);
  context.arc(54, 35, 8, 0, Math.PI * 2);
  context.fill();
  context.strokeStyle = '#4b202e';
  context.lineWidth = 7;
  context.lineCap = 'round';
  context.beginPath();
  context.arc(0, 76, 29, Math.PI * 1.15, Math.PI * 1.85);
  context.stroke();

  context.fillStyle = '#7ec8d1';
  for (const x of [-72, 72]) {
    context.beginPath();
    context.moveTo(x, 50);
    context.bezierCurveTo(x - 10, 67, x - 12, 78, x, 82);
    context.bezierCurveTo(x + 12, 78, x + 10, 67, x, 50);
    context.fill();
  }

  for (const x of [-58, 28]) {
    context.fillStyle = '#fffaf6';
    context.fillRect(x, -105, 18, 67);
    context.strokeStyle = '#d67588';
    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(x, -88);
    context.lineTo(x + 18, -99);
    context.moveTo(x, -62);
    context.lineTo(x + 18, -73);
    context.stroke();
    context.fillStyle = '#efad5c';
    context.beginPath();
    context.ellipse(x + 9, -116, 10, 17, 0, 0, Math.PI * 2);
    context.fill();
  }

  context.restore();
}

function createTicketCanvas(name, guestCount, reference) {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 1600;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Canvas indisponible');

  context.fillStyle = '#f8efeb';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = '#bb9454';
  context.lineWidth = 3;
  context.strokeRect(42, 42, 1116, 1516);
  context.strokeStyle = '#dfc6ad';
  context.lineWidth = 1;
  context.strokeRect(57, 57, 1086, 1486);

  context.textAlign = 'center';
  context.fillStyle = '#982e45';
  context.font = 'bold 22px Arial, sans-serif';
  context.fillText('LE COMITÉ DES CŒURS BRISÉS · ÉDITION ANNIVERSAIRE', 600, 128);
  context.fillStyle = '#4b202e';
  context.font = 'bold 70px Georgia, serif';
  context.fillText('BILLET OFFICIEL', 600, 225);
  context.fillStyle = '#982e45';
  context.font = 'bold 28px Arial, sans-serif';
  context.fillText('MISSION : SOUTENIR MARINE (ET FINIR LE GÂTEAU)', 600, 284);

  context.setLineDash([10, 10]);
  context.strokeStyle = '#bb9454';
  context.beginPath();
  context.moveTo(110, 330);
  context.lineTo(1090, 330);
  context.stroke();
  context.setLineDash([]);

  context.fillStyle = '#886d70';
  context.font = 'bold 21px Arial, sans-serif';
  context.fillText('LE / LA TÉMOIN DE CET EXPLOIT', 600, 386);
  context.fillStyle = '#4b202e';
  context.font = 'bold 58px Georgia, serif';
  const nameFontSize = Math.min(58, 940 / Math.max(context.measureText(name).width, 1) * 58);
  context.font = `bold ${nameFontSize}px Georgia, serif`;
  context.fillText(name, 600, 451, 940);
  context.fillStyle = '#982e45';
  context.font = 'bold 19px Arial, sans-serif';
  context.fillText(`BILLET VALABLE POUR ${guestCount} ${guestCount === 1 ? 'PERSONNE' : 'PERSONNES'} · APPLAUDISSEMENTS INCLUS`, 600, 500);

  context.fillStyle = '#bb9454';
  context.font = 'bold 21px Arial, sans-serif';
  context.fillText('LE GÂTEAU A DÉJÀ PLUS DE CHANCE QUE MARINE EN AMOUR', 600, 572);
  drawSadCake(context);
  context.fillStyle = '#886d70';
  context.font = 'italic 23px Georgia, serif';
  context.fillText('Il est fourré à la crème… et au soutien émotionnel.', 600, 928);

  context.fillStyle = '#4b202e';
  context.font = 'bold 25px Arial, sans-serif';
  context.fillText('RENDEZ-VOUS À LA CÉRÉMONIE', 600, 1010);
  const eventDetails = [
    ['DATE', getEventDetail('Date')],
    ['HEURE', getEventDetail('Heure')],
    ['LIEU', getEventDetail('Lieu')]
  ];
  eventDetails.forEach(([label, value], index) => {
    const y = 1080 + index * 94;
    context.textAlign = 'left';
    context.fillStyle = '#bb9454';
    context.font = 'bold 18px Arial, sans-serif';
    context.fillText(label, 150, y);
    context.fillStyle = '#4b202e';
    context.font = '26px Georgia, serif';
    context.fillText(value, 330, y, 700);
    context.strokeStyle = '#dfc6ad';
    context.beginPath();
    context.moveTo(150, y + 38);
    context.lineTo(1050, y + 38);
    context.stroke();
  });

  context.textAlign = 'center';
  context.fillStyle = '#982e45';
  context.font = 'bold 21px Arial, sans-serif';
  context.fillText('DRESS CODE : CHIC, FESTIF ET PRÊT À DIRE « TU VAS TROUVER QUELQU’UN »', 600, 1380, 950);
  context.fillStyle = '#886d70';
  context.font = '18px Arial, sans-serif';
  context.fillText(`N° ${reference} · À PRÉSENTER À L’ENTRÉE · ACCÈS AU GÂTEAU SOUS RÉSERVE`, 600, 1470);
  return canvas;
}

function createPdf(jpegBytes, width, height) {
  const encoder = new TextEncoder();
  const chunks = [];
  let byteLength = 0;
  const offsets = [0];
  const append = (bytes) => {
    chunks.push(bytes);
    byteLength += bytes.length;
  };
  const appendText = (text) => append(encoder.encode(text));
  const addObject = (number, contents) => {
    offsets[number] = byteLength;
    appendText(`${number} 0 obj\n${contents}\nendobj\n`);
  };

  appendText('%PDF-1.4\n');
  addObject(1, '<< /Type /Catalog /Pages 2 0 R >>');
  addObject(2, '<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
  addObject(3, '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>');
  offsets[4] = byteLength;
  appendText(`4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${width} /Height ${height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`);
  append(jpegBytes);
  appendText('\nendstream\nendobj\n');
  const pageContent = encoder.encode('q\n595.28 0 0 841.89 0 0 cm\n/Im0 Do\nQ');
  offsets[5] = byteLength;
  appendText(`5 0 obj\n<< /Length ${pageContent.length} >>\nstream\n`);
  append(pageContent);
  appendText('\nendstream\nendobj\n');

  const xrefOffset = byteLength;
  appendText('xref\n0 6\n0000000000 65535 f \n');
  for (let number = 1; number <= 5; number += 1) {
    appendText(`${String(offsets[number]).padStart(10, '0')} 00000 n \n`);
  }
  appendText(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);

  const pdfBytes = new Uint8Array(byteLength);
  let position = 0;
  chunks.forEach((chunk) => {
    pdfBytes.set(chunk, position);
    position += chunk.length;
  });
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

let ticketUrl;
const guestNameInput = document.querySelector('#guest-name');
guestNameInput.addEventListener('input', () => guestNameInput.setCustomValidity(''));

document.querySelector('#rsvp-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = guestNameInput.value.trim();
  const guestCount = Number(document.querySelector('#guest-count').value);
  const thanks = document.querySelector('#thanks');
  const download = document.querySelector('#ticket-download');
  if (!form.reportValidity()) return;
  if (!name) {
    guestNameInput.setCustomValidity('Saisis un nom pour personnaliser le billet.');
    guestNameInput.reportValidity();
    return;
  }

  thanks.textContent = 'Préparation du billet officiel…';
  download.hidden = true;
  try {
    const reference = `MAR-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 900 + 100)}`;
    const canvas = createTicketCanvas(name, guestCount, reference);
    const jpegBlob = await new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Impossible de créer l’image du billet'));
      }, 'image/jpeg', .94);
    });
    const pdf = createPdf(new Uint8Array(await jpegBlob.arrayBuffer()), canvas.width, canvas.height);
    if (ticketUrl) URL.revokeObjectURL(ticketUrl);
    ticketUrl = URL.createObjectURL(pdf);
    const fileName = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase();
    download.href = ticketUrl;
    download.download = `billet-marine-${fileName || 'invite'}.pdf`;
    download.hidden = false;
    thanks.textContent = `🎉 Billet créé pour ${name} ! Montre-le à l’entrée — il n’a pas été envoyé à l’organisateur.`;
    throwConfetti();
    download.focus();
  } catch (error) {
    console.error('La création du billet PDF a échoué.', error);
    thanks.textContent = 'Oups, le billet n’a pas pu être créé. Réessaie ou imprime cette page depuis ton navigateur.';
  }
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
