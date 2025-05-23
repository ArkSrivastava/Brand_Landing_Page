document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initScrollAnimation();
    initStickyHeader();
    initMobileMenu();
    initTestimonialSlider();
    initBackToTop();
    initSmoothScrolling();
    initAdvancedAnimations();
    init3DEffects();
});

// Animate elements when they come into view
function initScrollAnimation() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .fade-in, .fade-in-left, .fade-in-right, .scale-in, .text-reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Initialize staggered animations
    const staggerContainers = document.querySelectorAll('.stagger-container');
    staggerContainers.forEach(container => {
        const staggerItems = container.querySelectorAll('.stagger-item');
        
        const staggerObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                staggerItems.forEach((item, index) => {
                    // Set transition-delay directly on the element for more reliable animation
                    item.style.transitionDelay = `${0.1 * index}s`;
                    item.classList.add('show');
                });
                staggerObserver.unobserve(container);
            }
        }, { threshold: 0.2 });
        
        staggerObserver.observe(container);
    });
}

// Make header sticky on scroll
function initStickyHeader() {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        // Add scrolled class to header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Highlight active section in navigation
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
}

// Testimonial slider functionality
function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    // Set up dots functionality
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Function to change slide
    function goToSlide(slideIndex) {
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${100 * (index - slideIndex)}%)`;
        });
        
        // Update active dot
        dots.forEach(dot => dot.classList.remove('active'));
        dots[slideIndex].classList.add('active');
        
        currentSlide = slideIndex;
    }
    
    // Initialize first slide
    goToSlide(0);
    
    // Auto slide change every 5 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }, 5000);
}

// Back to top button functionality
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Offset for header height
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form submission handling
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the data to a server
    // For demo purposes, we'll just log it and show a success message
    console.log('Form submitted:', { name, email, message });
    
    // Show success message (you could create a more sophisticated notification)
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    this.reset();
});

// Parallax effect for background
window.addEventListener('scroll', function() {
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
        const scrollPosition = window.scrollY;
        parallaxBg.style.transform = `translateY(${scrollPosition * 0.3}px)`;
    }
    
    // Enhanced parallax for multiple elements
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.2;
        const direction = element.getAttribute('data-direction') || 'up';
        const yPos = direction === 'up' ? scrollPosition * speed * -1 : scrollPosition * speed;
        
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Initialize advanced animations
function initAdvancedAnimations() {
    // Text reveal animation
    const textRevealElements = document.querySelectorAll('.text-reveal:not(.processed)');
    textRevealElements.forEach(element => {
        // Skip if already processed by the 3D effects script
        if (element.classList.contains('split-text')) return;
        
        const text = element.textContent;
        element.textContent = '';
        element.classList.add('processed');
        
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i] === ' ' ? ' ' : text[i];
            span.style.transitionDelay = `${i * 0.03}s`;
            element.appendChild(span);
        }
    });
    
    // Initialize shine effect
    const shineElements = document.querySelectorAll('.shine');
    shineElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.classList.add('active');
        });
        
        element.addEventListener('mouseleave', () => {
            element.classList.remove('active');
        });
    });
}

// Initialize 3D effects
function init3DEffects() {
    // 3D tilt effect
    const tiltElements = document.querySelectorAll('.tilt');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = x / rect.width - 0.5;
            const yPercent = y / rect.height - 0.5;
            
            const rotateX = yPercent * -10; // Rotate around X-axis (horizontal)
            const rotateY = xPercent * 10;  // Rotate around Y-axis (vertical)
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            const inner = element.querySelector('.tilt-inner');
            if (inner) {
                inner.style.transform = `translateZ(30px)`;
            }
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            
            const inner = element.querySelector('.tilt-inner');
            if (inner) {
                inner.style.transform = 'translateZ(0)';
            }
        });
    });
}