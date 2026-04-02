const yearEl = document.getElementById('year');
const themeToggle = document.getElementById('themeToggle');

yearEl.textContent = new Date().getFullYear();

const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') document.body.classList.add('dark');

const themeIcon = document.getElementById('themeIcon');

const setThemeIcon = () => {
  const isDark = document.body.classList.contains('dark');
  if (isDark) {
    themeIcon.src = 'images/moon.png';
    themeIcon.alt = 'Switch to light mode';
    themeToggle.classList.remove('sun');
    themeToggle.classList.add('moon');
  } else {
    themeIcon.src = 'images/sun.png';
    themeIcon.alt = 'Switch to dark mode';
    themeToggle.classList.remove('moon');
    themeToggle.classList.add('sun');
  }
};

setThemeIcon();

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  setThemeIcon();
});

// ===== SCROLL ANIMATIONS FOR SECTIONS =====
function initScrollAnimations() {
  const sections = document.querySelectorAll('.section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });
  
  sections.forEach(section => observer.observe(section));
}

// ===== NEON CARD GLOW EFFECT =====
function initCardGlowEffect() {
  const cards = document.querySelectorAll('.neon-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--mouse-x', '50%');
      card.style.setProperty('--mouse-y', '50%');
    });
  });
}

// Initialize all effects
initScrollAnimations();
initCardGlowEffect();

// Smooth internal navigation
for (const link of document.querySelectorAll('a[href^="#"]')) {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
}
