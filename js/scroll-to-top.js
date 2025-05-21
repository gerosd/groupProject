document.addEventListener('DOMContentLoaded', function() {
    // Create the scroll to top button
    const scrollButton = document.createElement('div');
    scrollButton.className = 'scroll-to-top';
    document.body.appendChild(scrollButton);

    // Show/hide the button based on scroll position
    function toggleScrollButton() {
        const scrollY = window.scrollY;
        if (scrollY > 200) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    }

    // Smooth scroll to top when clicked
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Listen for scroll events
    window.addEventListener('scroll', toggleScrollButton);
    
    // Initial check for button visibility
    toggleScrollButton();
}); 