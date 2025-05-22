// Находим все выпадающие списки на странице
const dropdowns = document.querySelectorAll('.custom-dropdown');
const eventItems = document.querySelectorAll('.event-item');
const eventsContainer = document.querySelector('.events-container');

// Объект для хранения выбранных значений для каждого типа фильтра
const selectedFilters = {
    day: [],
    time: [],
    place: [],
    status: []
};

// Словарь для сопоставления полных названий дней недели с сокращениями
const dayMappings = {
    'Понедельник': 'Пн',
    'Вторник': 'Вт',
    'Среда': 'Ср',
    'Четверг': 'Чт',
    'Пятница': 'Пт',
    'Суббота': 'Сб',
    'Воскресенье': 'Вс'
};

// Создаем элемент для сообщения об отсутствии результатов
const noResultsElement = document.createElement('div');
noResultsElement.classList.add('no-results-message');
noResultsElement.textContent = 'Нет мероприятий, соответствующих выбранным фильтрам';
noResultsElement.style.display = 'none';
noResultsElement.style.textAlign = 'center';
noResultsElement.style.padding = '30px';
noResultsElement.style.fontSize = '18px';
noResultsElement.style.color = 'var(--light)';
eventsContainer.appendChild(noResultsElement);

// Инициализация - привязка фильтров к мероприятиям и добавление CSS для анимаций
function initializeEvents() {
    console.log("Инициализация событий...");

    // Добавляем CSS-стили для анимаций
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .event-item {
            transition: opacity 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease;
        }
        .filter-active .event-item {
            opacity: 0.7;
            transform: scale(0.97);
        }
        .filter-active .event-item.visible {
            opacity: 1;
            transform: scale(1);
        }
        .event-item.fade-out {
            opacity: 0 !important;
            transform: translateY(10px) scale(0.95) !important;
            transition: opacity 0.35s ease-out, transform 0.35s ease-out !important;
        }
        .event-item.fade-in {
            animation: fadeInUp 0.4s ease-out forwards;
        }
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(15px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        .dropdown-selected.active {
            background: var(--light);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }
    `;
    document.head.appendChild(styleElement)
  
    eventItems.forEach(item => {
        // Извлекаем информацию о месте проведения
        const placeElement = item.querySelector('.desc-text-place');
        if (placeElement) {
            const placeText = placeElement.textContent;
            const placeMatch = placeText.match(/Место проведения: (.*)/i);
            if (placeMatch && placeMatch[1]) {
                const place = placeMatch[1].trim();
                // Сохраняем данные о месте в data-атрибуте для более быстрого доступа при фильтрации
                item.setAttribute('data-place', place);
                console.log(`Мероприятие: ${item.querySelector('.desc-text-title')?.textContent}, место: ${place}`);
            } else {
                console.warn("Не удалось извлечь место проведения из:", placeText);
            }
        }

        // Извлекаем информацию о дне недели
        let dayElement = item.querySelector('.day-text span') || item.querySelector('.one-time-day-text span');
        if (dayElement) {
            const fullDay = dayElement.textContent.trim();
            const shortDay = dayMappings[fullDay] || '';
            item.setAttribute('data-day', shortDay);
        }

        // Извлекаем информацию о времени
        let timeElement = item.querySelector('.time-text span') || item.querySelector('.one-time-time-text span');
        if (timeElement) {
            const time = timeElement.textContent.trim();
            item.setAttribute('data-time', time);
        }

        // Определяем статус (разовое или еженедельное)
        const status = item.classList.contains('one-time') ? 'Разово' : 'Каждую неделю';
        item.setAttribute('data-status', status);
    });
}

// Запускаем инициализацию при загрузке страницы
initializeEvents();

// Вспомогательная функция для принудительного вызова reflow
function forceReflow(element) {
    // Принудительно вызываем reflow для применения стилей
    void element.offsetWidth;
}

// Функция для применения фильтров
function applyFilters() {
    console.log("Применение фильтров:", selectedFilters);

    // Проверяем, есть ли активные фильтры
    const hasActiveFilters = Object.values(selectedFilters).some(filterValues => filterValues.length > 0);

    // Добавляем/убираем класс для контейнера в зависимости от состояния фильтров
    if (hasActiveFilters) {
        eventsContainer.classList.add('filter-active');

        // Подсветим активные выпадающие списки
        dropdowns.forEach(dropdown => {
            const filterType = dropdown.getAttribute('data-filter-type');
            const dropdownSelected = dropdown.querySelector('.dropdown-selected');

            if (selectedFilters[filterType].length > 0) {
                dropdownSelected.classList.add('active');
            } else {
                dropdownSelected.classList.remove('active');
            }
        });
    } else {
        eventsContainer.classList.remove('filter-active');
        dropdowns.forEach(dropdown => {
            dropdown.querySelector('.dropdown-selected').classList.remove('active');
        });
    }

    // Анимация исчезновения перед применением фильтра
    const filterPromises = [];

    eventItems.forEach(item => {
        const day = item.getAttribute('data-day');
        const time = item.getAttribute('data-time');
        const place = item.getAttribute('data-place');
        const status = item.getAttribute('data-status');
        
        // Проверяем соответствие фильтрам
        const matchesDay = selectedFilters.day.length === 0 || selectedFilters.day.includes(day);
        
        // Проверка на соответствие категории времени
        let matchesTime = false;
        if (selectedFilters.time.length === 0) {
            matchesTime = true;
        } else {
            // Получаем час начала мероприятия
            const timeMatch = time ? time.match(/(\d+):/) : null;
            const startHour = timeMatch ? parseInt(timeMatch[1], 10) : null;
            
            if (startHour !== null) {
                // Проверяем каждую выбранную категорию времени
                matchesTime = selectedFilters.time.some(category => {
                    if (category === 'Утро') {
                        return startHour < 12;
                    } else if (category === 'День') {
                        return startHour >= 12 && startHour < 18;
                    } else if (category === 'Вечер') {
                        return startHour >= 18;
                    }
                    return false;
                });
            }
        }
        
        const matchesPlace = selectedFilters.place.length === 0 || 
            selectedFilters.place.some(filterPlace => {
                return place && place.toLowerCase().includes(filterPlace.toLowerCase());
            });
        const matchesStatus = selectedFilters.status.length === 0 || selectedFilters.status.includes(status);

        // Добавляем обещание для анимации
        const promise = new Promise(resolve => {
            if (matchesDay && matchesTime && matchesPlace && matchesStatus) {
                // Элемент соответствует фильтрам
                if (item.style.display === 'none') {
                    // Сперва удаляем все анимационные классы для "чистого" старта
                    item.classList.remove('fade-out');
                    
                    // Если элемент был скрыт, показываем его с анимацией
                    item.style.display = '';
                    
                    // Принудительный reflow для гарантии применения изменений
                    forceReflow(item);
                    
                    item.classList.add('fade-in');
                    
                    // Добавляем небольшую задержку для создания эффекта каскада
                    setTimeout(() => {
                        item.classList.add('visible');
                        resolve();
                    }, Math.random() * 150);
                } else {
                    // Если уже отображается, просто делаем его видимым
                    item.classList.remove('fade-out');
                    item.classList.add('visible');
                    resolve();
                }
            } else {
                // Элемент не соответствует фильтрам, подготавливаем и скрываем с анимацией

                // Сначала сбрасываем стили элемента в исходное состояние
                // Удаляем все классы анимации, чтобы начать "с чистого листа"
                item.classList.remove('visible', 'fade-in');

                // Принудительный reflow для применения изменений стилей
                forceReflow(item);

                // Затем добавляем класс fade-out для плавного скрытия
                item.classList.add('fade-out');

                // Увеличиваем время анимации для более плавного исчезновения
                setTimeout(() => {
                    item.style.display = 'none';
                    resolve();
                }, 350); // Уменьшено с 450мс до 350мс для более быстрой анимации
            }
        });

        filterPromises.push(promise);
    });

    // Проверка на отсутствие результатов после завершения всех анимаций
    Promise.all(filterPromises).then(() => {
        const visibleCount = Array.from(eventItems).filter(item => item.style.display !== 'none').length;

        if (visibleCount === 0) {
            // Показываем сообщение об отсутствии результатов без задержки
            noResultsElement.style.display = 'block';
            noResultsElement.style.opacity = 0;
            // Небольшая задержка только для плавного появления
            setTimeout(() => {
                noResultsElement.style.opacity = 1;
            }, 10);
        } else {
            noResultsElement.style.display = 'none';
        }

        console.log(`Отображается мероприятий: ${visibleCount} из ${eventItems.length}`);
    });
}

// Функция для форматирования выбранных значений
function formatSelectedValues(values, maxItems = 2) {
    if (values.length === 0) {
        return 'Все';
    } else if (values.length <= maxItems) {
        return values.join(', ');
    } else {
        return values.slice(0, maxItems).join(', ') + ` и ещё ${values.length - maxItems}`;
    }
}

// Для каждого выпадающего списка настраиваем свои обработчики
dropdowns.forEach(dropdown => {
    const dropdownSelected = dropdown.querySelector('.dropdown-selected');
    const dropdownList = dropdown.querySelector('.dropdown-list');
    const checkboxes = dropdownList.querySelectorAll('input[type="checkbox"]');
    const filterType = dropdown.getAttribute('data-filter-type');

    // Обработчик нажатия на заголовок выпадающего списка
    dropdownSelected.addEventListener('click', () => {
        // Визуальная обратная связь при нажатии
        dropdownSelected.style.transform = 'scale(0.98)';
        setTimeout(() => {
            dropdownSelected.style.transform = '';
        }, 150);

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
            // Визуальный отклик при изменении
            checkbox.parentElement.style.transform = 'translateX(5px)';
            setTimeout(() => {
                checkbox.parentElement.style.transform = '';
            }, 200);

            selectedFilters[filterType] = Array.from(checkboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);

            console.log(`Изменение фильтра ${filterType}:`, selectedFilters[filterType]);

            // Отображение выбранных значений в компактном формате
            const spanElement = dropdownSelected.querySelector('span');
            spanElement.textContent = formatSelectedValues(selectedFilters[filterType]);

            // Анимация изменения текста
            spanElement.style.transform = 'translateY(-5px)';
            spanElement.style.opacity = '0.5';
            setTimeout(() => {
                spanElement.style.transform = '';
                spanElement.style.opacity = '';
            }, 200);

            // Добавляем title для отображения полного списка при наведении
            if (selectedFilters[filterType].length > 0) {
                spanElement.title = selectedFilters[filterType].join(', ');
            } else {
                spanElement.title = '';
            }

            // Применяем фильтры
            applyFilters();
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