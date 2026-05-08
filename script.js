// ===================================================
// CS2 WEBSITE — script.js
// ===================================================

// ============ 1. NAVBAR ============
const navbar = document.getElementById('navbar');
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
const allNavLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveLink();
});

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

allNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ============ 2. AKTĪVĀ SAITE ============
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  allNavLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

// ============ 3. SKAITĻU ANIMĀCIJA ============
function animateNumber(el, target, duration) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    if (target > 10000) {
      el.textContent = Math.floor(start).toLocaleString('lv-LV') + '+';
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

const statNums = document.querySelectorAll('.stat-num');
let statsAnimated = false;

const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      statNums.forEach(el => {
        const target = parseInt(el.dataset.target);
        animateNumber(el, target, 2000);
      });
    }
  });
}, { threshold: 0.5 });

heroObserver.observe(document.querySelector('.hero-stats'));

// ============ 4. TIMELINE ANIMĀCIJA ============
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 150);
    }
  });
}, { threshold: 0.2 });

timelineItems.forEach(item => {
  timelineObserver.observe(item);
});

// ============ 5. SPĒLĒTĀJU FILTRĒŠANA ============
const filterBtns = document.querySelectorAll('.filter-btn');
const playerCards = document.querySelectorAll('.player-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    playerCards.forEach(card => {
      if (filter === 'all' || card.dataset.role === filter) {
        card.classList.remove('hidden');
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
          card.style.transition = 'opacity 0.3s, transform 0.3s';
        }, 50);
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ============ 6. GALERIJA LIGHTBOX ============
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxContent = document.getElementById('lightboxContent');

const mapInfo = {
  1: { name: 'Dust II', year: '2001 / 2023', desc: 'Dust II ir ikoniskākā un pazīstamākā karte Counter-Strike vēsturē. Sākotnēji radīta 2001. gadā, tā tika pilnīgi pārveidota CS:GO un vēlreiz atjaunota CS2 ar Source 2 dzinēja iespējām.' },
  2: { name: 'Mirage', year: '2013 / 2023', desc: 'Mirage ir Marokas tirgus stilā veidota karte, kas tika pievienota CS:GO 2013. gadā. Tā ir viena no populārākajām kartēm profesionālajā scenā.' },
  3: { name: 'Inferno', year: '2012 / 2023', desc: 'Inferno attēlo Itālijas Toskānas pilsētu ar šaurām ieliņām. Slavena ar saspringtām B bombsite cīņām "Bananā".' },
  4: { name: 'Nuke', year: '2000 / 2023', desc: 'Nuke ir unikālākā karte mappool sarakstā — tai ir divi stāvi (Upper Nuke un Lower Nuke). Atomelektrostacijas tematika.' },
  5: { name: 'Ancient', year: '2021 / 2023', desc: 'Ancient ir salīdzinoši jauna karte ar Maiju civilizācijas temātiku. Džungļu vide un tempļu koridori rada unikālu atmosfēru.' },
  6: { name: 'Anubis', year: '2022 / 2023', desc: 'Anubis ir ēģiptiešu tematika ar Nīlas deltas vidi un seno tempļu arhitektūru. Karte kļuva par Active Duty mappool daļu 2022. gadā.' }
};

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const imgId = parseInt(item.dataset.img);
    const info = mapInfo[imgId];
    lightboxContent.innerHTML = `
      <h2 style="font-family:'Bebas Neue',sans-serif;font-size:2.5rem;color:var(--accent);margin-bottom:0.5rem;">${info.name}</h2>
      <p style="color:var(--text-muted);font-size:0.8rem;letter-spacing:0.15em;margin-bottom:1.5rem;">KARTE — ${info.year}</p>
      <p style="color:#e8e8f0;line-height:1.7;">${info.desc}</p>
    `;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

// ============ 7. FORMAS VALIDĀCIJA ============
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const successText = document.getElementById('successText');

function showError(fieldId, errorId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  field.classList.add('invalid');
  error.textContent = message;
  return false;
}

function clearError(fieldId, errorId) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  field.classList.remove('invalid');
  error.textContent = '';
}

document.getElementById('name').addEventListener('input', function () {
  if (this.value.trim().length >= 2) clearError('name', 'nameError');
});
document.getElementById('email').addEventListener('input', function () {
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value.trim())) clearError('email', 'emailError');
});
document.getElementById('message').addEventListener('input', function () {
  if (this.value.trim().length >= 10) clearError('message', 'messageError');
});

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();
  let isValid = true;

  const name = document.getElementById('name').value.trim();
  clearError('name', 'nameError');
  if (name.length < 2) {
    showError('name', 'nameError', 'Vārdam jābūt vismaz 2 burtiem!');
    isValid = false;
  }

  const email = document.getElementById('email').value.trim();
  clearError('email', 'emailError');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showError('email', 'emailError', 'Lūdzu ievadi pareizu e-pasta adresi!');
    isValid = false;
  }

  const mapSelected = document.querySelector('input[name="map"]:checked');
  document.getElementById('mapError').textContent = '';
  if (!mapSelected) {
    document.getElementById('mapError').textContent = 'Lūdzu izvēlies iemīļotāko karti!';
    isValid = false;
  }

  const message = document.getElementById('message').value.trim();
  clearError('message', 'messageError');
  if (message.length < 10) {
    showError('message', 'messageError', 'Ziņojumam jābūt vismaz 10 simboliem!');
    isValid = false;
  }

  if (isValid) {
    const rank = document.getElementById('rank');
    const rankText = rank.value ? rank.options[rank.selectedIndex].text : 'nav norādīts';
    const mapText = mapSelected ? mapSelected.value : '';
    successText.textContent = `Paldies, ${name}! Tavs ziņojums ir nosūtīts. Rangs: ${rankText}. Iemīļotā karte: ${mapText}.`;
    formSuccess.classList.add('show');
    contactForm.reset();
    setTimeout(() => {
      formSuccess.classList.remove('show');
    }, 6000);
  }
});