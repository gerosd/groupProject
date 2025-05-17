const dropdown = document.querySelector('.custom-dropdown');
const dropdownSelected = document.getElementById('dropdownSelected');
const dropdownList = document.getElementById('dropdownList');
const checkboxes = dropdownList.querySelectorAll('input[type="checkbox"]');

let selectedValues = [];

dropdownSelected.addEventListener('click', () => {
    dropdown.classList.toggle('open');
});

// Клик вне меню — закрыть
document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
    }
});

// Обработка выбора чекбоксов
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        selectedValues = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        // Отображение выбранных
        if (selectedValues.length === 0) {
            dropdownSelected.textContent = 'Все';
        } else {
            dropdownSelected.textContent = selectedValues.join(', ');
        }

        // Здесь можно использовать selectedValues для фильтрации или других целей
        console.log(selectedValues);
    });
});