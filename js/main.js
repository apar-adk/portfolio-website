document.addEventListener('DOMContentLoaded', () => {
    // Menu toggle
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav-links');
    toggle.addEventListener('click', () => nav.classList.toggle('show'));
  
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
  