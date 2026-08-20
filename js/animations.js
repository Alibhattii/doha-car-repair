// ============================================
// Advanced Animation Effects
// Particle effects, scroll progress, etc.
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Scroll progress + magnetic effects live in smooth-animations.js (avoid duplicates)
    createParticles();
    
    // Parallax effect is now handled in smooth-animations.js with reduced effect
    // addParallaxEffect(); // Disabled to prevent text disappearing
    
    // Add typing effect to hero title (optional)
    // addTypingEffect();
});

// Scroll Progress Indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Particle Effects
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    hero.appendChild(particlesContainer);
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        
        // Random size
        const size = 2 + Math.random() * 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random opacity
        particle.style.opacity = 0.3 + Math.random() * 0.7;
        
        particlesContainer.appendChild(particle);
    }
}

// Magnetic Effect for Buttons
function addMagneticEffect() {
    const magneticElements = document.querySelectorAll('.btn, .service-card, .team-card, .testimonial-card');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.1;
            const moveY = y * 0.1;
            
            element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        element.addEventListener('mouseleave', function() {
            element.style.transform = 'translate(0, 0)';
        });
    });
}

// Parallax Effect
function addParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.hero-content, .service-card, .team-card');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Typing Effect (Optional)
function addTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid white';
    
    let i = 0;
    const typeInterval = setInterval(function() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
            heroTitle.style.borderRight = 'none';
        }
    }, 100);
}

// Add ripple effect to buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
        const button = e.target.classList.contains('btn') ? e.target : e.target.closest('.btn');
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for advanced animations (unique names avoid script clashes)
const advancedObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const advancedAnimationObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Add stagger effect for children
            const children = entry.target.children;
            Array.from(children).forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, advancedObserverOptions);

// Observe all animated elements
document.querySelectorAll('[data-animate]').forEach(el => {
    advancedAnimationObserver.observe(el);
});

// Add glow effect on scroll - Reduced effect
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroHeight = hero.offsetHeight;
        // Only apply brightness change when in hero section
        if (scrolled < heroHeight) {
            const brightness = Math.max(70, 100 - (scrolled / heroHeight) * 20);
            hero.style.filter = `brightness(${brightness}%)`;
        }
    }
}, { passive: true });

// Smooth reveal for sections - Fixed to prevent disappearing
const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            // Keep it visible once revealed
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Only apply to sections that should animate, not all sections
document.querySelectorAll('section:not(.hero)').forEach(section => {
    // Don't set initial opacity to 0 if already visible
    if (!section.classList.contains('revealed')) {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    }
    revealObserver.observe(section);
});

