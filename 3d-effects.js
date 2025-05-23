/**
 * Advanced 3D Effects for Landing Page
 * This script adds realistic 3D effects and interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    initParallaxMouseEffect();
    initScrollParallax();
    init3DCards();
    initTextSplitting();
});

/**
 * Creates a parallax effect based on mouse movement
 * Adds depth to elements by moving them slightly as the mouse moves
 */
function initParallaxMouseEffect() {
    const scene = document.querySelector('.parallax-scene');
    if (!scene) return;
    
    const layers = scene.querySelectorAll('.parallax-layer');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        layers.forEach(layer => {
            const speed = layer.getAttribute('data-speed') || 1;
            const x = mouseX * speed * 20;
            const y = mouseY * speed * 20;
            
            layer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
    });
}

/**
 * Adds depth to elements as user scrolls
 * Different elements move at different speeds creating a 3D effect
 */
function initScrollParallax() {
    const parallaxItems = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        
        parallaxItems.forEach(item => {
            const speed = item.getAttribute('data-parallax') || 0.1;
            const offset = scrollTop * speed;
            
            item.style.transform = `translateY(${offset}px)`;
        });
    });
}

/**
 * Adds realistic 3D card effect with depth and lighting
 */
function init3DCards() {
    const cards = document.querySelectorAll('.card-3d-advanced');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', handleCardMove);
        card.addEventListener('mouseleave', resetCard);
    });
    
    function handleCardMove(e) {
        const card = this;
        const cardRect = card.getBoundingClientRect();
        const cardWidth = cardRect.width;
        const cardHeight = cardRect.height;
        
        // Calculate mouse position relative to card center
        const mouseX = e.clientX - cardRect.left - cardWidth / 2;
        const mouseY = e.clientY - cardRect.top - cardHeight / 2;
        
        // Calculate rotation (max 15 degrees)
        const rotateY = 15 * mouseX / (cardWidth / 2);
        const rotateX = -15 * mouseY / (cardHeight / 2);
        
        // Apply transform
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        // Add lighting effect
        const shine = card.querySelector('.card-shine');
        if (shine) {
            // Calculate light position
            const percentX = (e.clientX - cardRect.left) / cardWidth * 100;
            const percentY = (e.clientY - cardRect.top) / cardHeight * 100;
            
            shine.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%)`;
        }
    }
    
    function resetCard() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        
        const shine = this.querySelector('.card-shine');
        if (shine) {
            shine.style.background = 'none';
        }
    }
}

/**
 * Splits text into individual characters for advanced text animations
 */
function initTextSplitting() {
    const textElements = document.querySelectorAll('.split-text');
    
    textElements.forEach(element => {
        // Skip if already processed
        if (element.classList.contains('processed')) return;
        
        const text = element.textContent;
        element.textContent = '';
        element.style.display = 'inline-block';
        element.classList.add('processed');
        
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const span = document.createElement('span');
            span.textContent = char === ' ' ? ' ' : char;
            span.style.display = 'inline-block';
            span.style.transition = `transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${i * 0.05}s, opacity 0.5s ease ${i * 0.05}s`;
            span.classList.add('split-char');
            element.appendChild(span);
        }
        
        // Add animation when in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const chars = element.querySelectorAll('.split-char');
                    chars.forEach((char, index) => {
                        setTimeout(() => {
                            char.style.opacity = '1';
                            char.style.transform = 'translateY(0) rotate(0deg)';
                        }, index * 30);
                    });
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.2 }); // Lower threshold for earlier triggering
        
        observer.observe(element);
        
        // Set initial state
        const chars = element.querySelectorAll('.split-char');
        chars.forEach(char => {
            char.style.opacity = '0';
            char.style.transform = 'translateY(20px) rotate(5deg)';
        });
    });
}