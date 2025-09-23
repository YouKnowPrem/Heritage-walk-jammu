// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
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

// Contact Form Handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission (replace with actual form handling)
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
    
    // In a real implementation, you would send this data to your server
    // or use a service like Formspree, Netlify Forms, or EmailJS
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
window.addEventListener('scroll', function() {
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
        img.addEventListener('click', function() {
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

// Created By Card Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    const createdByCard = document.querySelector('.created-by-card');
    const heartIcon = document.querySelector('.heart-icon');
    const techItems = document.querySelectorAll('.tech-item');
    
    if (createdByCard) {
        // Click effect with confetti-like animation
        createdByCard.addEventListener('click', function() {
            // Create temporary sparkle effect
            for (let i = 0; i < 6; i++) {
                createSparkle(this);
            }
            
            // Temporary scale animation
            this.style.transform = 'translateY(-5px) scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px) scale(1.05)';
            }, 100);
        });
        
        // Double click for special effect
        createdByCard.addEventListener('dblclick', function() {
            // Rainbow heart effect
            heartIcon.style.animation = 'none';
            heartIcon.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)';
            heartIcon.style.webkitBackgroundClip = 'text';
            heartIcon.style.webkitTextFillColor = 'transparent';
            heartIcon.style.backgroundClip = 'text';
            
            setTimeout(() => {
                heartIcon.style.background = 'none';
                heartIcon.style.webkitTextFillColor = 'initial';
                heartIcon.style.animation = 'heartbeat 2s ease-in-out infinite';
            }, 2000);
        });
        
        // Tech stack hover effects
        techItems.forEach((item, index) => {
            item.addEventListener('mouseenter', function() {
                this.style.animationDelay = `${index * 0.1}s`;
                this.style.animation = 'techGlow 0.6s ease forwards';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.animation = 'none';
            });
        });
    }
    
    function createSparkle(parent) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;
        
        const rect = parent.getBoundingClientRect();
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        
        parent.appendChild(sparkle);
        
        // Animate sparkle
        sparkle.animate([
            { 
                transform: 'translate(0, 0) scale(0)', 
                opacity: 1 
            },
            { 
                transform: `translate(${(Math.random() - 0.5) * 50}px, ${(Math.random() - 0.5) * 50}px) scale(1)`, 
                opacity: 0.8,
                offset: 0.5
            },
            { 
                transform: `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px) scale(0)`, 
                opacity: 0 
            }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }).onfinish = () => sparkle.remove();
    }
});
