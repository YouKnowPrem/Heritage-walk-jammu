// Advanced Heritage Loading Animation
document.addEventListener('DOMContentLoaded', function () {
    const loader = document.getElementById('heritage-loader');
    const progressCounter = document.getElementById('progress-counter');
    const progressBar = document.querySelector('.progress-bar');
    
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15 + 5; // Random increment between 5-20
        if (progress > 100) progress = 100;
        
        progressCounter.textContent = Math.floor(progress);
        
        // Update progress bar
        const circumference = 2 * Math.PI * 50; // radius = 50
        const offset = circumference - (progress / 100) * circumference;
        progressBar.style.strokeDashoffset = offset;
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            
            // Complete loading animation
            setTimeout(() => {
                loader.classList.add('fade-out');
                setTimeout(() => {
                    loader.style.display = 'none';
                    // Trigger entrance animations
                    document.body.classList.add('loaded');
                    animateOnLoad();
                    initializeCarousel();
                }, 800);
            }, 500);
        }
    }, 100);
});

// Enhanced entrance animations
function animateOnLoad() {
    const sections = document.querySelectorAll('section, .made-by-section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.style.animation = 'fastFadeIn 0.6s ease forwards';
            section.style.opacity = '1';
        }, index * 100);
    });

    // Trigger hero animations
    setTimeout(() => {
        triggerHeroAnimations();
    }, 800);
}

// Hero Creative Animations
function triggerHeroAnimations() {
    // Animate floating heritage icons
    const floatingIcons = document.querySelectorAll('.floating-heritage-icon');
    floatingIcons.forEach((icon, index) => {
        setTimeout(() => {
            icon.style.opacity = '0.2';
            icon.style.animation = 'floatHeritage 8s ease-in-out infinite';
        }, index * 500);
    });
}

// Enhanced Automatic Carousel for Previous Walks
function initializeCarousel() {
    const track = document.getElementById('carousel-track');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const indicatorsContainer = document.getElementById('carousel-indicators');

    if (!track || items.length === 0) return; // Safety check

    let currentIndex = 0;
    let autoSlideInterval;
    let isTransitioning = false;

    // Create indicators
    items.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });

    const indicators = document.querySelectorAll('.indicator');

    // Update carousel display with smooth transition
    function updateCarousel(instant = false) {
        if (isTransitioning && !instant) return;

        isTransitioning = true;

        // Hide all items
        items.forEach(item => item.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Show current item with fade effect
        setTimeout(() => {
            items[currentIndex].classList.add('active');
            indicators[currentIndex].classList.add('active');

            // Move track
            track.style.transform = `translateX(-${currentIndex * 100}%)`;

            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }, instant ? 0 : 50);
    }

    // Go to specific slide
    function goToSlide(index) {
        if (index === currentIndex || isTransitioning) return;
        currentIndex = index;
        updateCarousel();
        resetAutoSlide();
    }

    // Next slide
    function nextSlide() {
        if (isTransitioning) return;
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    }

    // Previous slide
    function prevSlide() {
        if (isTransitioning) return;
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel();
    }

    // Auto slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    function resetAutoSlide() {
        stopAutoSlide();
        setTimeout(startAutoSlide, 1000); // Restart after 1 second
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    // Pause auto-slide on hover
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', stopAutoSlide);
    carouselContainer.addEventListener('mouseleave', startAutoSlide);

    // Enhanced touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    let startY = 0;
    let endY = 0;

    carouselContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });

    carouselContainer.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diffX = startX - endX;
        const diffY = Math.abs(startY - endY);

        // Only handle horizontal swipes (ignore vertical scrolling)
        if (Math.abs(diffX) > swipeThreshold && diffY < 100) {
            if (diffX > 0) {
                nextSlide(); // Swipe left - next slide
            } else {
                prevSlide(); // Swipe right - previous slide
            }
            resetAutoSlide();
        }
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoSlide();
        }
    });

    // Initialize carousel
    updateCarousel(true);

    // Start auto-slide after a short delay
    setTimeout(startAutoSlide, 2000);

    console.log(`Heritage carousel initialized with ${items.length} photos`);
}

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});



// Lazy Loading for Gallery Images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading when DOM is loaded
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add scroll effect to navbar
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(250, 247, 242, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = 'var(--background-light)';
        navbar.style.backdropFilter = 'none';
    }
});

