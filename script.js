// Heritage Loading Animation
document.addEventListener('DOMContentLoaded', function () {
    const loader = document.getElementById('heritage-loader');
    
    // Simulate loading time with heritage elements
    setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
            // Trigger entrance animations
            document.body.classList.add('loaded');
            animateOnLoad();
        }, 800);
    }, 2500);
});

// Fast entrance animations
function animateOnLoad() {
    const sections = document.querySelectorAll('section, .made-by-section');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.style.animation = 'fastFadeIn 0.6s ease forwards';
            section.style.opacity = '1';
        }, index * 100);
    });
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
        const imageObserver = new IntersectionObserver((entries, observer) => {
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

// Enhanced Made By Section with Heritage Animations
document.addEventListener('DOMContentLoaded', function () {
    const madeByText = document.querySelector('.made-by-text');

    if (madeByText) {
        // Fast click effect with heritage sparkles
        madeByText.addEventListener('click', function (e) {
            // Create multiple heritage sparkles
            for (let i = 0; i < 12; i++) {
                createFastHeritageSparkle(this, e);
            }

            // Quick pulse effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);

            // Heritage sound effect (visual feedback)
            createHeritageRipple(e.clientX, e.clientY);
        });

        // Double click for Jammu palace animation
        madeByText.addEventListener('dblclick', function (e) {
            createJammuPalaceAnimation(e.clientX, e.clientY);
            
            // Special heritage wave effect
            const lines = this.querySelectorAll('.line-1, .line-2');
            lines.forEach((line, index) => {
                setTimeout(() => {
                    line.style.animation = 'heritageWave 1.5s ease-in-out';
                    setTimeout(() => {
                        line.style.animation = 'fastGradientShift 4s ease-in-out infinite';
                    }, 1500);
                }, index * 200);
            });
        });
    }

    function createFastHeritageSparkle(parent, event) {
        const sparkle = document.createElement('div');
        sparkle.className = 'fast-heritage-sparkle';
        
        const symbols = ['◆', '♦', '✦', '✧', '⬟', '⬢'];
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        
        sparkle.innerHTML = randomSymbol;
        sparkle.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 12 + 8}px;
            color: #FFD700;
            pointer-events: none;
            z-index: 1000;
            text-shadow: 0 0 10px #FFD700;
            font-weight: bold;
        `;

        const rect = parent.getBoundingClientRect();
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;

        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';

        parent.appendChild(sparkle);

        // Fast sparkle animation
        sparkle.animate([
            {
                transform: 'translate(0, 0) scale(0) rotate(0deg)',
                opacity: 1
            },
            {
                transform: `translate(${(Math.random() - 0.5) * 80}px, ${(Math.random() - 0.5) * 80}px) scale(1.2) rotate(180deg)`,
                opacity: 0.8,
                offset: 0.3
            },
            {
                transform: `translate(${(Math.random() - 0.5) * 150}px, ${(Math.random() - 0.5) * 150}px) scale(0) rotate(360deg)`,
                opacity: 0
            }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => sparkle.remove();
    }

    function createHeritageRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 20px;
            height: 20px;
            border: 2px solid #FFD700;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 1000;
        `;

        document.body.appendChild(ripple);

        ripple.animate([
            { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
            { transform: 'translate(-50%, -50%) scale(3)', opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        }).onfinish = () => ripple.remove();
    }

    function createJammuPalaceAnimation(x, y) {
        const palace = document.createElement('div');
        palace.innerHTML = '🏛️';
        palace.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            font-size: 2rem;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 1000;
            filter: drop-shadow(0 0 10px #FFD700);
        `;

        document.body.appendChild(palace);

        palace.animate([
            { 
                transform: 'translate(-50%, -50%) scale(0) rotate(0deg)', 
                opacity: 1,
                filter: 'drop-shadow(0 0 10px #FFD700)'
            },
            { 
                transform: 'translate(-50%, -50%) scale(1.5) rotate(180deg)', 
                opacity: 0.8,
                filter: 'drop-shadow(0 0 20px #FFD700)',
                offset: 0.5
            },
            { 
                transform: 'translate(-50%, -50%) scale(0) rotate(360deg)', 
                opacity: 0,
                filter: 'drop-shadow(0 0 5px #FFD700)'
            }
        ], {
            duration: 2000,
            easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }).onfinish = () => palace.remove();
    }
});

// Mobile Touch Optimizations
document.addEventListener('DOMContentLoaded', function () {
    // Improve touch interactions for mobile
    const touchElements = document.querySelectorAll('.gallery-item, .sponsor-placeholder, .made-by-text');

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
    const scrolled = window.pageYOffset;
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

// Heritage-themed Easter Eggs and Performance Optimizations
document.addEventListener('DOMContentLoaded', function () {
    let clickCount = 0;
    const madeByText = document.querySelector('.made-by-text');

    if (madeByText) {
        madeByText.addEventListener('click', function () {
            clickCount++;

            // Special heritage celebration after 3 clicks
            if (clickCount === 3) {
                createHeritageFireworks();
                showHeritageMessage();
                clickCount = 0;
            }
        });
    }

    function createHeritageFireworks() {
        const colors = ['#FFD700', '#CD853F', '#8B4513', '#FF6B35', '#F7931E'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.innerHTML = ['🏛️', '✨', '🎆', '⭐', '💫'][Math.floor(Math.random() * 5)];
                firework.style.cssText = `
                    position: fixed;
                    left: ${Math.random() * window.innerWidth}px;
                    top: ${Math.random() * window.innerHeight}px;
                    font-size: ${Math.random() * 20 + 15}px;
                    pointer-events: none;
                    z-index: 3000;
                    filter: drop-shadow(0 0 10px ${colors[Math.floor(Math.random() * colors.length)]});
                `;

                document.body.appendChild(firework);

                firework.animate([
                    { transform: 'scale(0) rotate(0deg)', opacity: 1 },
                    { transform: 'scale(1.5) rotate(180deg)', opacity: 0.8, offset: 0.3 },
                    { transform: 'scale(0) rotate(360deg)', opacity: 0 }
                ], {
                    duration: 1500,
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }).onfinish = () => firework.remove();
            }, i * 100);
        }
    }

    function showHeritageMessage() {
        const messages = [
            '🏛️ Jammu Heritage Lives On! 🏛️',
            '✨ Mubarak Mandi Forever! ✨',
            '🎆 Old City Jammu Pride! 🎆',
            '⭐ Heritage Walks Rock! ⭐'
        ];
        
        const message = document.createElement('div');
        message.innerHTML = messages[Math.floor(Math.random() * messages.length)];
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #FFD700, #8B4513, #CD853F);
            color: white;
            padding: 2rem 3rem;
            border-radius: 20px;
            font-size: 1.8rem;
            font-family: var(--font-heading);
            z-index: 3000;
            box-shadow: 0 15px 40px rgba(0,0,0,0.4);
            border: 3px solid #FFD700;
            text-align: center;
            font-weight: 600;
            text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        `;

        document.body.appendChild(message);

        message.animate([
            { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 },
            { transform: 'translate(-50%, -50%) scale(1.1)', opacity: 1, offset: 0.1 },
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1, offset: 0.9 },
            { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 }
        ], {
            duration: 3000,
            easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }).onfinish = () => message.remove();
    }
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

