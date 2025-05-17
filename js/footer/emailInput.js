const emailButton = document.querySelector('.email-input-button');
const emailInput = document.querySelector('.email-input');

emailButton.addEventListener('click', () => {
    sendEmail();
});

emailInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        sendEmail();
    }
});

function sendEmail() {
    if (!isValidEmail(emailInput.value)) {
        alert('Введите валидный email');
        return;
    }
    emailInput.value = '';
    alert('Вы подписались на рассылку!');
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}