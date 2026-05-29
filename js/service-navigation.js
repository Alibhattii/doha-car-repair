// Service Navigation - Auto-select service on contact page
document.addEventListener('DOMContentLoaded', function() {
    // Get service parameter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    
    if (serviceParam && document.getElementById('subject')) {
        const subjectSelect = document.getElementById('subject');
        const serviceValue = decodeURIComponent(serviceParam);
        
        // Try to find matching option
        for (let option of subjectSelect.options) {
            if (option.value === serviceValue || option.text.includes(serviceValue)) {
                subjectSelect.value = option.value;
                
                // Scroll to form and highlight the select
                setTimeout(() => {
                    subjectSelect.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    subjectSelect.focus();
                    subjectSelect.style.borderColor = 'var(--primary-color)';
                    subjectSelect.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.2)';
                    
                    setTimeout(() => {
                        subjectSelect.style.borderColor = '';
                        subjectSelect.style.boxShadow = '';
                    }, 2000);
                }, 300);
                
                break;
            }
        }
    }
});

