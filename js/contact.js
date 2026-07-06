// ============================================
// Contact Form Handler
// Google Sheets + WhatsApp redirect
// ============================================

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzs4OnEysblPX516uqJHKVHHwgxoQ-DHZ_AjE8xobs0JwSpTEra9txawqiqs1KLDF6oIg/exec';
const WHATSAPP_NUMBER = '97472223959';

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const btnText = document.querySelector('.btn-text');
    const btnLoader = document.querySelector('.btn-loader');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim() || 'Not provided',
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value.trim()
            };

            if (!validateForm(formData)) {
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';

            // Open WhatsApp tab now (same click) so popup blockers don't block it
            const whatsappUrl = buildWhatsAppUrl(formData);
            const whatsappWindow = window.open(whatsappUrl, '_blank');

            try {
                await fetch(GOOGLE_SCRIPT_URL, {
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

                showSuccess(formData, whatsappWindow, whatsappUrl);
                contactForm.reset();

            } catch (error) {
                console.error('Error:', error);
                if (whatsappWindow && !whatsappWindow.closed) {
                    whatsappWindow.close();
                }
                showFormError('Something went wrong saving your message. Please try again or call us at +974 7222 3959.');
            } finally {
                submitBtn.disabled = false;
                btnText.style.display = 'inline';
                btnLoader.style.display = 'none';
            }
        });

        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(input);
            });
        });
    }
});

function buildWhatsAppUrl(formData) {
    const message = `Hello Dohar Car Repair! 👋
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Service: ${formData.subject}
Details: ${formData.message}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function validateForm(data) {
    let isValid = true;

    if (!data.name || data.name.length < 2) {
        showError('name', 'Name must be at least 2 characters');
        isValid = false;
    } else {
        clearError('name');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    } else {
        clearError('email');
    }

    if (!data.subject) {
        showError('subject', 'Please select a service');
        isValid = false;
    } else {
        clearError('subject');
    }

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

function showFormError(message) {
    const contactForm = document.getElementById('contactForm');
    let errorEl = document.getElementById('formError');
    if (!errorEl && contactForm) {
        errorEl = document.createElement('div');
        errorEl.id = 'formError';
        errorEl.style.cssText = 'background:#fef2f2;color:#ef4444;padding:1rem;border-radius:8px;margin-bottom:1rem;text-align:center;';
        contactForm.parentNode.insertBefore(errorEl, contactForm);
    }
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    }
}

function showSuccess(formData, whatsappWindow, whatsappUrl) {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');

    if (formError) {
        formError.style.display = 'none';
    }

    if (contactForm && formSuccess) {
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Fallback if popup was blocked — user can tap the link on success screen
    if (!whatsappWindow || whatsappWindow.closed) {
        const fallback = document.getElementById('whatsappFallback');
        if (fallback) {
            fallback.href = whatsappUrl;
            fallback.style.display = 'inline-flex';
        }
    }
}
