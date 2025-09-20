// Typing effect for header
(function() {
    const titles = [
        " Computer Science Engineer ",
        " Developer ",
        " UI/UX Enthusiast ",
        " Aspiring Full-Stack Developer ",
        " Problem Solver "
    ];
    const typingElement = document.getElementById("typing");
    let currentTitle = 0, charIndex = 0, isDeleting = false;

    function typeEffect() {
        const currentText = titles[currentTitle];
        typingElement.textContent = isDeleting
            ? currentText.substring(0, charIndex--)
            : currentText.substring(0, charIndex++);

        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => { isDeleting = true; typeEffect(); }, 1000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentTitle = (currentTitle + 1) % titles.length;
            setTimeout(typeEffect, 500);
        } else {
            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }
    }

    typeEffect();
})();

// Navigation and section switching
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Update active nav button
    document.querySelectorAll('.nav-button').forEach(button => {
        button.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    // Show the selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Resume download function
function downloadResume() {
    // Replace this with your actual resume PDF URL
    const resumeUrl = 'https://docs.google.com/document/d/1_R-uNJbsfpI1cCQVQWQywgFeE-5IBDyx/edit?tab=t.0';
    
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Aditya_Mahekar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Fallback in case the above doesn't work
    window.open(resumeUrl, '_blank');
}

// Dark/Light Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const icon = themeToggle.querySelector('i');

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.body.classList.add('dark-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Project filtering functionality
function initProjectFilters() {
    const filterPills = document.querySelectorAll('.filter-pill');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            // Remove active class from all pills
            filterPills.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked pill
            pill.classList.add('active');
            
            // Get filter value
            const filterValue = pill.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                const projectType = card.getAttribute('data-type') || 'micro'; // Default to micro if no type specified
                
                if (filterValue === 'all' || projectType === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Contact form submission
function handleContactForm() {
    const contactForm = document.getElementById('contactForm');
    const submitButton = document.getElementById('submitButton');
    
    if (contactForm) {
        // Create a hidden iframe for form submission
        const iframe = document.createElement('iframe');
        iframe.name = 'formsubmit-iframe';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        
        // Update form attributes for FormSubmit.co
        contactForm.setAttribute('action', 'https://formsubmit.co/mahekaraditya468@gmail.com');
        contactForm.setAttribute('method', 'POST');
        contactForm.setAttribute('target', 'formsubmit-iframe');
        
        // Add hidden fields that FormSubmit.co expects
        const hiddenFields = [
            { name: '_subject', value: 'New Contact Form Submission' },
            { name: '_template', value: 'table' },
            { name: '_captcha', value: 'false' },
            { name: '_blacklist', value: 'spammy pattern, bad word' }
        ];
        
        hiddenFields.forEach(field => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = field.name;
            input.value = field.value;
            contactForm.appendChild(input);
        });
        
        contactForm.addEventListener('submit', function(e) {
            // Client-side validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                e.preventDefault();
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            if (!isValidEmail(email)) {
                e.preventDefault();
                alert('Please enter a valid email address');
                return;
            }
            
            // Show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Listen for the iframe load event to detect form submission completion
            iframe.onload = function() {
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                
                try {
                    // This might not work due to cross-origin restrictions
                    // but FormSubmit.co will redirect to a success page
                    alert('Message sent successfully!');
                    contactForm.reset();
                } catch (error) {
                    // If we can't access iframe content due to CORS, assume success
                    alert('Message sent successfully!');
                    contactForm.reset();
                }
            };
        });
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}

// View counter functionality
function updateViewCount() {
    // Get current count from localStorage or initialize to 0
    let count = localStorage.getItem('portfolioViews') || 0;
    
    // Increment count
    count = parseInt(count) + 1;
    
    // Save updated count
    localStorage.setItem('portfolioViews', count);
    
    // Update display
    document.getElementById('viewCount').textContent = count.toLocaleString();
}

// Share portfolio function
function sharePortfolio() {
    const portfolioUrl = 'https://adityamahekar.github.io/MyWeb/';
    const shareText = 'Check out Aditya Mahekar\'s portfolio - Computer Science Engineer and Developer';
    
    // Check if Web Share API is supported
    if (navigator.share) {
        navigator.share({
            title: 'Aditya Mahekar Portfolio',
            text: shareText,
            url: portfolioUrl
        })
        .catch(error => {
            console.log('Error sharing:', error);
            fallbackShare(portfolioUrl, shareText);
        });
    } else {
        fallbackShare(portfolioUrl, shareText);
    }
}

// Fallback for browsers that don't support Web Share API
function fallbackShare(url, text) {
    // Copy to clipboard as fallback
    navigator.clipboard.writeText(`${text}: ${url}`)
        .then(() => {
            alert('Portfolio link copied to clipboard!');
        })
        .catch(err => {
            // Final fallback - open in new window
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        });
}

// Add animation to elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.education-item, .skill-pill, .project-card, .certification-card, .activity-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateViewCount();
    initProjectFilters();
    handleContactForm();
    animateOnScroll();
    
    // Trigger scroll once to animate elements in view on page load
    window.dispatchEvent(new Event('scroll'));
});

window.addEventListener('scroll', animateOnScroll);
