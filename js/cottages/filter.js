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



// Сам фильтр

document.addEventListener('DOMContentLoaded', function() {
    const cottagesItems = document.querySelectorAll('.cottages-item');
    const amountInput = document.getElementById('amount');
    
    // Добавляем атрибуты данных для коттеджей
    // Стандарт
    cottagesItems[0].setAttribute('data-type', 'Стандарт');
    cottagesItems[0].setAttribute('data-price', '4000');
    cottagesItems[0].setAttribute('data-capacity', '1');
    
    cottagesItems[1].setAttribute('data-type', 'Стандарт');
    cottagesItems[1].setAttribute('data-price', '7000');
    cottagesItems[1].setAttribute('data-capacity', '2');
    
    // Третий коттедж имеет вместимость 10 человек (стандартный)
    cottagesItems[2].setAttribute('data-type', 'Стандарт');
    cottagesItems[2].setAttribute('data-price', '15000');
    cottagesItems[2].setAttribute('data-capacity', '10');
    
    cottagesItems[3].setAttribute('data-type', 'Стандарт');
    cottagesItems[3].setAttribute('data-price', '10000');
    cottagesItems[3].setAttribute('data-capacity', '5');
    
    // Элит
    cottagesItems[4].setAttribute('data-type', 'Элит');
    cottagesItems[4].setAttribute('data-price', '8000');
    cottagesItems[4].setAttribute('data-capacity', '1');
    
    cottagesItems[5].setAttribute('data-type', 'Элит');
    cottagesItems[5].setAttribute('data-price', '10000');
    cottagesItems[5].setAttribute('data-capacity', '2');
    
    cottagesItems[6].setAttribute('data-type', 'Элит');
    cottagesItems[6].setAttribute('data-price', '15000');
    cottagesItems[6].setAttribute('data-capacity', '5');
    
    // Восьмой коттедж имеет вместимость 10 человек (элитный)
    cottagesItems[7].setAttribute('data-type', 'Элит');
    cottagesItems[7].setAttribute('data-price', '20000');
    cottagesItems[7].setAttribute('data-capacity', '10');
    
    // VIP
    cottagesItems[8].setAttribute('data-type', 'VIP');
    cottagesItems[8].setAttribute('data-price', '15000');
    cottagesItems[8].setAttribute('data-capacity', '1');
    
    cottagesItems[9].setAttribute('data-type', 'VIP');
    cottagesItems[9].setAttribute('data-price', '20000');
    cottagesItems[9].setAttribute('data-capacity', '2');
    
    cottagesItems[10].setAttribute('data-type', 'VIP');
    cottagesItems[10].setAttribute('data-price', '30000');
    cottagesItems[10].setAttribute('data-capacity', '5');
    
    cottagesItems[11].setAttribute('data-type', 'VIP');
    cottagesItems[11].setAttribute('data-price', '40000');
    cottagesItems[11].setAttribute('data-capacity', '5');

    // Получаем все заголовки секций и контейнеры
    const cottagesSections = document.querySelectorAll('.cottages-line');
    const cottagesContainers = document.querySelectorAll('.cottages-container');
    
    // Проверяем и устанавливаем атрибуты только если элементы существуют
    if (cottagesSections.length > 0 && cottagesContainers.length > 0) {
        // Находим и размечаем секции по их содержимому
        for (let i = 0; i < cottagesSections.length; i++) {
            const section = cottagesSections[i];
            const spanElement = section.querySelector('span');
            
            if (spanElement) {
                const sectionType = spanElement.textContent.trim();
                section.setAttribute('data-section', sectionType);
            }
        }
        
        // Размечаем контейнеры (предполагаем, что они идут в том же порядке)
        if (cottagesContainers.length >= 3) {
            cottagesContainers[0].setAttribute('data-container', 'Стандарт');
            cottagesContainers[1].setAttribute('data-container', 'Элит');
            cottagesContainers[2].setAttribute('data-container', 'VIP');
        }
    }
    
    // Добавление функции фильтрации в существующие обработчики событий
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterCottages);
    });
    
    rangeFrom.addEventListener('input', function() {
        updateSliderTrack();
        filterCottages();
    });
    
    rangeTo.addEventListener('input', function() {
        updateSliderTrack();
        filterCottages();
    });
    
    amountInput.addEventListener('input', filterCottages);
    
    // Функция фильтрации
    function filterCottages() {
        const selectedTypes = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        
        const minPrice = parseInt(rangeFrom.value);
        const maxPrice = parseInt(rangeTo.value);
        const capacity = amountInput.value ? parseInt(amountInput.value) : 0;
        
        const showAllTypes = selectedTypes.length === 0;
        
        // Специальная обработка для фильтрации 5-10
        const isShowingLargeCottages = capacity >= 5 && capacity <= 10;
        
        // Проверяем каждый коттедж на стандартные условия фильтрации
        cottagesItems.forEach((item) => {
            const cottageType = item.getAttribute('data-type');
            const cottagePrice = parseInt(item.getAttribute('data-price'));
            const cottageCapacity = parseInt(item.getAttribute('data-capacity'));
            
            // Стандартные условия фильтрации
            const typeMatch = showAllTypes || selectedTypes.includes(cottageType);
            const priceMatch = cottagePrice >= minPrice && cottagePrice <= maxPrice;
            
            // Специальное условие для вместимости
            let capacityMatch = false;
            
            if (capacity === 0) {
                // Если фильтр не задан, показываем все коттеджи
                capacityMatch = true;
            } else if (isShowingLargeCottages && cottageCapacity === 10) {
                // Если фильтр 5-10 и коттедж вмещает 10 человек, безусловно показываем
                capacityMatch = true;
            } else {
                // Обычная проверка - коттеджи с вместимостью >= указанной
                capacityMatch = cottageCapacity >= capacity;
            }
            
            // Применяем фильтр
            if (typeMatch && priceMatch && capacityMatch) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
        
        // ВАЖНО: Принудительно показываем оба коттеджа с вместимостью 10 
        // при фильтре от 5 до 10 (если они проходят по цене и типу)
        if (isShowingLargeCottages) {
            // 1. Стандартный коттедж с вместимостью 10 (третий - индекс 2)
            const standardCottage = cottagesItems[2];
            const standardPrice = parseInt(standardCottage.getAttribute('data-price'));
            const standardTypeMatch = showAllTypes || selectedTypes.includes('Стандарт');
            
            // 2. Элитный коттедж с вместимостью 10 (восьмой - индекс 7)
            const elitCottage = cottagesItems[7];
            const elitPrice = parseInt(elitCottage.getAttribute('data-price'));
            const elitTypeMatch = showAllTypes || selectedTypes.includes('Элит');
            
            // Проверяем цену и тип для стандартного
            if (standardPrice >= minPrice && standardPrice <= maxPrice && standardTypeMatch) {
                standardCottage.style.display = 'flex';
            }
            
            // Проверяем цену и тип для элитного
            if (elitPrice >= minPrice && elitPrice <= maxPrice && elitTypeMatch) {
                elitCottage.style.display = 'flex';
            }
        }
        
        // Проверяем, есть ли видимые коттеджи в каждом разделе
        let hasVisibleStandard = false;
        let hasVisibleElite = false;
        let hasVisibleVIP = false;
        
        cottagesItems.forEach((item) => {
            if (item.style.display === 'flex') {
                const type = item.getAttribute('data-type');
                if (type === 'Стандарт') hasVisibleStandard = true;
                if (type === 'Элит') hasVisibleElite = true;
                if (type === 'VIP') hasVisibleVIP = true;
            }
        });
        
        // Принудительно делаем видимыми или скрываем секции и контейнеры
        if (hasVisibleStandard) {
            document.querySelector('.cottages-line:nth-child(1)').style.display = 'flex';
            document.querySelector('.cottages-container:nth-child(2)').style.display = 'flex';
        } else {
            document.querySelector('.cottages-line:nth-child(1)').style.display = 'none';
            document.querySelector('.cottages-container:nth-child(2)').style.display = 'none';
        }
        
        if (hasVisibleElite) {
            document.querySelector('.cottages-line:nth-child(3)').style.display = 'flex';
            document.querySelector('.cottages-container:nth-child(4)').style.display = 'flex';
        } else {
            document.querySelector('.cottages-line:nth-child(3)').style.display = 'none';
            document.querySelector('.cottages-container:nth-child(4)').style.display = 'none';
        }
        
        if (hasVisibleVIP) {
            document.querySelector('.cottages-line:nth-child(5)').style.display = 'flex';
            document.querySelector('.cottages-container:nth-child(6)').style.display = 'flex';
        } else {
            document.querySelector('.cottages-line:nth-child(5)').style.display = 'none';
            document.querySelector('.cottages-container:nth-child(6)').style.display = 'none';
        }
    }
    
    // Вызовем фильтрацию при загрузке страницы
    filterCottages();
});