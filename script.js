// Dark mode toggle functionality
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeIcon = document.getElementById('darkModeIcon');
const html = document.documentElement;

// Check for saved user preference or use system preference
const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const currentTheme = localStorage.getItem('theme') || (userPrefersDark ? 'dark' : 'light');

// Apply the current theme
if (currentTheme === 'dark') {
    html.classList.add('dark');
    darkModeIcon.classList.replace('fa-moon', 'fa-sun');
}

// Toggle dark/light mode
darkModeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    
    // Update icon
    darkModeIcon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', 
                                 isDark ? 'fa-sun' : 'fa-moon');
    
    // Save preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('show');
    
    // Change menu icon based on state
    const isOpen = mobileMenu.classList.contains('show');
    const icon = mobileMenuButton.querySelector('svg');
    if (isOpen) {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
    } else {
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('show');
        mobileMenuButton.querySelector('svg').innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
    });
});

// Initialize testimonial carousel
function initializeCarousel() {
    const carousel = document.querySelector('.testimonial-carousel');
    if (carousel) {
        let isDown = false;
        let startX;
        let scrollLeft;

        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });

        carousel.addEventListener('mouseleave', () => {
            isDown = false;
        });

        carousel.addEventListener('mouseup', () => {
            isDown = false;
        });

        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed
            carousel.scrollLeft = scrollLeft - walk;
        });

        // Touch support
        carousel.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });

        carousel.addEventListener('touchend', () => {
            isDown = false;
        });

        carousel.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });
    }
}

// Initialize page turn effect
function initializePageTurns() {
    const pageTurns = document.querySelectorAll('.page-turn');
    pageTurns.forEach(pageTurn => {
        // Ensure the back content is properly positioned
        const pageTurnBack = pageTurn.querySelector('.page-turn-back');
        pageTurnBack.style.position = 'absolute';
        pageTurnBack.style.top = '0';
        pageTurnBack.style.left = '0';
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeCarousel();
    initializePageTurns();
    
    // Quick hack to ensure page turn backs are positioned correctly initially
    setTimeout(() => {
        initializePageTurns();
    }, 500);
});
