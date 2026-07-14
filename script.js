// ---------- Contact form: AJAX submission via FormSubmit ----------
(function initForm() {
  const form = document.getElementById('contactForm');
  const btn = document.getElementById('contactSubmitBtn');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMessage');

  if (!form) return;

  function showToast(message, type) {
    toast.className = 'toast ' + type + ' show';
    toastMsg.textContent = message;
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 5000);
  }

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Disable button and show loading state
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method || 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
        form.reset();
      } else {
        const errorData = await response.json();
        showToast(errorData.message || 'Something went wrong. Please try again.', 'error');
      }
    } catch (error) {
      showToast('Network error. Please check your connection and try again.', 'error');
    } finally {
      btn.disabled = false;
      btn.innerHTML = 'Get in touch';
    }
  });
})();

// ---------- Project Details Toggle ----------
function toggleDetails(btn) {
  const details = btn.nextElementSibling;
  const icon = btn.querySelector('i');
  if (details.classList.contains('open')) {
    details.classList.remove('open');
    btn.innerHTML = 'View Details <i class="fas fa-chevron-down"></i>';
  } else {
    details.classList.add('open');
    btn.innerHTML = 'Hide Details <i class="fas fa-chevron-up"></i>';
  }
}

// ---------- Nav: Scroll shrink & active state ----------
(function initNav() {
  const nav = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-links a:not(.btn)');
  
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        links.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.4, rootMargin: '0px 0px -60px 0px' });
  sections.forEach(s => observer.observe(s));
})();

// ---------- Theme Toggle ----------
(function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  const icon = toggle.querySelector('i');
  const stored = localStorage.getItem('theme');
  if (stored === 'dark') {
    document.documentElement.classList.add('dark-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
  }
  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark-mode');
    icon.classList.toggle('fa-moon', !isDark);
    icon.classList.toggle('fa-sun', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
})();

// ---------- Typing Effect (narrowed to target roles) ----------
(function initTyping() {
  const el = document.getElementById('typedText');
  const words = ['Technical Sales Engineer', 'Solutions Engineer'];
  let idx = 0, charIdx = 0, isDeleting = false;
  function type() {
    const current = words[idx];
    if (!isDeleting) {
      el.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        isDeleting = true;
        setTimeout(type, 2000);
        return;
      }
    } else {
      el.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        idx = (idx + 1) % words.length;
      }
    }
    setTimeout(type, isDeleting ? 60 : 120);
  }
  type();
})();

// ---------- Scroll Reveal ----------
(function initReveal() {
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });
  sections.forEach(s => observer.observe(s));
})();

// ---------- Mobile Menu ----------
(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

// ---------- Back to Top ----------
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  });
})();