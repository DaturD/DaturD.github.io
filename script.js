// Portfolio interactions — plain JavaScript, compatible with GitHub Pages.
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
}

// Theme preference is stored locally in the browser only.
const themeToggle = document.querySelector('.theme-toggle');
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const applyThemeColor = () => {
  if (!themeColorMeta) return;
  themeColorMeta.setAttribute('content', document.body.classList.contains('light-theme') ? '#F5EBDD' : '#211713');
};
if (themeToggle) {
  const savedTheme = localStorage.getItem('deniel-portfolio-theme');
  if (savedTheme === 'light') document.body.classList.add('light-theme');
  applyThemeColor();
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    localStorage.setItem('deniel-portfolio-theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
    applyThemeColor();
  });
}

// Project category filters.
const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(item => item.classList.toggle('active', item === button));
  const filter = button.dataset.filter;
  projectCards.forEach(card => {
    card.hidden = filter !== 'all' && card.dataset.category !== filter;
  });
}));

// EduSync image modal
const modal = document.getElementById('edusync-modal');
const modalClose = modal?.querySelector('.modal-close');
const modalPrev = modal?.querySelector('.modal-prev');
const modalNext = modal?.querySelector('.modal-next');
const modalImage = document.getElementById('modal-image');
const modalImageTitle = document.getElementById('modal-image-title');
const modalImageCounter = document.getElementById('modal-image-counter');

const images = [
  { src: 'assets/projects/edusync/main.png', title: 'EduSync AI Main' },
  { src: 'assets/projects/edusync/Screenshot%202026-10-18%20205349.png', title: 'Screenshot 1' },
  { src: 'assets/projects/edusync/Screenshot%202026-10-18%20205358.png', title: 'Screenshot 2' },
  { src: 'assets/projects/edusync/Screenshot%202026-10-18%20205405.png', title: 'Screenshot 3' },
  { src: 'assets/projects/edusync/Screenshot%202026-10-18%20205411.png', title: 'Screenshot 4' },
  { src: 'assets/projects/edusync/Screenshot%202026-10-18%20205416.png', title: 'Screenshot 5' },
  { src: 'assets/projects/edusync/Screenshot%202026-10-18%20205450.png', title: 'Screenshot 6' },
  { src: 'assets/projects/edusync/Screenshot%202026-10-18%20205522.png', title: 'Screenshot 7' },
  { src: 'assets/projects/edusync/Screenshot%202026-10-18%20205530.png', title: 'Screenshot 8' },
  { src: 'assets/projects/edusync/Screenshot%202026-10-18%20205557.png', title: 'Screenshot 9' },
  { src: 'assets/projects/edusync/Screenshot%202026-10-18%20205607.png', title: 'Screenshot 10' },
  { src: 'assets/projects/edusync/Screenshot%202026-10-18%20205614.png', title: 'Screenshot 11' },
  { src: 'assets/projects/edusync/Screenshot%202026-10-18%20205627.png', title: 'Screenshot 12' },
  { src: 'assets/projects/edusync/Screenshot%202026-10-18%20205638.png', title: 'Screenshot 13' },
];

let currentIndex = 0;

function openEduSyncGallery() {
  if (!modal) return;
  currentIndex = 0;
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  showImage(currentIndex);
}

function closeModal() {
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
modalClose?.addEventListener('click', closeModal);
modal?.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});

function showImage(index) {
  const img = images[index];
  modalImage.src = img.src;
  modalImageTitle.textContent = img.title;
  modalImageCounter.textContent = `${index + 1} of ${images.length}`;
  currentIndex = index;
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
}
function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
}

modalNext?.addEventListener('click', nextImage);
modalPrev?.addEventListener('click', prevImage);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
  if (e.key === 'ArrowRight') nextImage();
  if (e.key === 'ArrowLeft') prevImage();
});

// Subtle reveal on scroll
const revealTargets = document.querySelectorAll('.section-heading, .panel, .skill-card, .project-card, .cert-card, .contact-panel, .resume-cta');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealTargets.forEach(el => el.classList.add('reveal'));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach(el => observer.observe(el));
}

// Mark the current navigation section.
const sections = document.querySelectorAll('main section[id]');
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const targetId = entry.target.id;
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${targetId}`);
      });
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach(section => sectionObserver.observe(section));
}

// Contact form opens the visitor's default email app; no server required.
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const recipient = 'daturdeniel@gmail.com'; // Replace with your real email.
    const subject = `Portfolio inquiry from ${data.get('name')}`;
    const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`;
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
document.querySelector('#year').textContent = new Date().getFullYear();
