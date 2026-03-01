/**
 * Contact Form Auto-fill
 * Pre-fills contact form fields based on URL query parameters
 */
(function() {
    // Only run on pages with contact forms
    const contactForm = document.querySelector('.php-email-form');
    if (!contactForm) return;

    // Parse URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get('subject');
    const message = urlParams.get('message');

    // Pre-fill subject field if provided
    if (subject) {
        const subjectField = contactForm.querySelector('input[name="subject"]');
        if (subjectField) {
            subjectField.value = decodeURIComponent(subject);
        }
    }

    // Pre-fill message field if provided
    if (message) {
        const messageField = contactForm.querySelector('textarea[name="message"]');
        if (messageField) {
            messageField.value = decodeURIComponent(message);
        }
    }

    // Scroll to contact form if there are parameters
    if (subject || message) {
        // Wait for page to load completely
        setTimeout(() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 500);
    }
})();
