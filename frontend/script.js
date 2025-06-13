// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeComponents();
});

function initializeComponents() {
    initializeHeader();
    initializeHero();
    initializeCompanies();
    initializeComplaintsCarousel();
    initializeCategories();
    initializeStatistics();
    initializeFooter();
}

// Header Navigation Functions
function initializeHeader() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const ctaButton = document.getElementById('ctaButton');

    // Mobile menu toggle
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on nav items
        document.querySelectorAll('.nav-item a').forEach(item => {
            item.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.navbar')) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    }

    // CTA button functionality
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const emailInput = document.getElementById('emailInput');
            if (emailInput) {
                emailInput.focus();
            }
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Hero Section Functions
function initializeHero() {
    const emailForm = document.getElementById('emailForm');
    const emailInput = document.getElementById('emailInput');

    if (emailForm) {
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = emailInput.value;
            if (email) {
                alert('Email qeydiyyatı: ' + email);
                // Here you would typically send the email to your backend
            }
        });
    }
}

// Companies Section Functions
function initializeCompanies() {
    // Company item click handlers
    document.querySelectorAll('.company-item').forEach(item => {
        item.addEventListener('click', function() {
            const companyName = this.querySelector('.company-name').textContent;
            const companyCategory = this.querySelector('.company-category').textContent;
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Simulate navigation to company page
            alert(`${companyName} (${companyCategory}) haqqında şikayətlər səhifəsinə keçid...`);
        });
    });

    // Add subtle animations on page load
    const companyItems = document.querySelectorAll('.company-item');
    companyItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Complaints Carousel Functions
function initializeComplaintsCarousel() {
    new ComplaintsCarousel();

    // Add click handlers for complaint cards
    document.querySelectorAll('.complaint-card').forEach(card => {
        card.addEventListener('click', function() {
            const userName = this.querySelector('.user-info h4').textContent;
            const company = this.querySelector('.user-company').textContent;
            
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            alert(`${userName} - ${company} şikayəti haqqında ətraflı məlumat...`);
        });
    });
}

// Complaints Carousel Class
class ComplaintsCarousel {
    constructor() {
        this.track = document.getElementById('carouselTrack');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        
        if (!this.track || !this.prevBtn || !this.nextBtn) return;
        
        this.cards = this.track.children;
        this.currentIndex = 0;
        this.cardWidth = 404; // 380px + 24px gap
        this.visibleCards = this.getVisibleCards();
        this.autoSlideInterval = null;
        
        this.init();
    }

    getVisibleCards() {
        const containerWidth = this.track.parentElement.offsetWidth;
        return Math.floor(containerWidth / this.cardWidth);
    }

    init() {
        this.setupEventListeners();
        this.startAutoSlide();
        this.updateNavigation();
        
        // Handle resize
        window.addEventListener('resize', () => {
            this.visibleCards = this.getVisibleCards();
            this.updateCarousel();
        });
    }

    setupEventListeners() {
        this.nextBtn.addEventListener('click', () => this.next());
        this.prevBtn.addEventListener('click', () => this.prev());
        
        // Pause auto-slide on hover
        this.track.parentElement.addEventListener('mouseenter', () => {
            this.stopAutoSlide();
        });
        
        this.track.parentElement.addEventListener('mouseleave', () => {
            this.startAutoSlide();
        });
    }

    next() {
        const maxIndex = this.cards.length - this.visibleCards;
        if (this.currentIndex < maxIndex) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0; // Loop back to start
        }
        this.updateCarousel();
    }

    prev() {
        const maxIndex = this.cards.length - this.visibleCards;
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = maxIndex; // Loop to end
        }
        this.updateCarousel();
    }

    updateCarousel() {
        const translateX = -this.currentIndex * this.cardWidth;
        this.track.style.transform = `translateX(${translateX}px)`;
        this.updateNavigation();
    }

    updateNavigation() {
        const maxIndex = this.cards.length - this.visibleCards;
        this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
        this.nextBtn.style.opacity = this.currentIndex === maxIndex ? '0.5' : '1';
    }

    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.next();
        }, 4000); // Slide every 4 seconds
    }

    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }
}

