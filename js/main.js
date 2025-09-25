// Immediately check navigation type and hide loading if needed
(function() {
    // Check navigation type immediately
    const isFromSameSite = document.referrer && 
                          document.referrer.includes(window.location.hostname) &&
                          !document.referrer.includes('google') &&
                          !document.referrer.includes('bing') &&
                          !document.referrer.includes('yahoo');
    
    const isRefresh = performance.getEntriesByType && 
                     performance.getEntriesByType('navigation')[0] &&
                     performance.getEntriesByType('navigation')[0].type === 'reload';
    
    // If coming from same site and not a refresh, hide loading immediately
    if (isFromSameSite && !isRefresh) {
        document.addEventListener('DOMContentLoaded', function() {
            const loadingScreen = document.getElementById('loadingScreen');
            const body = document.body;
            
            if (loadingScreen && body) {
                // Hide immediately without any animation
                loadingScreen.style.display = 'none';
                body.classList.remove('loading');
            }
        });
        return; // Exit early, don't run the main loading logic
    }
})();

// Loading Screen Logic - Only for Homepage on first load/refresh
let homepageImagesLoaded = false;

window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Only run loading screen on homepage
    if (!loadingScreen) return;
    
    // Check if loading was already handled by the immediate check above
    if (loadingScreen.style.display === 'none') return;
    
    const body = document.body;
    let progress = 0;
    const progressElement = document.querySelector('.loader-percentage');
    
    // Preload homepage background image specifically
    const bgImage = new Image();
    let imageLoaded = false;
    
    bgImage.onload = () => {
        imageLoaded = true;
        homepageImagesLoaded = true;
    };
    
    bgImage.onerror = () => {
        imageLoaded = true;
        homepageImagesLoaded = true;
    };
    
    bgImage.src = 'assets/images/bg.jpg';
    
    const updateProgress = () => {
        // Faster progress if image is already loaded
        const increment = imageLoaded ? Math.random() * 25 + 15 : Math.random() * 10 + 5;
        progress += increment;
        
        if (progress > 100) progress = 100;
        
        if (progressElement) {
            progressElement.textContent = Math.round(progress) + '%';
        }
        
        // Only finish if image is loaded AND progress is 100%
        if (progress >= 100 && imageLoaded) {
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                body.classList.remove('loading');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 300);
        } else {
            setTimeout(updateProgress, Math.random() * 200 + 100);
        }
    };
    
    // Start progress after a short delay
    setTimeout(updateProgress, 300);
});

// Preload other critical images (but don't wait for them)
const preloadImages = () => {
    const images = [
        'assets/images/apar.jpg',
        'assets/images/logo.jpg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

// Start preloading
preloadImages();

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
    let dark = localStorage.getItem('darkMode') !== 'false';
  
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
  