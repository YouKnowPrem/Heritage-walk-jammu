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
    initBackgroundMusic(); // # Re-enabled and updated
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
        navToggle.classList.toggle('active'); // This line enables the CSS for the X animation
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
        // Increased threshold to 0.2 to trigger animations earlier and less distracting
        threshold: 0.2, 
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

    // Apply fade animation to key structural elements only (less distracting/fewer animations)
    const animatedElements = document.querySelectorAll(
        '.walk-card, .session-card, .team-member, .about-content, .section-header'
    );
    
    // Reduce the stagger effect duration for quicker load
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)'; // Reduced movement
        el.style.transition = `opacity 0.6s ease-out ${index * 0.05}s, transform 0.6s ease-out ${index * 0.05}s`;
        fadeObserver.observe(el);
    });

    // Staggered animation for team members
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
        member.style.transitionDelay = `${index * 0.1}s`; // Reduced delay
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
// 7. BACKGROUND MUSIC IMPLEMENTATION (Updated for two tracks and fade-in)
// =======================================================
function initBackgroundMusic() {
    const music1 = document.getElementById('backgroundMusic1');
    const music2 = document.getElementById('backgroundMusic2');
    const toggleButton = document.getElementById('musicToggle');
    
    if (!music1 || !music2 || !toggleButton) {
        console.warn('Music elements not found. Skipping music init.');
        return;
    }

    // Configuration
    const TARGET_VOLUME = 0.4; // 40% volume as requested
    const FADE_DURATION = 3000; // 3 seconds fade as requested
    const FADE_INTERVAL = 50; // 50ms interval for smooth fade
    let isPlaying = false;
    let currentTrack = music1;
    let nextTrack = music2;
    let fadeInterval = null;

    // Set initial volume extremely low
    music1.volume = 0.0;
    music2.volume = 0.0;
    toggleButton.innerHTML = '&#128263;'; // Muted icon

    function startFadeIn(audioElement) {
        let volume = audioElement.volume;
        const step = TARGET_VOLUME / (FADE_DURATION / FADE_INTERVAL);

        if (fadeInterval) {
            clearInterval(fadeInterval);
        }

        fadeInterval = setInterval(() => {
            volume += step;
            if (volume >= TARGET_VOLUME) {
                volume = TARGET_VOLUME;
                clearInterval(fadeInterval);
                fadeInterval = null;
            }
            audioElement.volume = volume;
        }, FADE_INTERVAL);
    }

    function stopFade() {
        if (fadeInterval) {
            clearInterval(fadeInterval);
            fadeInterval = null;
        }
    }

    async function toggleMusic() {
        stopFade(); // Stop any ongoing fades

        try {
            if (isPlaying) {
                // Pause and reset volume immediately on stop
                music1.pause();
                music2.pause();
                music1.volume = 0.0;
                music2.volume = 0.0;
                toggleButton.innerHTML = '&#128263;'; // Muted icon
                isPlaying = false;
                console.log('Background music paused.');
            } else {
                // Start the first track
                await currentTrack.play();
                startFadeIn(currentTrack);
                toggleButton.innerHTML = '&#128266;'; // Playing icon
                isPlaying = true;
                console.log('Background music started with smooth fade-in.');
            }
        } catch (error) {
            console.error('Audio playback failed:', error);
            toggleButton.innerHTML = '&#128263;';
            isPlaying = false;
            showNotification('Click a second time to start music (browser permission required)', 'info');
        }
    }

    function switchTracks() {
        // Swap current and next tracks
        const temp = currentTrack;
        currentTrack = nextTrack;
        nextTrack = temp;
        
        // Reset the finished track and prepare the next
        nextTrack.pause();
        nextTrack.currentTime = 0;

        // Start playing the new current track with fade in
        currentTrack.play().then(() => {
            startFadeIn(currentTrack);
            console.log(`Switched to track ${currentTrack.dataset.trackId}`);
        }).catch(e => {
            console.error('Track switch failed:', e);
            // Attempt to restart the playlist if switch fails
            currentTrack = music1;
            nextTrack = music2;
            toggleMusic(); 
        });
    }
    
    // Event listeners for track end to handle cycling
    music1.addEventListener('ended', switchTracks);
    music2.addEventListener('ended', switchTracks);

    // Main toggle listener
    toggleButton.addEventListener('click', toggleMusic);
    
    // Handle global errors for audio elements
    music1.addEventListener('error', () => console.error('Audio track 1 failed to load.'));
    music2.addEventListener('error', () => console.error('Audio track 2 failed to load.'));
}


// =======================================================
// 8. UTILITY AND PERFORMANCE FUNCTIONS
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
                // Only load if the image uses data-src (lazy loading placeholder)
                if (img.dataset.src) { 
                    img.src = img.dataset.src;
                }
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
