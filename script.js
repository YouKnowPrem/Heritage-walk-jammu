// Modern Heritage Loading Animation with Progress Counter
document.addEventListener('DOMContentLoaded', function () {
    const loader = document.getElementById('heritage-loader');
    const progressCounter = document.getElementById('progress-counter');
    const progressBar = document.querySelector('.progress-bar');

    if (!loader || !progressCounter || !progressBar) {
        console.warn('Loading elements not found');
        return;
    }

    let progress = 0;
    const progressInterval = setInterval(() => {
        // Random increment between 8-18 for more dynamic loading
        progress += Math.random() * 10 + 8;
        if (progress > 100) progress = 100;

        // Update counter with smooth animation
        progressCounter.textContent = Math.floor(progress);

        // Update circular progress bar
        const circumference = 2 * Math.PI * 50; // radius = 50
        const offset = circumference - (progress / 100) * circumference;
        progressBar.style.strokeDashoffset = offset;

        // Complete loading when progress reaches 100%
        if (progress >= 100) {
            clearInterval(progressInterval);

            // Add completion effects
            setTimeout(() => {
                loader.classList.add('fade-out');
                setTimeout(() => {
                    loader.style.display = 'none';
                    // Trigger entrance animations
                    document.body.classList.add('loaded');
                    animateOnLoad();
                    initializeCarousel();
                }, 800);
            }, 600);
        }
    }, 120); // Slightly faster updates for smoother animation
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
let ticking = false;

function updateScrollAnimations() {
    const scrolled = window.scrollY;
    const rate = scrolled * -0.3;

    // Optimized parallax effect
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.transform = `translateY(${rate}px)`;
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

    ticking = false;
}

window.addEventListener('scroll', function () {
    if (!ticking) {
        requestAnimationFrame(updateScrollAnimations);
        ticking = true;
    }
});

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
    // Preload critical images
    const criticalImages = [
        'images/placeholder-1.jpg',
        'images/placeholder-2.jpg',
        'images/placeholder-3.jpg'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Optimize scroll performance
    let ticking = false;

    function updateScrollEffects() {
        // Update navbar and other scroll effects here
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(250, 247, 242, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = 'var(--background-light)';
            navbar.style.backdropFilter = 'none';
        }

        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
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
}/
/ Dynamic Hero Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initDynamicHero();
});

function initDynamicHero() {
    // Initialize all hero components
    initParticles();
    initParallax();
    initTypewriter();
    initLetterAnimation();
    initExpandableDescription();
    initStatsCounter();
    initScrollIndicator();
}

// Particles System
function initParticles() {
    const canvas = document.getElementById('heroParticles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = `rgba(255, 215, 0, ${this.opacity})`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap around edges
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
    
    // Create particles
    function createParticles() {
        const particleCount = window.innerWidth < 768 ? 30 : 50;
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(255, 215, 0, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    createParticles();
    animate();
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    });
}

// Parallax Effect
function initParallax() {
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    if (parallaxLayers.length === 0) return;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxLayers.forEach(layer => {
            const speed = layer.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            layer.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    window.addEventListener('scroll', updateParallax, { passive: true });
}

// Typewriter Effect
function initTypewriter() {
    const typewriterElement = document.querySelector('.typewriter-content');
    if (!typewriterElement) return;
    
    const texts = [
        'Join us for guided heritage walks through historic Jammu',
        'Explore the magnificent Mubarak Mandi Palace Complex',
        'Discover the vibrant culture of Old City markets',
        'Experience centuries of Dogra dynasty history'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before next text
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    // Start typewriter effect after a delay
    setTimeout(typeWriter, 1000);
}

// Letter Animation
function initLetterAnimation() {
    const letters = document.querySelectorAll('.letter');
    
    letters.forEach((letter, index) => {
        letter.style.setProperty('--letter-index', index);
        
        // Start animation after a delay
        setTimeout(() => {
            letter.style.animationPlayState = 'running';
        }, index * 100);
    });
}

// Expandable Description
function initExpandableDescription() {
    const expandBtn = document.querySelector('.expand-btn');
    const collapseBtn = document.querySelector('.collapse-btn');
    const descriptionPreview = document.querySelector('.description-preview');
    const descriptionFull = document.querySelector('.description-full');
    
    if (!expandBtn || !collapseBtn || !descriptionPreview || !descriptionFull) return;
    
    expandBtn.addEventListener('click', () => {
        descriptionPreview.style.display = 'none';
        descriptionFull.style.display = 'block';
        descriptionFull.classList.add('active');
    });
    
    collapseBtn.addEventListener('click', () => {
        descriptionFull.style.display = 'none';
        descriptionFull.classList.remove('active');
        descriptionPreview.style.display = 'block';
    });
}

// Stats Counter Animation
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    function animateStats() {
        if (hasAnimated) return;
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.target);
            const increment = target / 50;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 40);
        });
        
        hasAnimated = true;
    }
    
    // Trigger animation when hero section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateStats, 2000); // Delay for dramatic effect
            }
        });
    }, { threshold: 0.5 });
    
    const heroSection = document.querySelector('.dynamic-hero');
    if (heroSection) {
        observer.observe(heroSection);
    }
}

// Scroll Indicator
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;
    
    scrollIndicator.addEventListener('click', () => {
        const nextSection = document.querySelector('#previous-walks') || 
                           document.querySelector('section:nth-of-type(2)');
        if (nextSection) {
            nextSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
    
    // Hide scroll indicator when scrolling
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '0.7';
        }
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (window.pageYOffset <= 100) {
                scrollIndicator.style.opacity = '0.7';
            }
        }, 150);
    }, { passive: true });
}

// Mouse movement parallax for heritage elements
document.addEventListener('mousemove', (e) => {
    if (window.innerWidth <= 768) return; // Skip on mobile
    
    const heritageElements = document.querySelectorAll('.heritage-float');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    heritageElements.forEach((element, index) => {
        const speed = (index + 1) * 0.02;
        const x = (mouseX - 0.5) * speed * 50;
        const y = (mouseY - 0.5) * speed * 50;
        
        element.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Performance optimization: Pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
    const heroSection = document.querySelector('.dynamic-hero');
    if (!heroSection) return;
    
    if (document.hidden) {
        heroSection.style.animationPlayState = 'paused';
    } else {
        heroSection.style.animationPlayState = 'running';
    }
});
