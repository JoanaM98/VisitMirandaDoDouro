const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');
toggle?.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  toggle.textContent = open ? '×' : '☰';
});
links?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.textContent = '☰';
}));

const directions = name => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ', Miranda do Douro, Portugal')}`;
const restaurantData = {
  'Restaurante Miradouro': '+351 273 431 259',
  'Restaurante O Mirandês': '+351 273 431 418',
  'Jordão': '+351 273 095 618',
  'São Pedro': '+351 273 431 321',
  'Casa da Balbina': '+351 273 432 394',
  'Capa D’Honras': '+351 934 981 905',
  'Mercearia Tomé': '+351 273 431 061',
  'Pizzaria Gorgonzola': '+351 938 376 919',
  'Bombeiros Tapas Bar': '+351 911 502 120',
  'Buteko': '+351 273 417 092',
  'Like Bar': '+351 936 751 818'
};
document.querySelectorAll('.restaurant-card, .restaurant-list article').forEach(card => {
  const title = card.querySelector('h3')?.textContent.trim();
  if (!title) return;
  const number = restaurantData[title];
  card.querySelector('span:not(:first-child)')?.remove();
  const actions = document.createElement('div'); actions.className = 'restaurant-actions';
  actions.innerHTML = `<a href="${directions(title)}" target="_blank" rel="noopener">Direções ↗</a>${number ? `<a href="tel:${number.replace(/\s/g, '')}">${number}</a>` : ''}`;
  (card.querySelector('div') || card).append(actions);
});

const activityData = {
  'Cruzeiro Ambiental no Douro Internacional': { phone: null, place: 'Estação Biológica Internacional, Miranda do Douro' },
  'Percursos pedestres': { phone: null, place: 'Centro de Apoio ao Caminhante, Miranda do Douro'},
  'Centro histórico': { phone: null, place: 'Centro Histórico, Miranda do Douro' }
};
const activityList = document.querySelector('.experience-list');
activityList?.querySelectorAll('article').forEach(card => {
  const title = card.querySelector('h3')?.textContent.trim(); const data = activityData[title]; if (!data) return;
  const actions = document.createElement('div'); actions.className = 'activity-actions';
  actions.innerHTML = `<a href="${directions(data.place)}" target="_blank" rel="noopener">Direções ↗</a>`;
  card.querySelector('div')?.append(actions);
});
if (activityList) {
  const cruise = activityList.querySelector('article');
  cruise?.querySelector('.activity-actions')?.insertAdjacentHTML('beforeend', '<a href="https://www.europarques.com/pt/ticket/arribes/" target="_blank" rel="noopener">Website ↗</a>');
}

const hikingCard = [...document.querySelectorAll('.experience-list article')].find(card => card.querySelector('h3')?.textContent.trim() === 'Percursos pedestres');

hikingCard?.querySelector('.activity-actions')?.insertAdjacentHTML('beforeend', '<a href="https://freguesiamirandadodouro.pt/apoio-ao-caminhante/" target="_blank" rel="noopener">Centro de apoio ao caminhante ↗</a>');




const phoneSvg = '<svg class="phone-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.64a2 2 0 0 1-.45 2.11L8.01 9.74a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.86.29 1.74.5 2.64.62A2 2 0 0 1 22 16.92Z"/></svg>';
document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
  const number = link.textContent.trim();
  link.classList.add('phone-link');
  link.innerHTML = `${phoneSvg}<span>${number}</span>`;
});

const dayTripDetails = {
  'Mogadouro': { journey: '~ 46 km · ~ 30 min', tourism: 'https://www.mogadouro.pt/pages/17' },
  'Bragança': { journey: '~ 73 km · ~ 1 hora', tourism: 'https://www.visitbraganca.com/' },
  'Zamora': { journey: '~ 55 km · ~ 50 min', tourism: 'https://www.turismoenzamora.es/' },
  'Puebla de Sanabria': { journey: '~ 99 km · ~ 1 hora 30 min', tourism: 'https://www.pueblasanabria.com/' },
  'Salamanca': { journey: '~ 97 km · ~ 1 hora 20 min', tourism: 'https://salamanca.es/es/' },
  'Valladolid': { journey: '~ 156 km · ~ 1 hora 40 min', tourism: 'https://www.info.valladolid.es/' }
};

const highlightMainNames = (element, phrases) => {
  if (!element || !phrases?.length) return;
  const escaped = [...phrases]
    .sort((first, second) => second.length - first.length)
    .map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  element.innerHTML = element.textContent.replace(
    new RegExp(`(${escaped.join('|')})`, 'g'),
    '<strong class="content-highlight"><em>$1</em></strong>'
  );
};

const daytripHighlights = [
  'Castelo de Mogadouro', 'Convento e Igreja de São Francisco', 'Igreja da Misericórdia', 'centro histórico', 'O Baraço',
  'Parque Natural de Montesinho', 'Cidadela de Bragança', 'Castelo de Bragança', 'Torre de Menagem', 'Domus Municipalis',
  'Catedral', 'Castelo', 'muralhas medievais', 'bodegas',
  'Castelo dos Condes de Benavente', 'Parque Natural do Lago de Sanabria', 'Centro del Lobo Ibérico Félix Rodríguez de la Fuente',
  'Plaza Mayor', 'Catedrais Velha e Nova', 'Universidade de Salamanca', 'Casa das Conchas',
  'Catedral de Valladolid', 'Igreja de San Pablo', 'Museu Nacional de Escultura', 'Ribera del Duero'
];

document.querySelectorAll('.daytrip-grid article').forEach((card) => {
  const title = card.querySelector('h3')?.textContent.trim();
  const details = dayTripDetails[title];
  if (!details) return;
  const description = card.querySelector('p');
  highlightMainNames(description, daytripHighlights.filter((phrase) => description?.textContent.includes(phrase)));
  const info = card.querySelectorAll('p')[1];
  if (info) info.innerHTML = `<b>${details.journey}</b>`;
  const directions = card.querySelector('a[href*="google.com/maps"]');
  directions?.insertAdjacentHTML('beforebegin', `<a class="discover-link" href="${details.tourism}" target="_blank" rel="noopener">Descobrir ↗</a>`);
  directions?.parentElement?.classList.add('daytrip-actions');
});

const activityHighlights = [
  'Reserva da UNESCO Meseta Ibérica', 'Estação Biológica Internacional',
  'Centro de Atividades Lúdico-Pedagógicas do Burro de Miranda', 'PINTA', 'AEPGA',
  'Centro do Burro de Miranda', 'Miradouro da Sé',
  'Centro de Interpretação Turístico e Ambiental', 'São João das Arribas',
  'Penedo Amarelo', 'Castrilhouço', 'Cais da Roda'
];

document.querySelectorAll('.experience-list .exp-desc').forEach((description) => {
  highlightMainNames(description, activityHighlights.filter((phrase) => description.textContent.includes(phrase)));
});

const bookingForm = document.querySelector('#booking-request-form');
const bookingStatus = document.querySelector('#booking-form-status');
bookingForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!bookingForm.reportValidity()) return;

  const checkIn = bookingForm.querySelector('#check-in');
  const checkOut = bookingForm.querySelector('#check-out');
  if (checkIn?.value && checkOut?.value && checkOut.value <= checkIn.value) {
    bookingStatus.textContent = 'A data de check-out deve ser posterior à data de check-in.';
    bookingStatus.className = 'form-status error';
    checkOut.focus();
    return;
  }

  const submitButton = bookingForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = 'A enviar…';
  bookingStatus.textContent = '';
  bookingStatus.className = 'form-status';

  try {
    const values = Object.fromEntries(new FormData(bookingForm).entries());
    const response = await fetch('https://formsubmit.co/ajax/casadopoco.mirandadodouro@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(values)
    });
    if (!response.ok) throw new Error('Erro no envio');
    bookingForm.reset();
    bookingStatus.textContent = 'Pedido enviado com sucesso.';
    bookingStatus.className = 'form-status success';
  } catch (error) {
    bookingStatus.textContent = 'Não foi possível enviar o pedido neste momento. Por favor, contacte-nos por email ou telemóvel.';
    bookingStatus.className = 'form-status error';
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Enviar Pedido';
  }
});



const villageFestivals = document.querySelector('.village-festivals');
if (villageFestivals?.tagName === 'DETAILS') {
  const content = villageFestivals.querySelector('div')?.innerHTML || '';
  const openFestivals = document.createElement('article');
  openFestivals.className = 'village-festivals';
  openFestivals.innerHTML = `<h3><i> Hai fiesta na aldé </i>
  </h3><div>${content}</div>`;
  const eventsGrid = document.querySelector('.events-grid');
  if (eventsGrid) {
    eventsGrid.append(openFestivals);
    villageFestivals.remove();
  } else {
    villageFestivals.replaceWith(openFestivals);
  }
}




const expressionPairs = [['Oulá', 'Olá'], ['Buonas Tardes', 'Boa tarde'], ['Buonos Dies', 'Bom dia'], ['Oubrigado', 'Obrigado/a'], ['Cinta de la raposa', 'Arco-íris'], ['Cachico', 'Um bocadinho']];
document.querySelectorAll('.expressions p').forEach((item, index) => {
  const pair = expressionPairs[index];
  if (pair) item.innerHTML = `<b>${pair[0]}</b><span>${pair[1]}</span>`;
});



