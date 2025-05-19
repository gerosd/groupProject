import { changePhoto } from "../index/changePhoto.js";

const themeToggle = document.querySelector('#themeToggle');
const themeIcon = document.querySelector('#themeToggle');

themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Add transition for smooth icon change
    themeIcon.style.transition = "transform 0.3s ease, opacity 0.3s ease";
    themeIcon.style.transform = "rotate(90deg)";
    themeIcon.style.opacity = "0";
    
    // Change the icon with animation
    setTimeout(() => {
        if (newTheme === 'dark') {
            themeIcon.src = "images/icons/themeChangeLight.svg";
        } else {
            themeIcon.src = "images/icons/themeChange.svg";
        }
        
        themeIcon.style.transform = "rotate(0deg)";
        themeIcon.style.opacity = "1";
    }, 150);
    
    changePhoto(newTheme);
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
    
    // Set initial icon based on theme
    if (savedTheme === 'dark') {
        themeIcon.src = "images/icons/themeChangeLight.svg";
    }
    
    changePhoto(savedTheme);
}