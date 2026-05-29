// ============================================
// Slider Functionality
// Team and Testimonials Horizontal Scroll
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Team Slider
    const teamSlider = document.getElementById('teamSlider');
    if (teamSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        teamSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            teamSlider.style.cursor = 'grabbing';
            startX = e.pageX - teamSlider.offsetLeft;
            scrollLeft = teamSlider.scrollLeft;
        });

        teamSlider.addEventListener('mouseleave', () => {
            isDown = false;
            teamSlider.style.cursor = 'grab';
        });

        teamSlider.addEventListener('mouseup', () => {
            isDown = false;
            teamSlider.style.cursor = 'grab';
        });

        teamSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - teamSlider.offsetLeft;
            const walk = (x - startX) * 2;
            teamSlider.scrollLeft = scrollLeft - walk;
        });

        // Touch support
        let touchStartX = 0;
        let touchScrollLeft = 0;

        teamSlider.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].pageX - teamSlider.offsetLeft;
            touchScrollLeft = teamSlider.scrollLeft;
        });

        teamSlider.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const x = e.touches[0].pageX - teamSlider.offsetLeft;
            const walk = (x - touchStartX) * 2;
            teamSlider.scrollLeft = touchScrollLeft - walk;
        });
    }

    // Testimonials Slider
    const testimonialsSlider = document.getElementById('testimonialsSlider');
    if (testimonialsSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        testimonialsSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            testimonialsSlider.style.cursor = 'grabbing';
            startX = e.pageX - testimonialsSlider.offsetLeft;
            scrollLeft = testimonialsSlider.scrollLeft;
        });

        testimonialsSlider.addEventListener('mouseleave', () => {
            isDown = false;
            testimonialsSlider.style.cursor = 'grab';
        });

        testimonialsSlider.addEventListener('mouseup', () => {
            isDown = false;
            testimonialsSlider.style.cursor = 'grab';
        });

        testimonialsSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialsSlider.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialsSlider.scrollLeft = scrollLeft - walk;
        });

        // Touch support
        let touchStartX = 0;
        let touchScrollLeft = 0;

        testimonialsSlider.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].pageX - testimonialsSlider.offsetLeft;
            touchScrollLeft = testimonialsSlider.scrollLeft;
        });

        testimonialsSlider.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const x = e.touches[0].pageX - testimonialsSlider.offsetLeft;
            const walk = (x - touchStartX) * 2;
            testimonialsSlider.scrollLeft = touchScrollLeft - walk;
        });
    }
});

