document.addEventListener('DOMContentLoaded', function() {
    // Get all advantage items
    const advantageItems = document.querySelectorAll('.advantage-item');
    
    // Initial setup
    advantageItems.forEach(item => {
        // Create expanded content div that will be shown/hidden
        const expandedContent = document.createElement('div');
        expandedContent.className = 'advantage-expanded';
        
        // Get the text content from the paragraph
        const content = item.querySelector('.advantage-content p').textContent;
        
        // Create a more detailed version (for demo purposes)
        const detailedContent = document.createElement('p');
        detailedContent.textContent = content + ' ' + content;
        expandedContent.appendChild(detailedContent);
        
        // Hide expanded content initially
        expandedContent.style.height = '0';
        expandedContent.style.overflow = 'hidden';
        expandedContent.style.opacity = '0';
        expandedContent.style.transition = 'all 0.3s ease';
        expandedContent.style.backgroundColor = 'var(--background)';
        expandedContent.style.padding = '0 20px';
        expandedContent.style.borderRadius = '0 0 15px 15px';
        expandedContent.style.marginTop = '-10px';
        expandedContent.style.zIndex = '0';
        expandedContent.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        
        // Add the expanded content after the main content
        item.appendChild(expandedContent);
        
        // Get tail element
        const tail = item.querySelector('.advantage-tail');
        
        // Add clicked state property to item
        item.isExpanded = false;
        
        // Add click event to tail
        tail.addEventListener('click', function() {
            toggleAdvantage(item);
        });
    });
    
    // Function to toggle advantage visibility
    function toggleAdvantage(item) {
        const expandedContent = item.querySelector('.advantage-expanded');
        const tail = item.querySelector('.advantage-tail');
        
        // Toggle state
        item.isExpanded = !item.isExpanded;
        
        if (item.isExpanded) {
            // Expand the content
            expandedContent.style.height = expandedContent.scrollHeight + 'px';
            expandedContent.style.opacity = '1';
            expandedContent.style.padding = '20px';
            
            // Rotate the tail image
            tail.style.transform = 'translateX(-50%) rotate(180deg)';
        } else {
            // Collapse the content
            expandedContent.style.height = '0';
            expandedContent.style.opacity = '0';
            expandedContent.style.padding = '0 20px';
            
            // Reset the tail image rotation
            tail.style.transform = 'translateX(-50%) rotate(0deg)';
        }
    }
}); 