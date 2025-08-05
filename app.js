// Roti Box - Dark Theme Mobile-First JavaScript - Fixed Version

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initSmoothScrolling();
    initContactForm();
    initLoginModal();
    initActiveNavigation();
    initAnimations();
    initHeaderScrollEffect();
    initTouchOptimizations();
    initGlobalFunctions();
    
    console.log('🍱 Roti Box dark theme website initialized successfully!');
});

// Initialize global functions immediately
function initGlobalFunctions() {
    // Make functions globally available
    window.openLoginModal = openLoginModal;
    window.closeLoginModal = closeLoginModal;
    window.socialLogin = socialLogin;
    window.forgotPassword = forgotPassword;
    window.openSignupModal = openSignupModal;
    window.scrollToSection = scrollToSection;
    window.callNow = callNow;
    window.orderNow = orderNow;
}

// Mobile menu functionality with touch optimization
function initMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const nav = document.getElementById('nav');
    
    if (menuBtn && nav) {
        // Handle menu toggle
        menuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });

        // Handle touch events for better mobile experience
        menuBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(0.95)';
        });

        menuBtn.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(1)';
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Close menu when pressing escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });
    }

    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
}

function toggleMobileMenu() {
    const nav = document.getElementById('nav');
    const menuBtn = document.getElementById('menuBtn');
    
    if (nav && menuBtn) {
        const isOpen = nav.classList.contains('nav--open');
        
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
}

function openMobileMenu() {
    const nav = document.getElementById('nav');
    const menuBtn = document.getElementById('menuBtn');
    
    if (nav && menuBtn) {
        nav.classList.add('nav--open');
        menuBtn.classList.add('active');
        
        // Animate hamburger to X
        const spans = menuBtn.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) span.style.opacity = '0';
            if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        });
        
        // Add animation to nav items
        const navItems = nav.querySelectorAll('.nav__link');
        navItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 100);
        });
        
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileMenu() {
    const nav = document.getElementById('nav');
    const menuBtn = document.getElementById('menuBtn');
    
    if (nav && menuBtn && nav.classList.contains('nav--open')) {
        nav.classList.remove('nav--open');
        menuBtn.classList.remove('active');
        
        // Reset hamburger animation
        const spans = menuBtn.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
        
        // Restore body scrolling
        document.body.style.overflow = '';
    }
}

// Login Modal functionality - Fixed
function initLoginModal() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLoginSubmit();
        });
    }
    
    // Handle modal backdrop clicks
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.addEventListener('click', function(e) {
            if (e.target === this || e.target.classList.contains('modal__backdrop')) {
                closeLoginModal();
            }
        });
    }

    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('loginModal');
            if (modal && !modal.classList.contains('hidden')) {
                closeLoginModal();
            }
        }
    });
}

// Global login modal functions - Fixed
function openLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Focus on first input for accessibility
        setTimeout(() => {
            const firstInput = modal.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 300);
        
        trackEvent('Login', 'Modal Opened');
        console.log('✅ Login modal opened');
    } else {
        console.error('❌ Login modal not found');
    }
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
        
        // Clear form
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
            clearFormErrors(form);
        }
        console.log('✅ Login modal closed');
    }
}

function handleLoginSubmit() {
    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');
    const submitBtn = document.querySelector('.login-submit-btn');
    
    // Clear previous errors
    clearFormErrors(document.getElementById('loginForm'));
    
    let isValid = true;
    
    // Validate email/phone
    if (!email.value.trim()) {
        showFieldError(email, 'Email or phone is required');
        isValid = false;
    } else if (!isValidEmailOrPhone(email.value.trim())) {
        showFieldError(email, 'Please enter a valid email or phone number');
        isValid = false;
    }
    
    // Validate password
    if (!password.value.trim()) {
        showFieldError(password, 'Password is required');
        isValid = false;
    } else if (password.value.length < 6) {
        showFieldError(password, 'Password must be at least 6 characters');
        isValid = false;
    }
    
    if (isValid) {
        // Show loading state
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '🔄 Logging in...';
        submitBtn.disabled = true;
        
        // Simulate login process
        setTimeout(() => {
            // Show success message
            showSuccessMessage('Login successful! Welcome back! 🎉');
            
            setTimeout(() => {
                closeLoginModal();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
            
            trackEvent('Login', 'Successful Login');
        }, 1500);
    }
}

function socialLogin(provider) {
    showToast(`🔄 Redirecting to ${provider.charAt(0).toUpperCase() + provider.slice(1)} login...`);
    
    // Simulate social login redirect
    setTimeout(() => {
        showToast(`✅ ${provider.charAt(0).toUpperCase() + provider.slice(1)} login successful!`);
        closeLoginModal();
    }, 2000);
    
    trackEvent('Login', `${provider} Social Login`);
}

function forgotPassword() {
    const email = prompt('Please enter your email address to reset password:');
    if (email && isValidEmail(email)) {
        showToast('🔄 Sending password reset email...');
        setTimeout(() => {
            showToast('✅ Password reset email sent! Check your inbox.');
        }, 2000);
    } else if (email) {
        showToast('❌ Please enter a valid email address');
    }
    
    trackEvent('Login', 'Forgot Password');
}

function openSignupModal() {
    closeLoginModal();
    showToast('🚧 Signup feature coming soon! Please call us for now.');
    trackEvent('Login', 'Signup Clicked');
}

// Smooth scrolling with mobile optimization - Fixed
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            console.log(`🔗 Clicking nav link: ${targetId}`);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                // Close mobile menu first
                closeMobileMenu();
                
                // Smooth scroll with mobile-friendly duration
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Add visual feedback for mobile
                targetSection.style.transition = 'background-color 0.5s ease';
                targetSection.style.backgroundColor = 'rgba(255, 107, 53, 0.1)';
                setTimeout(() => {
                    targetSection.style.backgroundColor = '';
                }, 1000);
                
                trackEvent('Navigation', targetId.replace('#', ''));
                console.log(`✅ Scrolled to section: ${targetId}`);
            } else {
                console.error(`❌ Section not found: ${targetId}`);
            }
        });
    });
}

