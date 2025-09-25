document.addEventListener('DOMContentLoaded', () => {
    // Menu toggle
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav-links');
    const overlay = document.getElementById('nav-overlay');
    
    // Toggle menu on hamburger click
    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        nav.classList.toggle('show');
        if (overlay) overlay.classList.toggle('show');
    });
    
    // Close menu when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', () => {
            nav.classList.remove('show');
            overlay.classList.remove('show');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !toggle.contains(e.target)) {
            nav.classList.remove('show');
            if (overlay) overlay.classList.remove('show');
        }
    });
    
    // Close menu when clicking on nav links
    nav.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            nav.classList.remove('show');
            if (overlay) overlay.classList.remove('show');
        }
    });
  
    // Dark Mode
    const darkToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    let dark = localStorage.getItem('darkMode') === 'true';
  
    const applyMode = () => {
      body.classList.toggle('dark-mode', dark);
      darkToggle.innerHTML = `<i class="fas fa-${dark ? 'sun' : 'moon'}"></i>`;
      localStorage.setItem('darkMode', dark);
    };
  
    darkToggle.addEventListener('click', () => {
      dark = !dark;
      applyMode();
    });
  
    applyMode(); // Apply on page load
  
    // Fade-in animation
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.1 }
    );
  
    sections.forEach(sec => observer.observe(sec));
  
    // Year for footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  });
  