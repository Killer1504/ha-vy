/**
 * Woman's Day Love Letter — Interactive Script
 * For: Hà Vy 🌸
 */

document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
  initPetals();
  initScrollReveal();
  initHeroSequence();
  initMusicPlayer();
  initFloatingHearts();
});

/* ===========================
   LOADING SCREEN
   =========================== */
function initLoadingScreen() {
  const loader = document.getElementById('loadingScreen');
  const minLoadTime = 2000;
  const startTime = Date.now();

  window.addEventListener('load', () => {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, minLoadTime - elapsed);

    setTimeout(() => {
      loader.classList.add('hidden');
      // Trigger hero sequence after loading screen fades
      setTimeout(() => startHeroSequence(), 400);
    }, remaining);
  });
}

/* ===========================
   HERO ENTRANCE SEQUENCE
   =========================== */
let heroStarted = false;

function initHeroSequence() {
  // Elements are initially hidden via CSS
}

function startHeroSequence() {
  if (heroStarted) return;
  heroStarted = true;

  const heroEls = document.querySelectorAll('.reveal-hero');
  heroEls.forEach((el) => {
    const delay = parseInt(el.dataset.delay, 10) * 350 + 200;
    setTimeout(() => el.classList.add('active'), delay);
  });
}

/* ===========================
   FLOATING PETALS
   =========================== */
function initPetals() {
  const container = document.getElementById('petalsContainer');
  if (!container) return;

  const petalColors = [
    '#FFB5C2', '#FFD4DC', '#FF8C7C',
    '#E89AAB', '#FFE8ED', '#D4A574',
  ];

  function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('petal');

    const size = Math.random() * 12 + 8;
    const left = Math.random() * 100;
    const duration = Math.random() * 6 + 6;
    const delay = Math.random() * 4;
    const drift = (Math.random() - 0.5) * 200;
    const spin = Math.random() * 720 - 360;
    const color = petalColors[Math.floor(Math.random() * petalColors.length)];

    petal.style.setProperty('--size', `${size}px`);
    petal.style.setProperty('--duration', `${duration}s`);
    petal.style.setProperty('--delay', `${delay}s`);
    petal.style.setProperty('--drift', `${drift}px`);
    petal.style.setProperty('--spin', `${spin}deg`);
    petal.style.setProperty('--petal-color', color);
    petal.style.left = `${left}%`;

    container.appendChild(petal);

    // Cleanup after animation cycle
    setTimeout(() => {
      if (petal.parentNode) petal.remove();
    }, (duration + delay) * 1000);
  }

  // Initial burst
  for (let i = 0; i < 15; i++) {
    createPetal();
  }

  // Continuous petals
  setInterval(() => {
    if (document.visibilityState === 'visible') {
      createPetal();
    }
  }, 800);
}

/* ===========================
   SCROLL REVEAL
   =========================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;

          // Stagger for reason cards
          if (el.classList.contains('reason-card')) {
            const index = parseInt(el.dataset.index, 10) || 1;
            el.style.setProperty('--stagger', index);
          }

          el.classList.add('active');
          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* ===========================
   MUSIC PLAYER
   =========================== */
function initMusicPlayer() {
  const player = document.getElementById('musicPlayer');
  const btn = document.getElementById('musicToggle');
  const audio = document.getElementById('bgMusic');

  if (!btn || !audio) return;

  let isPlaying = false;

  btn.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
      player.classList.remove('playing');
    } else {
      audio.play().catch(() => {
        // Audio play failed — likely no source or user gesture required
        console.log('🎵 Thêm file nhạc vào assets/song.mp3 để nghe nhạc nền');
      });
      player.classList.add('playing');
    }
    isPlaying = !isPlaying;
  });

  audio.addEventListener('ended', () => {
    player.classList.remove('playing');
    isPlaying = false;
  });

  audio.addEventListener('error', () => {
    // Silently handle missing audio file
  });
}

/* ===========================
   FLOATING HEARTS (Wishes Section)
   =========================== */
function initFloatingHearts() {
  const container = document.getElementById('heartsContainer');
  const wishesSection = document.getElementById('wishes');
  if (!container || !wishesSection) return;

  const hearts = ['💗', '💕', '💖', '🩷', '♥', '🌸', '🌺'];
  let heartInterval = null;

  function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');

    const emoji = hearts[Math.floor(Math.random() * hearts.length)];
    heart.textContent = emoji;

    const size = Math.random() * 16 + 12;
    const left = Math.random() * 100;
    const duration = Math.random() * 4 + 5;
    const delay = Math.random() * 3;
    const drift = (Math.random() - 0.5) * 100;
    const spin = Math.random() * 90 - 45;

    heart.style.setProperty('--heart-size', `${size}px`);
    heart.style.setProperty('--float-duration', `${duration}s`);
    heart.style.setProperty('--float-delay', `${delay}s`);
    heart.style.setProperty('--heart-drift', `${drift}px`);
    heart.style.setProperty('--heart-spin', `${spin}deg`);
    heart.style.left = `${left}%`;
    heart.style.fontSize = `${size}px`;

    container.appendChild(heart);

    setTimeout(() => {
      if (heart.parentNode) heart.remove();
    }, (duration + delay) * 1000);
  }

  // Observe wishes section
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !heartInterval) {
          // Initial burst
          for (let i = 0; i < 8; i++) {
            createHeart();
          }
          // Continuous hearts
          heartInterval = setInterval(createHeart, 600);
        } else if (!entry.isIntersecting && heartInterval) {
          clearInterval(heartInterval);
          heartInterval = null;
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(wishesSection);
}

/* ===========================
   SMOOTH SCROLL INDICATOR
   =========================== */
document.addEventListener('click', (e) => {
  const scrollIndicator = e.target.closest('.scroll-indicator');
  if (scrollIndicator) {
    const tribute = document.getElementById('tribute');
    if (tribute) {
      tribute.scrollIntoView({ behavior: 'smooth' });
    }
  }
});

/* ===========================
   PARALLAX ON SCROLL (subtle)
   =========================== */
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;

      // Parallax hero circles
      const circles = document.querySelectorAll('.circle');
      circles.forEach((circle, i) => {
        const speed = (i + 1) * 0.03;
        circle.style.transform = `translateY(${scrollY * speed}px)`;
      });

      // Fade scroll indicator
      const scrollIndicator = document.getElementById('scrollIndicator');
      if (scrollIndicator) {
        const opacity = Math.max(0, 1 - scrollY / 200);
        scrollIndicator.style.opacity = opacity;
      }

      ticking = false;
    });
    ticking = true;
  }
});
