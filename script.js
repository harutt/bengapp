// IMPORTANT: Replace this with your Google Apps Script Web App URL
// See SETUP.md for instructions on how to get this URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwi-LZcLwHyIxfe_jF9Rnf4EzLJdZ9iEi8_2t4COgihUrvB8Vh6xk6440F-6t1YlgSZxA/exec';

// Function to reveal location
function revealLocation() {
    const locationNote = document.getElementById('locationNote');
    const fullLocation = document.getElementById('fullLocation');

    if (locationNote && fullLocation) {
        locationNote.style.display = 'none';
        fullLocation.style.display = 'block';
        // Store in localStorage
        localStorage.setItem('rsvpCompleted', 'true');
    }
}


// Function to update CTA button
function updateCTAButton() {
    const ctaBtn = document.getElementById('ctaBtn');
    if (ctaBtn) {
        ctaBtn.textContent = 'View Confirmation';
    }
}

// Check if user has already RSVP'd on page load
if (localStorage.getItem('rsvpCompleted') === 'true') {
    document.addEventListener('DOMContentLoaded', function() {
        revealLocation();
        showMainPrintButton();
        updateCTAButton();

        // Set up modal to show success message instead of form
        const form = document.getElementById('rsvpForm');
        const successMessage = document.getElementById('successMessage');
        if (form && successMessage) {
            form.style.display = 'none';
            successMessage.style.display = 'block';
        }
    });
}

// Country code dropdown handling
const countryCodeBtn = document.getElementById('countryCodeBtn');
const countryDropdown = document.getElementById('countryDropdown');
const countryCodeInput = document.getElementById('countryCode');

// Toggle dropdown
countryCodeBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    countryDropdown.classList.toggle('open');
});

// Select country
document.querySelectorAll('.country-option').forEach(option => {
    option.addEventListener('click', function() {
        const code = this.getAttribute('data-code');
        const country = this.getAttribute('data-country');

        // Update button
        const flagClass = `fi fi-${country}`;
        countryCodeBtn.innerHTML = `
            <span class="${flagClass}"></span>
            <span class="code-text">${code}</span>
        `;

        // Update hidden input
        countryCodeInput.value = code;

        // Close dropdown
        countryDropdown.classList.remove('open');
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    if (!countryCodeBtn.contains(e.target) && !countryDropdown.contains(e.target)) {
        countryDropdown.classList.remove('open');
    }
});

// Modal handling
const modal = document.getElementById('rsvpModal');
const ctaBtn = document.getElementById('ctaBtn');
const modalClose = document.getElementById('modalClose');

// Open modal
ctaBtn.addEventListener('click', function() {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
});

// Close modal
modalClose.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Guest details conditional field
const guestsSelect = document.getElementById('guests');
const guestDetailsGroup = document.getElementById('guestDetailsGroup');
const guestDetailsTextarea = document.getElementById('guestDetails');

guestsSelect.addEventListener('change', function() {
    const selectedValue = this.value;

    // Show guest details field if more than "Just me" (value "1")
    if (selectedValue && selectedValue !== "1") {
        guestDetailsGroup.style.display = 'flex';
        guestDetailsTextarea.required = true;
    } else {
        guestDetailsGroup.style.display = 'none';
        guestDetailsTextarea.required = false;
        guestDetailsTextarea.value = ''; // Clear the field when hidden
    }
});

// Form submission
document.getElementById('rsvpForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const submitBtn = e.target.querySelector('.submit-btn');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const form = e.target;

    // Disable submit button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    // Hide previous messages
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';

    // Collect form data
    const countryCode = document.getElementById('countryCode').value;
    const phoneNumber = document.getElementById('phone').value;
    const fullPhone = countryCode +  phoneNumber;

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: fullPhone,
        guests: document.getElementById('guests').value,
        guestDetails: document.getElementById('guestDetails').value || '',
        timestamp: new Date().toISOString()
    };

    try {
        // Check if URL is configured
        if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
            throw new Error('Google Script URL not configured. Please see SETUP.md');
        }

        // Submit to Google Sheets
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Google Apps Script requires no-cors mode
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        // Note: With no-cors mode, we can't read the response,
        // so we assume success if no error was thrown

        // Reveal the location on the main page
        revealLocation();

        // Show success message
        form.style.display = 'none';
        successMessage.style.display = 'block';


        // Update CTA button text
        updateCTAButton();

    } catch (error) {
        console.error('Error submitting RSVP:', error);

        // Show error message
        errorMessage.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit RSVP';
    }
});

// Phone number formatting - only allow numbers and basic formatting
document.getElementById('phone').addEventListener('input', function(e) {
    // Allow only numbers, spaces, and basic formatting characters
    let value = e.target.value.replace(/[^\d\s\-()]/g, '');
    e.target.value = value;
});

// Print invitation handler
document.addEventListener('DOMContentLoaded', function() {
    const printBtn = document.getElementById('printBtn');

    if (printBtn) {
        printBtn.addEventListener('click', function() {
            // Close the modal first
            const modal = document.getElementById('rsvpModal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';

            // Wait a moment for the modal to close, then print
            setTimeout(() => {
                window.print();
            }, 300);
        });
    }
});
