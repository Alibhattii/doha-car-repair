// ============================================
// Smooth Animation System
// Optimized with requestAnimationFrame
// ============================================

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Smooth scroll with easing
function smoothScrollTo(target, duration = 1000) {
    const targetElement = typeof target === 'string' ? document.querySelector(target) : target;
    if (!targetElement) return;
    
    const targetPosition = targetElement.offsetTop - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(timeElapsed / duration) * distance + startPosition;
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

// Optimized Intersection Observer (scoped names avoid clashes with animations.js)
const smoothObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const smoothAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            // Stagger children animations
            const children = entry.target.querySelectorAll('[data-stagger]');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, smoothObserverOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('[data-animate]').forEach(el => {
        smoothAnimationObserver.observe(el);
    });
});

// Smooth scroll progress with RAF
function createSmoothScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    let rafId = null;
    let lastScrollTop = 0;
    
    function updateProgress() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        
        // Smooth interpolation
        const currentWidth = parseFloat(progressBar.style.width) || 0;
        const targetWidth = scrolled;
        const newWidth = currentWidth + (targetWidth - currentWidth) * 0.1;
        
        progressBar.style.width = newWidth + '%';
        
        if (Math.abs(newWidth - targetWidth) > 0.1) {
            rafId = requestAnimationFrame(updateProgress);
        }
    }
    
    window.addEventListener('scroll', () => {
        if (!rafId) {
            rafId = requestAnimationFrame(updateProgress);
        }
    }, { passive: true });
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;
    
    // Show/hide button
    const handleScroll = throttle(() => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }, 100);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Smooth scroll to top
    backToTopBtn.addEventListener('click', () => {
        smoothScrollTo(0, 800);
    });
}

// Loading Screen - Removed

// Optimized Parallax with RAF - Reduced effect
function initSmoothParallax() {
    // Only apply subtle parallax to hero content, not cards
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;
    
    let rafId = null;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const heroHeight = document.querySelector('.hero')?.offsetHeight || 0;
        
        // Only apply parallax when hero is visible and limit the movement
        if (scrolled < heroHeight) {
            const speed = 0.1; // Much reduced speed
            const yPos = -(scrolled * speed);
            heroContent.style.transform = `translateY(${yPos}px)`;
        } else {
            heroContent.style.transform = 'translateY(0)';
        }
        
        rafId = null;
    }
    
    window.addEventListener('scroll', () => {
        if (!rafId) {
            rafId = requestAnimationFrame(updateParallax);
        }
    }, { passive: true });
}

// Optimized Magnetic Effect - Only for buttons, not cards
function initMagneticEffect() {
    const magneticElements = document.querySelectorAll('.btn');
    
    magneticElements.forEach(element => {
        let currentX = 0;
        let currentY = 0;
        let targetX = 0;
        let targetY = 0;
        
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            targetX = x * 0.1; // Reduced movement
            targetY = y * 0.1;
        });
        
        element.addEventListener('mouseleave', () => {
            targetX = 0;
            targetY = 0;
        });
        
        // Smooth interpolation with RAF
        function animate() {
            currentX += (targetX - currentX) * 0.1;
            currentY += (targetY - currentY) * 0.1;
            
            if (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
                element.style.transform = `translate(${currentX}px, ${currentY}px)`;
                requestAnimationFrame(animate);
            } else {
                element.style.transform = 'translate(0, 0)';
            }
        }
        
        element.addEventListener('mouseenter', () => {
            animate();
        });
    });
}

// Smooth page transitions
function initPageTransitions() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    smoothScrollTo(target, 1000);
                }
            }
        });
    });
}

// Initialize all on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    createSmoothScrollProgress();
    initBackToTop();
    initSmoothParallax();
    initMagneticEffect();
    initPageTransitions();
    
    // Ensure cards don't move on scroll
    document.querySelectorAll('.service-card, .team-card, .testimonial-card, .feature-card').forEach(card => {
        card.style.transform = 'translateY(0)';
    });
    
    // Remove parallax on mobile for performance
    if (window.innerWidth < 768) {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = 'none';
        }
    }
});

// Performance: Reduce animations on low-end devices
if ('connection' in navigator) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
        document.documentElement.classList.add('reduce-motion');
    }
}

// Respect user's motion preferences
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('reduce-motion');
}

