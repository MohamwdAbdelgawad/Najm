document.addEventListener('DOMContentLoaded', function() {
    // Current date and time
    updateDateTime();
    setInterval(updateDateTime, 60000); // Update every minute

    // Initialize tooltips and popovers if using Bootstrap
    try {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });

        const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        popoverTriggerList.map(function (popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl);
        });
    } catch (e) {
        console.log('Bootstrap JS components not fully loaded.');
    }

    // Play button click handler for videos
    const playButtons = document.querySelectorAll('.play-button');
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            // In a real implementation, this would launch a video player or modal
            alert('Video playback would start here in a real implementation.');
        });
    });

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (validateEmail(email)) {
                // In a real implementation, this would submit to a backend
                alert('شكراً لاشتراكك في النشرة الإخبارية!');
                this.reset();
            } else {
                alert('يرجى إدخال بريد إلكتروني صحيح.');
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== "#") {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add animation to news cards on scroll
    const newsCards = document.querySelectorAll('.news-card');
    if (newsCards.length > 0) {
        window.addEventListener('scroll', function() {
            animateOnScroll(newsCards);
        });
        // Initial check
        animateOnScroll(newsCards);
    }
});

// Update date and time
function updateDateTime() {
    const now = new Date();
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    
    // Using Arabic locale for date and time formatting
    const formattedDate = now.toLocaleDateString('ar-SA', dateOptions);
    const formattedTime = now.toLocaleTimeString('ar-SA', timeOptions);
    
    const dateElement = document.getElementById('current-date');
    const timeElement = document.getElementById('current-time');
    
    if (dateElement) dateElement.textContent = formattedDate;
    if (timeElement) timeElement.textContent = formattedTime;
}

// Validate email
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Animate elements when they scroll into view
function animateOnScroll(elements) {
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = (elementTop < window.innerHeight) && (elementBottom > 0);
        
        if (isVisible && !element.classList.contains('animated')) {
            element.classList.add('animated', 'fadeInUp');
        }
    });
}