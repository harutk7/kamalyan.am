/**
 * Kamalyan Consulting - Main JavaScript
 * Handles all interactive functionality
 */

(function() {
    'use strict';

    // DOM Elements
    const header = document.getElementById('header');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const testimonialsSlider = document.getElementById('testimonialsSlider');
    const testimonialPrev = document.getElementById('testimonialPrev');
    const testimonialNext = document.getElementById('testimonialNext');
    const testimonialsDots = document.getElementById('testimonialsDots');
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');

    // ========================================
    // Header Scroll Effect
    // ========================================
    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    }

    // ========================================
    // Mobile Menu
    // ========================================
    function openMobileMenu() {
        mobileMenu?.classList.add('active');
        mobileOverlay?.classList.add('active');
        mobileMenuBtn?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenu?.classList.remove('active');
        mobileOverlay?.classList.remove('active');
        mobileMenuBtn?.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ========================================
    // Testimonials Slider
    // ========================================
    let currentSlide = 0;
    const totalSlides = 3;
    let autoSlideInterval;

    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        currentSlide = index;
        
        const track = document.querySelector('.testimonials-track');
        if (track) {
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        
        // Update dots
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // ========================================
    // Contact Form
    // ========================================
    function showToast(message, duration = 3000) {
        const toastMessage = toast?.querySelector('.toast-message');
        if (toastMessage) {
            toastMessage.textContent = message;
        }
        
        toast?.classList.add('active');
        
        setTimeout(() => {
            toast?.classList.remove('active');
        }, duration);
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // Validate form
        if (!data.name || !data.email || !data.subject || !data.message) {
            showToast('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showToast('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn?.textContent;
        
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
        }
        
        setTimeout(() => {
            showToast('Message sent successfully!');
            contactForm.reset();
            
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        }, 1500);
    }

    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    function handleSmoothScroll(e) {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;
        
        const targetId = link.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            
            const headerHeight = header?.offsetHeight || 72;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            closeMobileMenu();
        }
    }

    // ========================================
    // Intersection Observer for Animations
    // ========================================
    function initScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe sections
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            observer.observe(section);
        });
    }

    // ========================================
    // Active Navigation Link
    // ========================================
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = header?.offsetHeight || 72;
            
            if (window.scrollY >= sectionTop - headerHeight - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}` || 
                (current === '' && link.getAttribute('href') === '#home')) {
                link.classList.add('active');
            }
        });
        
        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}` || 
                (current === '' && link.getAttribute('href') === '#home')) {
                link.classList.add('active');
            }
        });
    }

    // ========================================
    // Event Listeners
    // ========================================
    function initEventListeners() {
        // Header scroll
        window.addEventListener('scroll', handleHeaderScroll, { passive: true });
        window.addEventListener('scroll', updateActiveNavLink, { passive: true });
        
        // Mobile menu
        mobileMenuBtn?.addEventListener('click', openMobileMenu);
        mobileMenuClose?.addEventListener('click', closeMobileMenu);
        mobileOverlay?.addEventListener('click', closeMobileMenu);
        
        // Testimonials
        testimonialPrev?.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });
        
        testimonialNext?.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });
        
        // Testimonial dots
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                stopAutoSlide();
                startAutoSlide();
            });
        });
        
        // Pause auto-slide on hover
        testimonialsSlider?.addEventListener('mouseenter', stopAutoSlide);
        testimonialsSlider?.addEventListener('mouseleave', startAutoSlide);
        
        // Contact form
        contactForm?.addEventListener('submit', handleFormSubmit);
        
        // Smooth scroll
        document.addEventListener('click', handleSmoothScroll);
        
        // Keyboard navigation for mobile menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu?.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        // Touch swipe for testimonials
        let touchStartX = 0;
        let touchEndX = 0;
        
        testimonialsSlider?.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        testimonialsSlider?.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                stopAutoSlide();
                startAutoSlide();
            }
        }
    }

    // ========================================
    // Initialize
    // ========================================
    function init() {
        handleHeaderScroll();
        initEventListeners();
        initScrollAnimations();
        startAutoSlide();
        updateActiveNavLink();
        
        // Log initialization
        console.log('🌿 Kamalyan Consulting website initialized');
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose some functions for testing
    window.Kamalyan = {
        openMobileMenu,
        closeMobileMenu,
        goToSlide,
        nextSlide,
        prevSlide,
        showToast,
        handleFormSubmit
    };

})();