// Gallery Modal (Optional Enhancement)
function initGalleryModal() {
    const galleryItems = document.querySelectorAll('.gallery-item img');

    galleryItems.forEach(img => {
        img.addEventListener('click', function () {
            // Create modal overlay
            const modal = document.createElement('div');
            modal.className = 'gallery-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <img src="${this.src}" alt="${this.alt}">
                    <p>${this.alt}</p>
                </div>
            `;

            // Add modal styles
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 2000;
            `;

            const modalContent = modal.querySelector('.modal-content');
            modalContent.style.cssText = `
                position: relative;
                max-width: 90%;
                max-height: 90%;
                text-align: center;
            `;

            const modalImg = modal.querySelector('img');
            modalImg.style.cssText = `
                max-width: 100%;
                max-height: 80vh;
                object-fit: contain;
            `;

            const closeBtn = modal.querySelector('.close-modal');
            closeBtn.style.cssText = `
                position: absolute;
                top: -40px;
                right: 0;
                color: white;
                font-size: 2rem;
                cursor: pointer;
            `;

            const caption = modal.querySelector('p');
            caption.style.cssText = `
                color: white;
                margin-top: 1rem;
                font-size: 1.1rem;
            `;

            document.body.appendChild(modal);

            // Close modal events
            closeBtn.addEventListener('click', () => modal.remove());
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.remove();
            });

            // Close on escape key
            document.addEventListener('keydown', function escapeHandler(e) {
                if (e.key === 'Escape') {
                    modal.remove();
                    document.removeEventListener('keydown', escapeHandler);
                }
            });
        });
    });
}

// Initialize gallery modal when DOM is loaded
document.addEventListener('DOMContentLoaded', initGalleryModal);

// Simple Made By Section (no animations)
document.addEventListener('DOMContentLoaded', function () {
    // Made by section is now simple with no interactive animations
    console.log('Made by section loaded - simple version');
});

// Mobile Touch Optimizations
document.addEventListener('DOMContentLoaded', function () {
    // Improve touch interactions for mobile (excluding made-by-text)
    const touchElements = document.querySelectorAll('.gallery-item, .sponsor-placeholder');

    touchElements.forEach(element => {
        element.addEventListener('touchstart', function () {
            this.style.transform = 'scale(0.98)';
        });

        element.addEventListener('touchend', function () {
            this.style.transform = '';
        });
    });

    // Mobile-specific navigation improvements
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('touchstart', function () {
            this.style.backgroundColor = 'rgba(139, 69, 19, 0.1)';
        });

        link.addEventListener('touchend', function () {
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 200);
        });
    });
});

// Fast Scroll-based Animations with Heritage Elements
let scrollTicking = false;

function updateScrollAnimations() {
    const scrolled = window.scrollY; // Fixed deprecated pageYOffset
    const rate = scrolled * -0.3;

    // Optimized parallax effect (disabled on mobile for performance)
    if (window.innerWidth > 768) {
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    }

    // Fast fade in effect for sections
    const sections = document.querySelectorAll('section, .made-by-section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const windowHeight = window.innerHeight;

        if (scrolled > sectionTop - windowHeight + 50) {
            if (!section.classList.contains('animated')) {
                section.style.animation = 'fastFadeIn 0.5s ease forwards';
                section.classList.add('animated');
            }
        }
    });

    scrollTicking = false;
}

window.addEventListener('scroll', function () {
    if (!scrollTicking) {
        requestAnimationFrame(updateScrollAnimations);
        scrollTicking = true;
    }
}, { passive: true });

// Device-specific Optimizations
document.addEventListener('DOMContentLoaded', function () {
    // Detect device type and optimize accordingly
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;

    if (isMobile) {
        // Mobile-specific optimizations
        document.body.classList.add('mobile-device');

        // Reduce animation complexity on mobile for better performance
        const complexAnimations = document.querySelectorAll('.gallery-item, .sponsor-placeholder');
        complexAnimations.forEach(element => {
            element.style.transition = 'transform 0.2s ease';
        });

    } else if (isTablet) {
        // Tablet-specific optimizations
        document.body.classList.add('tablet-device');

    } else {
        // Desktop-specific enhancements
        document.body.classList.add('desktop-device');

        // Add keyboard navigation for desktop
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                // Close any open modals
                const modals = document.querySelectorAll('.gallery-modal');
                modals.forEach(modal => modal.remove());
            }
        });
    }
});