// Categories Section Functions
function initializeCategories() {
    // Add click handlers for category bubbles
    document.querySelectorAll('.category-bubble').forEach(bubble => {
        bubble.addEventListener('click', function() {
            const categoryName = this.querySelector('.category-name').textContent;
            
            // Add click animation
            this.style.transform = 'scale(0.95) translateY(-8px)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Simulate navigation to category page
            alert(`${categoryName} kateqoriyasına keçid...`);
        });
    });

    // Add intersection observer for performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            } else {
                entry.target.style.animationPlayState = 'paused';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.category-row').forEach(row => {
        observer.observe(row);
    });

    // Smooth fade-in animation on load
    const bubbles = document.querySelectorAll('.category-bubble');
    bubbles.forEach((bubble, index) => {
        bubble.style.opacity = '0';
        bubble.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            bubble.style.transition = 'all 0.6s ease';
            bubble.style.opacity = '1';
            bubble.style.transform = 'translateY(0)';
        }, (index % 6) * 100);
    });
}

// Statistics Section Functions
function initializeStatistics() {
    // Counter animation function
    function animateCounter(element, target, suffix = '+') {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (suffix === '%') {
                element.textContent = Math.floor(current) + '%';
            } else if (suffix === '') {
                element.textContent = Math.floor(current);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 20);
    }

    // Intersection Observer for counter animation
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const target = parseInt(entry.target.dataset.target);
                
                // Determine suffix based on content
                let suffix = '+';
                if (entry.target.textContent.includes('%')) {
                    suffix = '%';
                } else if (entry.target.textContent.includes('saat')) {
                    suffix = '';
                }
                
                animateCounter(entry.target, target, suffix);
            }
        });
    }, observerOptions);

    // Observe all stat numbers
    document.querySelectorAll('.stat-number').forEach(el => {
        observer.observe(el);
    });

    // Platform icon hover effects
    document.querySelectorAll('.platform-icon').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        icon.addEventListener('click', function() {
            const company = this.getAttribute('title');
            alert(`${company} haqqında şikayətlər səhifəsinə keçid...`);
        });
    });

    // Add subtle parallax effect to character
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const character = document.querySelector('.character');
        if (character) {
            character.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });

    // Add load animation
    const elements = document.querySelectorAll('.stat-item, .platform-icon');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            el.style.transition = 'all 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Footer Functions
function initializeFooter() {
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('.newsletter-input').value;
            if (email) {
                alert('Xəbər bülletenimizə abunə oldunuz: ' + email);
                this.querySelector('.newsletter-input').value = '';
            }
        });
    }

    // Social media links
    document.querySelectorAll('.footer-social-icon').forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('title');
            alert(`${platform} səhifəsinə keçid...`);
        });
    });

    // Footer links
    document.querySelectorAll('.footer-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent;
            alert(`${linkText} səhifəsinə keçid...`);
        });
    });

    // Contact info clicks
    document.querySelectorAll('.contact-value a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const contact = this.textContent;
            alert(`${contact} ilə əlaqə saxlayın...`);
        });
    });

    // Bottom links
    document.querySelectorAll('.footer-bottom-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent;
            alert(`${linkText} səhifəsinə keçid...`);
        });
    });

    // Add entrance animation
    const columns = document.querySelectorAll('.footer-column, .footer-brand');
    columns.forEach((column, index) => {
        column.style.opacity = '0';
        column.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            column.style.transition = 'all 0.6s ease';
            column.style.opacity = '1';
            column.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Global Utility Functions
function setupGlobalAnimations() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
            }
        });
    }, observerOptions);

    // Apply fade in animation to various elements
    document.querySelectorAll('.section-title, .section-subtitle, .company-item, .complaint-card, .category-bubble, .footer-column').forEach(el => {
        fadeInObserver.observe(el);
    });
}

// Initialize global animations
window.addEventListener('load', function() {
    setupGlobalAnimations();
});

// Smooth scrolling for all internal links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
});

// Add loading state management
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading spinner if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
    
    // Show main content
    document.body.style.opacity = '1';
});

// Performance optimization: Lazy load images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if needed
setupLazyLoading();

// Error handling for missing elements
function handleMissingElements() {
    const requiredElements = [
        '#navMenu',
        '#mobileToggle',
        '#emailForm',
        '#carouselTrack',
        '.newsletter-form'
    ];

    requiredElements.forEach(selector => {
        const element = document.querySelector(selector);
        if (!element) {
            console.warn(`Element ${selector} not found. Some functionality may be limited.`);
        }
    });
}

// Run error handling
handleMissingElements();

// Export functions for external use if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ComplaintsCarousel,
        initializeComponents
    };
}

// FAQ functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all other items
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });
        
        // Toggle current item
        faqItem.classList.toggle('active');
    });
});