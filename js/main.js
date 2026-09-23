// ============================================
// Main JavaScript File
// Navigation, Mobile Menu, Scroll Animations
// ============================================

// Promo bar: dismiss + remember for the rest of this browser session
function closePromoBar() {
    const bar = document.getElementById('promoBar');
    if (bar) {
        bar.style.display = 'none';
        try { sessionStorage.setItem('promoDismissed', '1'); } catch (e) {}
    }
}
(function () {
    try {
        if (sessionStorage.getItem('promoDismissed') === '1') {
            const bar = document.getElementById('promoBar');
            if (bar) bar.style.display = 'none';
        }
    } catch (e) {}
})();

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    // Note: scroll-reveal ([data-animate] -> .animated) is handled once,
    // in smooth-animations.js, to avoid running two observers on the same elements.

    // Navbar scroll effect and Back to Top button
    const navbar = document.querySelector('.navbar');
    const backToTopBtn = document.getElementById('backToTop');
    
    let navScrollRaf = null;
    window.addEventListener('scroll', function() {
        if (navScrollRaf) return;
        navScrollRaf = requestAnimationFrame(function() {
            const currentScroll = window.pageYOffset;

            // Navbar shadow on scroll
            if (navbar) navbar.classList.toggle('scrolled', currentScroll > 100);

            // Back to top button visibility
            if (backToTopBtn) backToTopBtn.classList.toggle('visible', currentScroll > 400);

            navScrollRaf = null;
        });
    }, { passive: true });

    // Back to top button click handler
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Lazy loading images for mobile optimization
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading supported
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        });
    } else {
        // Fallback for browsers without native lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            if (img.src) {
                img.dataset.src = img.src;
                img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
            }
            imageObserver.observe(img);
        });
    }
});

