// Находим все выпадающие списки на странице
const dropdowns = document.querySelectorAll('.custom-dropdown');

// Для каждого выпадающего списка настраиваем свои обработчики
dropdowns.forEach(dropdown => {
    const dropdownSelected = dropdown.querySelector('.dropdown-selected');
    const dropdownList = dropdown.querySelector('.dropdown-list');
    const checkboxes = dropdownList.querySelectorAll('input[type="checkbox"]');
    
    let selectedValues = [];

    // Обработчик нажатия на заголовок выпадающего списка
    dropdownSelected.addEventListener('click', () => {
        // Закрываем все остальные выпадающие списки
        dropdowns.forEach(otherDropdown => {
            if (otherDropdown !== dropdown) {
                otherDropdown.classList.remove('open');
            }
        });
        
        // Переключаем состояние текущего списка
        dropdown.classList.toggle('open');
    });

    // Обработка выбора чекбоксов для данного списка
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            selectedValues = Array.from(checkboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);

            // Отображение выбранных значений
            if (selectedValues.length === 0) {
                dropdownSelected.querySelector('span').textContent = 'Все';
            } else {
                dropdownSelected.querySelector('span').textContent = selectedValues.join(', ');
            }

            // Здесь можно использовать selectedValues для фильтрации
            console.log('Выбраны значения:', selectedValues);
        });
    });
});

// Клик вне меню - закрыть все выпадающие списки
document.addEventListener('click', (e) => {
    const clickedInsideDropdown = Array.from(dropdowns).some(dropdown => dropdown.contains(e.target));
    if (!clickedInsideDropdown) {
        dropdowns.forEach(dropdown => dropdown.classList.remove('open'));
    }
});