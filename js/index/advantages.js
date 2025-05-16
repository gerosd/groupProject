document.addEventListener('DOMContentLoaded', function() {
    const advantageItems = document.querySelectorAll('.advantage-item');
    
    advantageItems.forEach(item => {
        const tail = item.querySelector('.advantage-tail');
        
        if (tail) {
            tail.addEventListener('click', () => {
                advantageItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });

                const isActive = item.classList.contains('active');
                
                if (!isActive) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }
    });
}); 