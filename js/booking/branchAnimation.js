document.addEventListener('DOMContentLoaded', () => {
    const branchTop = document.querySelector('.branch-top');
    const branchBottom = document.querySelector('.branch-bottom');

    branchTop.style.transform = 'translateY(0) rotate(30deg)';
    branchBottom.style.transform = 'translateY(0) rotate(-150deg)';

    branchTop.style.transition = 'transform 0.1s ease-out';
    branchBottom.style.transition = 'transform 0.1s ease-out';

    document.addEventListener('mousemove', (e) => {
        const mouseY = e.clientY;
        const windowHeight = window.innerHeight;
        const moveAmount = 20;

        const topMove = (mouseY / windowHeight) * moveAmount;
        const bottomMove = -((mouseY / windowHeight) * moveAmount);

        branchTop.style.transform = `translateY(${topMove}px) rotate(30deg)`;
        branchBottom.style.transform = `translateY(${bottomMove}px) rotate(-150deg)`;
    });
});