const toggleMenuBtn = document.querySelector('#toggleMenu');
const body = document.body;
const html = document.documentElement;

// Toggle the fullscreen menu
function toggleMenu() {
    const menu = document.querySelector('.fullscreen-menu');

    // Toggle the active class
    menu.classList.toggle('active');

    // Prevent body scrolling when menu is open
    if (menu.classList.contains('active')) {
        body.style.overflow = 'hidden';
        html.style.overflow = 'hidden'; // Добавляем для html на случай, если body не сработает

        // Ensure other fixed elements don't overlap the menu
        document.querySelectorAll('.side-menu, .cursor-circle, .scroll-to-top')
            .forEach(el => {
                el.style.zIndex = '10';
            });
    } else {
        body.style.overflow = '';
        html.style.overflow = ''; // Возвращаем обратно

        // Restore original z-index values
        document.querySelectorAll('.side-menu, .cursor-circle, .scroll-to-top')
            .forEach(el => {
                el.style.zIndex = '';
            });
    }
}

// Add click event to toggle button
toggleMenuBtn.addEventListener('click', toggleMenu);

// Add click event to close button
const closeButton = document.querySelector('.menu-close-button');
closeButton.addEventListener('click', toggleMenu);

// Add click events to menu links to close menu when clicked
const menuLinks = document.querySelectorAll('.fullscreen-menu a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Закрываем меню только если это не якорная ссылка (например, не #section)
        if (!link.getAttribute('href').startsWith('#')) {
            toggleMenu();
        }
    });
});

// Close menu when pressing Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const menu = document.querySelector('.fullscreen-menu');
        if (menu && menu.classList.contains('active')) {
            toggleMenu();
        }
    }
});