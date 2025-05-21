document.addEventListener('DOMContentLoaded', () => {
    // Images for each cottage type
    const cottageImages = {
        'standard': [
            'images/cottages/standard/1mesto.jpg',
            'images/cottages/standard/2mesto.png',
            'images/cottages/standard/5mesto.jpeg',
            'images/cottages/standard/10mesto.png'
        ],
        'elit': [
            'images/cottages/elit/1mesto.jpg',
            'images/cottages/elit/2mesto.jpeg',
            'images/cottages/elit/5mesto.png',
            'images/cottages/elit/10mesto.png'
        ],
        'vip': [
            'images/cottages/vip/1mesto.png',
            'images/cottages/vip/2mesto.jpg',
            'images/cottages/vip/5mesto.jpeg',
            'images/cottages/vip/10mesto.png'
        ]
    };

    // Initialize image indexes
    const currentImageIndexes = {
        'standard': 0,
        'elit': 0,
        'vip': 0
    };
    
    // Get all cottage cards
    const cottageCards = document.querySelectorAll('.cottage-card');
    
    // Setup slideshow for each cottage card
    cottageCards.forEach(card => {
        // Determine cottage type from href attribute
        const href = card.getAttribute('href');
        let cottageType = '';
        
        if (href.includes('#standard')) {
            cottageType = 'standard';
        } else if (href.includes('#elit')) {
            cottageType = 'elit';
        } else if (href.includes('#vip')) {
            cottageType = 'vip';
        }
        
        if (cottageType) {
            // Get background image element
            const backgroundImg = card.querySelector('.cottage-background-img');
            
            // Start slideshow for this cottage
            setInterval(() => {
                // Fade out current image
                backgroundImg.style.opacity = '0';
                
                // Wait for fade out, then change image and fade in
                setTimeout(() => {
                    // Update image index
                    currentImageIndexes[cottageType] = (currentImageIndexes[cottageType] + 1) % cottageImages[cottageType].length;
                    
                    // Change image source
                    backgroundImg.src = cottageImages[cottageType][currentImageIndexes[cottageType]];
                    
                    // Fade in new image
                    backgroundImg.style.opacity = '1';
                }, 500);
            }, 5000);
        }
    });
}); 