// Contact form with enhanced mobile experience
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleContactFormSubmit();
    });

    // Real-time validation with mobile-friendly feedback
    const inputs = contactForm.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateContactField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateContactField(this);
            }
        });

        // Mobile-specific input enhancements
        if (input.type === 'tel') {
            input.addEventListener('input', function() {
                // Auto-format phone numbers
                let value = this.value.replace(/\D/g, '');
                if (value.length >= 10) {
                    value = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
                }
                this.value = value;
            });
        }
    });
}

function handleContactFormSubmit() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    
    // Clear previous errors
    clearFormErrors(form);
    
    let isValid = true;
    const fields = ['name', 'email', 'phone', 'message'];
    
    fields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (!validateContactField(field)) {
            isValid = false;
        }
    });
    
    if (isValid) {
        // Show loading state
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '📤 Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            showSuccessMessage(`✅ Thank you ${formData.get('name')}! Your message has been sent successfully. We'll get back to you within 24 hours.`);
            
            // Reset form
            form.reset();
            clearFormErrors(form);
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Create WhatsApp message option
            setTimeout(() => {
                const confirmed = confirm('Would you like to also send this inquiry via WhatsApp for faster response?');
                if (confirmed) {
                    const message = `Hi Roti Box! New inquiry from: ${formData.get('name')}\nEmail: ${formData.get('email')}\nPhone: ${formData.get('phone')}\nService: ${formData.get('service') || 'Not specified'}\nMessage: ${formData.get('message')}`;
                    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, '_blank');
                }
            }, 2000);
            
            trackEvent('Contact Form', 'Form Submitted');
        }, 1500);
    }
}

function validateContactField(field) {
    if (!field) return false;
    
    const value = field.value.trim();
    let isValid = true;
    
    // Clear previous error
    clearFieldError(field);
    
    switch (field.id) {
        case 'name':
            if (!value) {
                showFieldError(field, 'Name is required');
                isValid = false;
            } else if (value.length < 2) {
                showFieldError(field, 'Name must be at least 2 characters');
                isValid = false;
            }
            break;
            
        case 'email':
            if (!value) {
                showFieldError(field, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(value)) {
                showFieldError(field, 'Please enter a valid email address');
                isValid = false;
            }
            break;
            
        case 'phone':
            if (!value) {
                showFieldError(field, 'Phone number is required');
                isValid = false;
            } else if (!isValidPhone(value)) {
                showFieldError(field, 'Please enter a valid phone number');
                isValid = false;
            }
            break;
            
        case 'message':
            if (!value) {
                showFieldError(field, 'Message is required');
                isValid = false;
            } else if (value.length < 10) {
                showFieldError(field, 'Message must be at least 10 characters');
                isValid = false;
            }
            break;
    }
    
    if (isValid) {
        field.classList.add('success');
        field.classList.remove('error');
    }
    
    return isValid;
}

// Active navigation highlighting
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('nav__link--active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('nav__link--active');
                    }
                });
            }
        });
    }

    // Throttle scroll events for better performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Intersection Observer for animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.service-card, .menu-card, .feature-card, .contact__item'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Header scroll effect with mobile optimization
function initHeaderScrollEffect() {
    let lastScrollY = window.scrollY;
    const header = document.querySelector('.header');
    let ticking = false;
    
    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        // Change header appearance on scroll
        if (currentScrollY > 50) {
            header.style.backgroundColor = 'rgba(45, 45, 45, 0.95)';
            header.style.backdropFilter = 'blur(15px)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.backgroundColor = 'var(--color-surface)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}

// Touch optimizations for mobile
function initTouchOptimizations() {
    // Add touch feedback to buttons
    const buttons = document.querySelectorAll('.btn, .service-card, .menu-card, .feature-card');
    
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
            this.style.transition = 'transform 0.1s ease';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('touchcancel', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Global utility functions - Fixed
function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    console.log(`🔗 Scrolling to section: ${sectionId}`);
    
    if (targetSection) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Add visual feedback
        setTimeout(() => {
            targetSection.style.boxShadow = '0 0 30px rgba(255, 107, 53, 0.3)';
            targetSection.style.transition = 'box-shadow 0.5s ease';
            
            setTimeout(() => {
                targetSection.style.boxShadow = 'none';
            }, 2000);
        }, 1000);
        
        trackEvent('Button', `Scroll to ${sectionId}`);
        console.log(`✅ Scrolled to section: ${sectionId}`);
    } else {
        console.error(`❌ Section not found: ${sectionId}`);
    }
}

function callNow() {
    console.log('📞 Call Now button clicked');
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Show action sheet on mobile
        const options = confirm('Choose your preferred contact method:\n\nOK - Make a phone call\nCancel - Send WhatsApp message');
        
        if (options) {
            window.location.href = 'tel:+919876543210';
            trackEvent('Contact', 'Phone Call');
        } else {
            const message = 'Hi Roti Box! I am interested in your tiffin services. Please provide more details about your plans and pricing.';
            const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            trackEvent('Contact', 'WhatsApp Message');
        }
    } else {
        // Desktop behavior - open WhatsApp
        const message = 'Hi Roti Box! I am interested in your tiffin services. Please provide more details about your plans and pricing.';
        const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        trackEvent('Contact', 'WhatsApp Desktop');
    }
    
    console.log('✅ Call Now action completed');
}

function orderNow() {
    console.log('🛒 Order Now button clicked');
    
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
        const targetPosition = servicesSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Highlight services section
        setTimeout(() => {
            servicesSection.style.boxShadow = '0 0 30px rgba(255, 107, 53, 0.3)';
            servicesSection.style.transition = 'box-shadow 0.5s ease';
            
            setTimeout(() => {
                servicesSection.style.boxShadow = 'none';
            }, 2000);
        }, 1000);
        
        trackEvent('CTA', 'Order Now Button');
        console.log('✅ Order Now scroll completed');
    } else {
        console.error('❌ Services section not found');
    }
}

// Utility functions for validation
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function isValidPhone(phone) {
    const phonePattern = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phonePattern.test(phone.replace(/\s/g, ''));
}

function isValidEmailOrPhone(value) {
    return isValidEmail(value) || isValidPhone(value);
}

// Form error handling
function showFieldError(field, message) {
    field.classList.add('error');
    field.classList.remove('success');
    
    // Remove existing error
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `⚠️ ${message}`;
    field.parentElement.appendChild(errorDiv);
    
    // Shake animation for mobile feedback
    field.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        field.style.animation = '';
    }, 500);
}

function clearFieldError(field) {
    field.classList.remove('error', 'success');
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

function clearFormErrors(form) {
    const inputs = form.querySelectorAll('.form-control');
    const errorMessages = form.querySelectorAll('.error-message');
    const successMessages = form.querySelectorAll('.success-message');
    
    inputs.forEach(input => {
        input.classList.remove('error', 'success');
    });
    
    errorMessages.forEach(error => error.remove());
    successMessages.forEach(success => success.remove());
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = message;
    
    // Insert at top of page or in relevant form
    const target = document.querySelector('.contact__form') || document.querySelector('.modal__body') || document.body;
    target.insertBefore(successDiv, target.firstChild);
    
    // Auto remove after 8 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.style.opacity = '0';
            successDiv.style.transform = 'translateY(-20px)';
            setTimeout(() => successDiv.remove(), 300);
        }
    }, 8000);
    
    // Scroll to show message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function showToast(message) {
    // Create toast notification
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-surface);
        color: var(--color-text);
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        max-width: 300px;
        border: 1px solid var(--color-border);
        font-size: 14px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }, 4000);
}

// Analytics tracking
function trackEvent(category, action, label = '') {
    console.log(`📊 Analytics: ${category} - ${action}${label ? ` - ${label}` : ''}`);
    
    // Here you would integrate with actual analytics service
    // Example: gtag('event', action, { event_category: category, event_label: label });
}

// Add shake animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .nav__link--active {
        color: var(--color-primary) !important;
        background-color: rgba(255, 107, 53, 0.1);
        font-weight: var(--font-weight-semibold);
    }
    
    .animated {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Handle offline/online status
window.addEventListener('online', function() {
    showToast('✅ You are back online!');
});

window.addEventListener('offline', function() {
    showToast('📱 You are offline. Some features may not work.');
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`🚀 Page loaded in ${Math.round(loadTime)}ms`);
    trackEvent('Performance', 'Page Load Time', `${Math.round(loadTime)}ms`);
});

// Handle resize events for mobile orientation changes
window.addEventListener('resize', function() {
    // Close mobile menu on orientation change
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Handle visibility change (tab switching)
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        console.log('🍱 Welcome back to Roti Box!');
    }
});

console.log('🍱 Roti Box dark theme website fully loaded and optimized for mobile!');