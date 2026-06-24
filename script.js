/* ===========================
   Portfolio Website JavaScript
   =========================== */

// ===========================
// Mobile Navigation Toggle
// ===========================

const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const navLink = document.querySelectorAll('.nav-link');

/**
 * Toggles the mobile navigation menu
 */
hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLink.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const isClickInsideNav = hamburger.contains(event.target) || navLinks.contains(event.target);
    if (!isClickInsideNav && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Handle hamburger keyboard navigation
hamburger.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    }
});

// ===========================
// Form Validation
// ===========================

const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const submitButton = document.querySelector('.submit-button');

/**
 * Validates email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Displays error message for a field
 * @param {HTMLElement} input - Input element
 * @param {string} errorId - Error message element ID
 * @param {string} message - Error message to display
 */
function showError(input, errorId, message) {
    input.classList.add('error');
    document.getElementById(errorId).textContent = message;
}

/**
 * Clears error message for a field
 * @param {HTMLElement} input - Input element
 * @param {string} errorId - Error message element ID
 */
function clearError(input, errorId) {
    input.classList.remove('error');
    document.getElementById(errorId).textContent = '';
}

/**
 * Validates form inputs
 * @returns {boolean} - True if all inputs are valid, false otherwise
 */
function validateForm() {
    let isValid = true;

    // Validate name
    if (nameInput.value.trim() === '') {
        showError(nameInput, 'nameError', 'Name is required');
        isValid = false;
    } else if (nameInput.value.trim().length < 2) {
        showError(nameInput, 'nameError', 'Name must be at least 2 characters');
        isValid = false;
    } else {
        clearError(nameInput, 'nameError');
    }

    // Validate email
    if (emailInput.value.trim() === '') {
        showError(emailInput, 'emailError', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, 'emailError', 'Please enter a valid email');
        isValid = false;
    } else {
        clearError(emailInput, 'emailError');
    }

    // Validate message
    if (messageInput.value.trim() === '') {
        showError(messageInput, 'messageError', 'Message is required');
        isValid = false;
    } else if (messageInput.value.trim().length < 10) {
        showError(messageInput, 'messageError', 'Message must be at least 10 characters');
        isValid = false;
    } else {
        clearError(messageInput, 'messageError');
    }

    return isValid;
}

/**
 * Handles form submission
 * @param {Event} event - Form submission event
 */
contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    if (validateForm()) {
        // Show success message
        submitButton.textContent = 'Message Sent! ✓';
        submitButton.classList.add('success');

        // Reset form
        contactForm.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.textContent = 'Send Message';
            submitButton.classList.remove('success');
        }, 3000);

        console.log('Form submitted successfully!');
    }
});

// Real-time validation on input
nameInput.addEventListener('blur', function() {
    if (this.value.trim() !== '') {
        if (this.value.trim().length < 2) {
            showError(this, 'nameError', 'Name must be at least 2 characters');
        } else {
            clearError(this, 'nameError');
        }
    }
});

emailInput.addEventListener('blur', function() {
    if (this.value.trim() !== '') {
        if (!isValidEmail(this.value.trim())) {
            showError(this, 'emailError', 'Please enter a valid email');
        } else {
            clearError(this, 'emailError');
        }
    }
});

messageInput.addEventListener('blur', function() {
    if (this.value.trim() !== '') {
        if (this.value.trim().length < 10) {
            showError(this, 'messageError', 'Message must be at least 10 characters');
        } else {
            clearError(this, 'messageError');
        }
    }
});

// ===========================
// Smooth Scroll with Active Nav Link
// ===========================

/**
 * Updates active nav link based on scroll position
 */
window.addEventListener('scroll', function() {
    let current = '';

    // Get all sections
    const sections = document.querySelectorAll('section, header');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    // Update active nav link
    navLink.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===========================
// Project Card Interaction
// ===========================

const projectCards = document.querySelectorAll('.project-card');

/**
 * Adds keyboard navigation to project cards
 */
projectCards.forEach(card => {
    card.setAttribute('tabindex', '0');

    card.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const link = this.querySelector('.project-link');
            if (link) {
                link.click();
            }
        }
    });
});

// ===========================
// Scroll Animation
// ===========================

/**
 * Observes elements and adds animation when they enter viewport
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards and skill items
projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach(skill => {
    skill.style.opacity = '0';
    skill.style.transform = 'translateY(20px)';
    skill.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(skill);
});

// ===========================
// Back to Top Button (Optional Enhancement)
// ===========================

/**
 * Creates and manages back-to-top button
 */
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.className = 'back-to-top';
backToTopButton.setAttribute('aria-label', 'Back to top');
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background-color: #2563eb;
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    display: none;
    z-index: 999;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, transform 0.3s ease;
`;

document.body.appendChild(backToTopButton);

// Show/hide back to top button
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

// Scroll to top on click
backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTopButton.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
});

backToTopButton.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
});

// ===========================
// Keyboard Accessibility
// ===========================

/**
 * Prevents accidental form submission with Ctrl+Enter
 * (Optional enhancement for form safety)
 */
messageInput.addEventListener('keydown', function(event) {
    if (event.key === 'Tab' && this.value.length > 0) {
        // Allow Tab to move to next element
        return;
    }
});

// ===========================
// Console Welcome Message
// ===========================

console.log('%c Welcome to My Portfolio! ', 'background: #2563eb; color: white; font-size: 16px; padding: 10px;');
console.log('%c Built with HTML5, CSS3, and JavaScript ES6+ ', 'color: #2563eb; font-size: 12px;');
console.log('%c Check out the code and feel free to reach out! ', 'color: #10b981; font-size: 12px;');
