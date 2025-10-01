// =======================================================
// HERITAGE WALKS JAMMU - MAIN JAVASCRIPT
// =======================================================
console.log('Script loaded successfully');

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded, initializing website');
    initializeWebsite();
});

function initializeWebsite() {
    console.log('Initializing website...');
    handleMandalaLoading();
    initNavigation();
    initScrollEffects();
    initAnimations();
    initFormHandling();
    initHistoryCarousel(); 
    initBackgroundMusic(); 
    console.log('Website initialized successfully');
}

// =======================================================
// 1. ENHANCED LOADING SCREEN
// =======================================================
function handleMandalaLoading() {
    const loadingScreen = document.getElementById('loadingScreen');

    if (!loadingScreen) {
        console.log('Loading screen element not found');
        document.body.classList.remove('loading');
        return;
    }

    console.log('Loading screen found, starting animation...');

    // Add loading class to body to prevent scrolling
    document.body.classList.add('loading');

    // Hide loading screen after 2.5 seconds (faster loading)
    const hideTimer = setTimeout(() => {
        hideLoadingScreen();
    }, 2500);

    // Also hide on any click/touch (for impatient users)
    loadingScreen.addEventListener('click', () => {
        clearTimeout(hideTimer);
        hideLoadingScreen();
    });

    function hideLoadingScreen() {
        console.log('Hiding loading screen...');
        
        // Smooth fade out with improved transition
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transform = 'scale(0.95)';
        loadingScreen.style.visibility = 'hidden';
        
        // Remove loading class from body to restore scrolling
        document.body.classList.remove('loading');
        
        // Remove from DOM after transition completes
        setTimeout(() => {
            if (loadingScreen && loadingScreen.parentNode) {
                loadingScreen.parentNode.removeChild(loadingScreen);
                console.log('Loading screen removed from DOM');
            }
        }, 600);
    }
}

// =======================================================
// 2. NAVIGATION
// =======================================================
function initNavigation() {
    console.log('Initializing navigation...');

    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navbar || !navToggle || !navMenu) {
        console.log('Navigation elements not found, skipping navigation init');
        return;
    }

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active link highlighting
    updateActiveLink();
    window.addEventListener('scroll', updateActiveLink);
}

function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';
    sections.forEach(section => {
        // Adjust offset for fixed header height (70px + a buffer)
        const sectionTop = section.offsetTop - 100; 
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        // Check both href="#id" and href="#dogri-slogan"
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// =======================================================
// 3. SCROLL EFFECTS (Smooth Scroll)
// =======================================================
function initScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Determine offset for fixed header
                const offset = 70; 
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =======================================================
// 4. ENHANCED ANIMATIONS AND INTERSECTION OBSERVER
// =======================================================
function initAnimations() {
    // Enhanced fade in animation for sections
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply fade animation to various elements
    const animatedElements = document.querySelectorAll(
        '.walk-card, .team-member, .about-content, .carousel-slide, .section-header'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = `opacity 0.8s ease-out ${index * 0.1}s, transform 0.8s ease-out ${index * 0.1}s`;
        fadeObserver.observe(el);
    });

    // Staggered animation for team members
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
        member.style.transitionDelay = `${index * 0.15}s`;
    });

    // Add animate-in class styles via JavaScript
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// =======================================================
// 5. FORM HANDLING (Contact Form - kept for completeness)
// =======================================================
function initFormHandling() {
    // Logic removed as form is not present, but function kept to prevent errors.
}

// =======================================================
// 6. ENHANCED HISTORY CAROUSEL WITH INDICATORS
// =======================================================
function initHistoryCarousel() {
    const carouselInner = document.getElementById('historyCarousel');
    const slides = carouselInner ? carouselInner.querySelectorAll('.carousel-slide') : [];
    const prevButton = document.querySelector('.history-carousel-wrapper .prev');
    const nextButton = document.querySelector('.history-carousel-wrapper .next');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    let currentIndex = 0;
    const slideInterval = 5000; // 5 seconds per slide
    let autoRotate;

    if (!carouselInner || slides.length === 0) return;

    function updateCarousel() {
        // Smooth transition with transform
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    function goToNext() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }

    function goToPrev() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    function startAutoRotate() {
        clearInterval(autoRotate); 
        autoRotate = setInterval(goToNext, slideInterval);
    }
    
    // Manual navigation
    if (nextButton) nextButton.addEventListener('click', () => {
        goToNext();
        startAutoRotate();
    });
    
    if (prevButton) prevButton.addEventListener('click', () => {
        goToPrev();
        startAutoRotate();
    });

    // Indicator navigation
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
            startAutoRotate();
        });
    });

    // Pause on hover
    const carouselWrapper = document.querySelector('.history-carousel-wrapper');
    if (carouselWrapper) {
        carouselWrapper.addEventListener('mouseenter', () => {
            clearInterval(autoRotate);
        });
        
        carouselWrapper.addEventListener('mouseleave', () => {
            startAutoRotate();
        });
    }

    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;

    carouselInner.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    carouselInner.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) { // Minimum swipe distance
            if (diff > 0) {
                goToNext();
            } else {
                goToPrev();
            }
            startAutoRotate();
        }
    });

    // Initialize
    updateCarousel();
    startAutoRotate();
    console.log('Enhanced history carousel initialized with indicators and touch support.');
}

// =======================================================
// 7. BACKGROUND MUSIC IMPLEMENTATION
// =======================================================
function initBackgroundMusic() {
    const music = document.getElementById('backgroundMusic');
    const toggleButton = document.getElementById('musicToggle');
    let isPlaying = false;
    
    if (!music || !toggleButton) {
        return;
    }
    
    // Set initial state
    music.volume = 0.3; // Low volume for background
    toggleButton.textContent = '🔇';
    
    toggleButton.addEventListener('click', async () => {
        try {
            if (isPlaying) {
                music.pause();
                toggleButton.textContent = '🔇';
                isPlaying = false;
                console.log('Background music paused');
            } else {
                await music.play();
                toggleButton.textContent = '🔊';
                isPlaying = true;
                console.log('Background music playing');
            }
        } catch (error) {
            console.log('Audio playback failed:', error);
            // Fallback for browsers that require user interaction
            toggleButton.textContent = '🔇';
            showNotification('Click to enable background music', 'info');
        }
    });

    // Handle audio events
    music.addEventListener('ended', () => {
        toggleButton.textContent = '🔇';
        isPlaying = false;
    });

    music.addEventListener('error', () => {
        console.log('Audio loading failed - using fallback');
        toggleButton.style.opacity = '0.5';
    });
}


// =======================================================
// 8. UTILITY AND PERFORMANCE FUNCTIONS (Kept as is)
// =======================================================
function showNotification(message, type = 'info') {
    // Logic remains the same
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimizations (Throttling scroll events)
window.addEventListener('scroll', debounce(() => {
    // Add any throttled scroll events here if needed later
}, 16), { passive: true });

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Error handling
window.addEventListener('error', function (e) {
    console.error('JavaScript error:', e.error);
});

// Accessibility improvements (Escape key closes mobile menu)
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWebsite);
} else {
    initializeWebsite();
}

// Emergency fallback to ensure loading screen always disappears
setTimeout(() => {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen && loadingScreen.parentNode) {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        loadingScreen.style.display = 'none';
        document.body.classList.remove('loading');
        
        setTimeout(() => {
            if (loadingScreen && loadingScreen.parentNode) {
                loadingScreen.parentNode.removeChild(loadingScreen);
            }
        }, 500);
    }
}, 4000); // 4 second absolute emergency fallback

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    });
}
