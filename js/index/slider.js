document.addEventListener('DOMContentLoaded', function() {
    const mainSlider = document.querySelector('.slider-wrapper');
    const thumbnailSlider = document.querySelector('.thumbnail-wrapper');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    const mainImages = mainSlider.querySelectorAll('img');
    const thumbnailImages = thumbnailSlider.querySelectorAll('img');
    let currentIndex = 0;

    function updateSlider(index) {
        mainImages.forEach(img => img.classList.remove('active'));
        thumbnailImages.forEach(img => img.classList.remove('active'));
        
        mainImages[index].classList.add('active');
        thumbnailImages[index].classList.add('active');
        currentIndex = index;
    }

    // Thumbnail click handlers
    thumbnailImages.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            updateSlider(index);
        });
    });

    // Previous button handler
    prevBtn.addEventListener('click', () => {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
            newIndex = mainImages.length - 1;
        }
        updateSlider(newIndex);
    });

    // Next button handler
    nextBtn.addEventListener('click', () => {
        let newIndex = currentIndex + 1;
        if (newIndex >= mainImages.length) {
            newIndex = 0;
        }
        updateSlider(newIndex);
    });

    // Auto advance slider every 5 seconds
    setInterval(() => {
        let newIndex = currentIndex + 1;
        if (newIndex >= mainImages.length) {
            newIndex = 0;
        }
        updateSlider(newIndex);
    }, 5000);
}); 