document.addEventListener('DOMContentLoaded', function() {
    // Arrays of images for each service
    const images = {
        'fish': [
            'images/services/fishing.jpg',
            'images/services/fishing2.jpg',
        ],
        'quad': [
            'images/services/quad.jpg',
            'images/services/quad2.jpg',
        ],
        'basket': [
            'images/services/basket.png',
            'images/services/basketball.jpg',
        ],
        'horses': [
            'images/services/horse.jpg',
            'images/services/horse2.jpg',
        ],
        'mini': [
            'images/services/mini.png',
            'images/services/mini2.jpg',
        ],
        'golf': [
            'images/services/golf.jpg',
            'images/services/realGolf.png',
        ],
        'billi': [
            'images/services/biliard.png',
            'images/services/biliard2.jpg',
        ],
        'volley': [
            'images/services/volleyball.jpg',
            'images/services/volleyball2.jpg',
        ],
        'tennis': [
            'images/services/miniTennis.jpg',
            'images/services/miniTennis2.jpg',
        ],
        'foot': [
            'images/services/soccer.png',
            'images/services/football.jpg',
        ]
    };

    // Preload all images to avoid flicker
    function preloadImages() {
        Object.values(images).forEach(imageSet => {
            imageSet.forEach(imageSrc => {
                const img = new Image();
                img.src = imageSrc;
            });
        });
    }
    
    preloadImages();

    // For each service item
    const serviceItems = document.querySelectorAll('.services-item');
    
    serviceItems.forEach(item => {
        // Get the service type from class name
        const serviceType = Array.from(item.classList).find(cls => 
            Object.keys(images).includes(cls));
        
        if (serviceType && images[serviceType].length > 1) {
            let currentImageIndex = 0;
            
            // Set initial image when animation completes
            item.addEventListener('animationend', function(e) {
                if (e.animationName === 'fadeInScale') {
                    // Start image rotation after initial fade in
                    startImageRotation();
                }
            });
            
            function startImageRotation() {
                setInterval(() => {
                    // Calculate next image index
                    const nextImageIndex = (currentImageIndex + 1) % images[serviceType].length;
                    
                    // Add transition class
                    item.classList.add('bg-transition');
                    
                    // Change background image at the midpoint of the transition animation
                    setTimeout(() => {
                        // Update background image
                        item.style.backgroundImage = `url(${images[serviceType][nextImageIndex]})`;
                        
                        // Update current index
                        currentImageIndex = nextImageIndex;
                    }, 750); // Midpoint of the animation (1.5s total / 2)
                    
                    // Remove transition class after the animation completes
                    setTimeout(() => {
                        item.classList.remove('bg-transition');
                    }, 1500); // Match with the CSS animation duration
                }, 6000); // Change image every 6 seconds
            }
        }
    });
}); 