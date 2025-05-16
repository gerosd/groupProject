export function changePhoto(theme) {
    const hero = document.querySelector(".hero");
    if (hero) {
        const imageUrl = theme === 'dark'
            ? '../images/index/hero-black.jpg'
            : '../images/index/hero.jpg';
        hero.style.backgroundImage = `url('${imageUrl}')`;
    } else {
        console.error('Элемент .hero не найден');
    }
}