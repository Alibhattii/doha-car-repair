// ============================================
// Small UI Effects
// Button ripple micro-interaction on click.
// (Scroll-reveal, parallax and the navbar/back-to-top
//  logic live in smooth-animations.js / main.js — kept
//  in one place each to avoid duplicate work on scroll.)
// ============================================

document.addEventListener('click', function (e) {
    const button = e.target.classList.contains('btn') ? e.target : e.target.closest('.btn');
    if (!button) return;

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
    setTimeout(() => ripple.remove(), 600);
});

// Inject the ripple keyframes + positioning once
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
.btn { position: relative; overflow: hidden; }
.ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.35);
    transform: scale(0);
    animation: rippleAnim 0.6s ease-out;
    pointer-events: none;
}
@keyframes rippleAnim {
    to { transform: scale(2.5); opacity: 0; }
}
`;
document.head.appendChild(rippleStyle);
