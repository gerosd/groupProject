const dropdown = document.querySelector('.custom-dropdown');
const dropdownSelected = document.getElementById('dropdownSelected');
const dropdownList = document.getElementById('dropdownList');
const checkboxes = dropdownList ? dropdownList.querySelectorAll('input[type="checkbox"]') : [];

let selectedValues = [];

if (dropdown && dropdownSelected) {
    dropdownSelected.addEventListener('click', () => {
        dropdown.classList.toggle('open');
    });

    // Клик вне меню - закрыть
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
        }
    });

    // Обработка выбора чекбоксов
    if (checkboxes.length) {
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

                // Здесь можно использовать selectedValues для фильтрации
                console.log('Выбраны типы:', selectedValues);
            });
        });
    }
}

// Код для двустороннего ползунка
const rangeFrom = document.getElementById('rangeFrom');
const rangeTo = document.getElementById('rangeTo');
const priceFrom = document.getElementById('priceFrom');
const priceTo = document.getElementById('priceTo');
const sliderContainer = document.getElementById('sliderContainer');

if (rangeFrom && rangeTo && priceFrom && priceTo && sliderContainer) {
    const minGap = 1000; // Минимальный промежуток между ползунками
    const minValue = parseInt(rangeFrom.min);
    const maxValue = parseInt(rangeTo.max);
    const range = maxValue - minValue;

    // Форматирование числа для отображения
    function formatPrice(val) {
        return Number(val).toLocaleString('ru-RU');
    }

    // Функция для обновления синей полосы между ползунками
    function updateSliderTrack() {
        const fromVal = parseInt(rangeFrom.value);
        const toVal = parseInt(rangeTo.value);
        
        const percent1 = ((fromVal - minValue) / range) * 100;
        const percent2 = ((toVal - minValue) / range) * 100;
        
        // Устанавливаем left и right для псевдоэлемента ::after
        sliderContainer.style.setProperty('--left-percent', percent1 + '%');
        sliderContainer.style.setProperty('--right-percent', (100 - percent2) + '%');
        
        // Обновляем отображаемые значения
        priceFrom.textContent = 'от ' + formatPrice(fromVal);
        priceTo.textContent = 'до ' + formatPrice(toVal);
    }

    // Обработчик для левого ползунка
    rangeFrom.addEventListener('input', function(e) {
        e.stopPropagation(); // Останавливаем всплытие
        
        let fromVal = parseInt(rangeFrom.value);
        let toVal = parseInt(rangeTo.value);
        
        if (toVal - fromVal < minGap) {
            fromVal = toVal - minGap;
            rangeFrom.value = fromVal;
        }
        
        updateSliderTrack();
    });

    // Обработчик для правого ползунка
    rangeTo.addEventListener('input', function(e) {
        e.stopPropagation(); // Останавливаем всплытие
        
        let fromVal = parseInt(rangeFrom.value);
        let toVal = parseInt(rangeTo.value);
        
        if (toVal - fromVal < minGap) {
            toVal = fromVal + minGap;
            rangeTo.value = toVal;
        }
        
        updateSliderTrack();
    });

    // Предотвращаем перекрытие событий
    rangeFrom.addEventListener('pointerdown', function(e) {
        e.stopPropagation();
    });
    
    rangeTo.addEventListener('pointerdown', function(e) {
        e.stopPropagation();
    });

    // Инициализация начальных значений
    updateSliderTrack();
}