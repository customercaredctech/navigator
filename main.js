document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 2. Mobile Nav Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navBar    = document.querySelector('.nav-bar');
    const navMenu   = document.querySelector('.nav-menu');

    if (menuToggle && navBar && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.contains('open');
            // Toggle both the wrapper (.nav-bar) and the list (.nav-menu)
            navBar.classList.toggle('open',  !isOpen);
            navMenu.classList.toggle('open', !isOpen);

            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.className = isOpen ? 'fas fa-bars' : 'fas fa-times';
            }
        });

        // Close menu when clicking outside the header
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.header') && navMenu.classList.contains('open')) {
                navBar.classList.remove('open');
                navMenu.classList.remove('open');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        });

        // Close menu when a nav link is clicked
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navBar.classList.remove('open');
                navMenu.classList.remove('open');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            });
        });
    }

    // 3. Set Active Navigation Link based on Current Page URL
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;
    const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentFile) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 4. Newsletter Form Handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('.newsletter-input');
            const email = input.value.trim();
            if (email) {
                // Show standard simulation message
                alert(`Thank you for subscribing! We've sent a confirmation to ${email}`);
                input.value = '';
            }
        });
    }

    // 5. Frequently Asked Questions Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Toggle active state
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherIcon = otherItem.querySelector('.faq-icon i');
                if (otherIcon) otherIcon.className = 'fas fa-plus';
            });

            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                const icon = item.querySelector('.faq-icon i');
                if (icon) icon.className = 'fas fa-minus';
            }
        });
    });

    // 6. Contact Form Validation and Success Banner
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Validate inputs
            let isValid = true;
            const inputs = contactForm.querySelectorAll('input, select, textarea');
            
            inputs.forEach(input => {
                const group = input.closest('.form-group');
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    if (group) group.classList.add('error');
                } else {
                    if (group) group.classList.remove('error');
                }
            });

            if (isValid) {
                const successMsg = document.createElement('div');
                successMsg.className = 'form-success-banner';
                successMsg.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <div>
                        <h4>Message Sent Successfully!</h4>
                        <p>Thank you for reaching out. One of our admission experts will contact you within 24 hours.</p>
                    </div>
                `;
                contactForm.innerHTML = '';
                contactForm.appendChild(successMsg);
            }
        });
        
        // Remove error style on input
        contactForm.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('input', () => {
                const group = input.closest('.form-group');
                if (group) group.classList.remove('error');
            });
        });
    }

    // 7. Dynamic Year in Footer
    const footerYear = document.getElementById('footerYear');
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }
});