// Performance Optimization
document.addEventListener('DOMContentLoaded', function () {
    // Preload critical images only on desktop
    if (window.innerWidth > 768) {
        const criticalImages = [
            'images/mubarak-mandi-architecture.jpg',
            'images/temple-group-photo.jpg',
            'images/architectural-ceiling.jpg'
        ];

        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    // Optimize scroll performance with throttling
    let navbarTicking = false;
    let lastScrollY = 0;

    function updateScrollEffects() {
        const currentScrollY = window.scrollY;
        
        // Only update if scroll position changed significantly
        if (Math.abs(currentScrollY - lastScrollY) > 5) {
            const navbar = document.querySelector('.navbar');
            if (currentScrollY > 50) {
                navbar.style.backgroundColor = 'rgba(250, 247, 242, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.backgroundColor = 'var(--background-light)';
                navbar.style.backdropFilter = 'none';
            }
            lastScrollY = currentScrollY;
        }

        navbarTicking = false;
    }

    window.addEventListener('scroll', function () {
        if (!navbarTicking) {
            requestAnimationFrame(updateScrollEffects);
            navbarTicking = true;
        }
    }, { passive: true });
});

// Performance Optimizations Only
document.addEventListener('DOMContentLoaded', function () {
    // No easter eggs or animations for made-by section
    console.log('Performance optimizations loaded');
});

// Performance optimization for mobile devices
if (window.innerWidth <= 768) {
    // Reduce animation complexity on mobile
    document.documentElement.style.setProperty('--animation-duration', '0.2s');

    // Disable some heavy animations on mobile
    const heavyAnimations = document.querySelectorAll('.gallery-item, .sponsor-placeholder');
    heavyAnimations.forEach(element => {
        element.style.transition = 'transform 0.15s ease, box-shadow 0.15s ease';
    });
}

// Mobile-Specific Optimizations
document.addEventListener('DOMContentLoaded', function () {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    
    // Disable heavy animations on mobile for better performance
    if (isMobile) {
        document.body.classList.add('mobile-device');
        
        // Reduce animation complexity
        const style = document.createElement('style');
        style.textContent = `
            .floating-heritage-icon,
            .particle {
                animation-duration: 4s !important;
            }
            .glitch-text::before,
            .glitch-text::after {
                display: none !important;
            }
            .hero {
                background-attachment: scroll !important;
            }
        `;
        document.head.appendChild(style);
        
        // Optimize touch interactions
        const touchElements = document.querySelectorAll('.gallery-item, .sponsor-placeholder, .enhanced-cta');
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            }, { passive: true });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }, { passive: true });
        });
        
        // Mobile team cards - disable 3D flip for better UX
        const teamCards = document.querySelectorAll('.team-card');
        teamCards.forEach(card => {
            card.addEventListener('click', function() {
                const cardBack = this.querySelector('.card-back');
                const cardFront = this.querySelector('.card-front');
                
                if (cardBack.style.display === 'block') {
                    cardBack.style.display = 'none';
                    cardFront.style.display = 'flex';
                } else {
                    cardBack.style.display = 'block';
                    cardFront.style.display = 'none';
                }
            });
        });
        
    } else if (isTablet) {
        document.body.classList.add('tablet-device');
    } else {
        document.body.classList.add('desktop-device');
    }
});

// Optimized Resize Handler
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Reinitialize carousel on resize
        const track = document.getElementById('carousel-track');
        if (track) {
            const currentIndex = Array.from(document.querySelectorAll('.carousel-item')).findIndex(item => 
                item.classList.contains('active')
            );
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        
        // Update mobile/desktop optimizations
        const isMobile = window.innerWidth <= 768;
        if (isMobile && !document.body.classList.contains('mobile-device')) {
            location.reload(); // Reload to apply mobile optimizations
        } else if (!isMobile && document.body.classList.contains('mobile-device')) {
            location.reload(); // Reload to apply desktop optimizations
        }
    }, 250);
}, { passive: true });

// Enhanced Error Handling
window.addEventListener('error', function(e) {
    console.warn('Heritage site error:', e.error);
    // Graceful degradation - continue without breaking
});

// Service Worker Registration for Better Performance (Optional)
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('SW registered: ', registration);
        }).catch(function(registrationError) {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

// Intersection Observer for Animations (Performance Optimized)
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    animationObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe sections for animation
        const sections = document.querySelectorAll('section:not(.hero)');
        sections.forEach(section => {
            animationObserver.observe(section);
        });
    }
});

// Memory Management
window.addEventListener('beforeunload', function() {
    // Clean up intervals and observers
    const intervals = window.setInterval(function(){}, Number.MAX_SAFE_INTEGER);
    for (let i = 1; i < intervals; i++) {
        window.clearInterval(i);
    }
});

// Keyboard Navigation Enhancement
document.addEventListener('keydown', function(e) {
    // Skip to main content
    if (e.altKey && e.key === 'm') {
        e.preventDefault();
        document.querySelector('main').focus();
    }
    
    // Navigate carousel with arrow keys when focused
    if (document.activeElement.closest('.carousel-container')) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            document.getElementById('prev-btn').click();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            document.getElementById('next-btn').click();
        }
    }
});

// Accessibility Improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA labels to interactive elements
    const carouselBtns = document.querySelectorAll('.carousel-btn');
    carouselBtns.forEach((btn, index) => {
        btn.setAttribute('aria-label', index === 0 ? 'Previous slide' : 'Next slide');
    });
    
    // Add role attributes
    const carousel = document.querySelector('.carousel-container');
    if (carousel) {
        carousel.setAttribute('role', 'region');
        carousel.setAttribute('aria-label', 'Heritage walks photo carousel');
    }
    
    // Improve focus management
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--royal-gold)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
});

// Performance Monitoring (Development Only)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Performance:', {
                'DOM Content Loaded': perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                'Load Complete': perfData.loadEventEnd - perfData.loadEventStart,
                'Total Load Time': perfData.loadEventEnd - perfData.fetchStart
            });
        }, 0);
    });
}
