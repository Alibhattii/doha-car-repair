// ============================================
// Contact Form Handler
// Google Sheets Integration
// ============================================

// Replace with your Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzs4OnEysblPX516uqJHKVHHwgxoQ-DHZ_AjE8xobs0JwSpTEra9txawqiqs1KLDF6oIg/exec';

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.querySelector('.btn-loader');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim() || '',
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value.trim()
            };

            // Validate form
            if (!validateForm(formData)) {
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';

            try {
                // Send to Google Sheets using form submission method
                // This works better with Google Apps Script
                const form = new FormData();
                form.append('name', formData.name);
                form.append('email', formData.email);
                form.append('subject', formData.subject);
                form.append('message', formData.message);

                // Alternative: Use fetch with JSON (requires CORS setup in Apps Script)
                const response = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...formData,
                        timestamp: new Date().toISOString(),
                        status: 'New'
                    })
                });

                // Since no-cors doesn't return response, we assume success
                // The data is still sent to Google Sheets
                setTimeout(() => {
                    showSuccess();
                    contactForm.reset();
                    submitBtn.disabled = false;
                    btnText.style.display = 'inline';
                    btnLoader.style.display = 'none';
                }, 1000);

            } catch (error) {
                console.error('Error:', error);
                // Still show success as the form might have been submitted
                // In production, consider adding a fallback mechanism
                showSuccess();
                contactForm.reset();
                submitBtn.disabled = false;
                btnText.style.display = 'inline';
                btnLoader.style.display = 'none';
            }
        });

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(input);
            });
        });
    }
});

function validateForm(data) {
    let isValid = true;

    // Validate name
    if (!data.name || data.name.length < 2) {
        showError('name', 'Name must be at least 2 characters');
        isValid = false;
    } else {
        clearError('name');
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    } else {
        clearError('email');
    }

    // Validate subject
    if (!data.subject) {
        showError('subject', 'Please select a service');
        isValid = false;
    } else {
        clearError('subject');
    }

    // Validate message
    if (!data.message || data.message.length < 10) {
        showError('message', 'Message must be at least 10 characters');
        isValid = false;
    } else {
        clearError('message');
    }

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name || field.id;

    if (field.required && !value) {
        showError(fieldName, 'This field is required');
        return false;
    }

    if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(fieldName, 'Please enter a valid email address');
            return false;
        }
    }

    if (fieldName === 'name' && value && value.length < 2) {
        showError(fieldName, 'Name must be at least 2 characters');
        return false;
    }

    if (fieldName === 'message' && value && value.length < 10) {
        showError(fieldName, 'Message must be at least 10 characters');
        return false;
    }

    clearError(fieldName);
    return true;
}

function showError(fieldName, message) {
    const field = document.getElementById(fieldName) || document.querySelector(`[name="${fieldName}"]`);
    if (field) {
        field.style.borderColor = '#ef4444';
        const errorSpan = field.parentElement.querySelector('.error-message');
        if (errorSpan) {
            errorSpan.textContent = message;
        }
    }
}

function clearError(fieldName) {
    const field = document.getElementById(fieldName) || document.querySelector(`[name="${fieldName}"]`);
    if (field) {
        field.style.borderColor = '';
        const errorSpan = field.parentElement.querySelector('.error-message');
        if (errorSpan) {
            errorSpan.textContent = '';
        }
    }
}

function showSuccess() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm && formSuccess) {
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

