const langChange = document.querySelector('#changeLanguage');
const languagesContainer = document.querySelector('.languages-container');

langChange.addEventListener('click', () => {
    languagesContainer.classList.toggle('active');
})