document.addEventListener('DOMContentLoaded', function() {
    // Получаем все элементы фильтра
    const filterItems = document.querySelectorAll('.filter-item');
    // Получаем все услуги
    const serviceItems = document.querySelectorAll('.services-item');
    
    // Определяем категории для каждой услуги
    const categories = {
        'sport': ['basket', 'mini', 'golf', 'billi', 'volley', 'tennis', 'foot'], // Спортивные игры
        'outdoor': ['fish', 'quad', 'horses'], // Активный отдых на природе
        'indoor': ['billi'] // Развлечения в помещении
    };
    
    // Текущий активный фильтр
    let activeFilter = null;
    
    // Добавляем обработчик клика для каждого элемента фильтра
    filterItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const category = index === 0 ? 'sport' : (index === 1 ? 'outdoor' : 'indoor');
            const checkBox = this.querySelector('.check');
            
            // Если фильтр уже активен, снимаем его
            if (activeFilter === category) {
                resetFilter();
                return;
            }
            
            // Сбрасываем активный фильтр, если такой есть
            if (activeFilter !== null) {
                filterItems.forEach(item => {
                    const itemCheck = item.querySelector('.check');
                    itemCheck.style.backgroundColor = 'white';
                    itemCheck.classList.remove('active');
                });
            }
            
            // Устанавливаем новый активный фильтр
            activeFilter = category;
            checkBox.style.backgroundColor = 'var(--primary)';
            checkBox.classList.add('active'); // Добавляем класс active для отображения галочки
            
            // Фильтруем услуги
            filterServices(category);
        });
    });
    
    // Функция фильтрации услуг
    function filterServices(category) {
        serviceItems.forEach(item => {
            // Получаем класс услуги (первый класс после services-item)
            const serviceClass = Array.from(item.classList).find(cls => cls !== 'services-item');
            
            // Проверяем, относится ли услуга к выбранной категории
            if (categories[category].includes(serviceClass)) {
                // Услуга подходит под фильтр
                item.style.opacity = '1';
                showServiceContent(item);
            } else {
                // Услуга не подходит под фильтр
                item.style.opacity = '0.5';
                hideServiceContent(item);
            }
        });
    }
    
    // Функция для скрытия содержимого неподходящих услуг
    function hideServiceContent(item) {
        const container = item.querySelector('.services-item-in-container');
        if (container) {
            container.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            const title = container.querySelector('.services-item-title');
            
            // Устанавливаем только заголовок приглушенным изначально
            if (title) title.style.opacity = '0.3';
            
            // Добавляем обработчики наведения, чтобы при наведении все элементы были полупрозрачными
            container.addEventListener('mouseenter', function() {
                const price = container.querySelector('.services-item-price');
                const priceDesc = container.querySelector('.services-item-price-description');
                const desc = container.querySelector('.services-item-desc');
                const line = container.querySelector('.services-item-line');
                
                if (price) price.style.opacity = '0.3';
                if (priceDesc) priceDesc.style.opacity = '0.3';
                if (desc) desc.style.opacity = '0.3';
                if (line) line.style.opacity = '0.3';
            });
            
            // При уходе мыши возвращаем стандартное поведение CSS
            container.addEventListener('mouseleave', function() {
                const price = container.querySelector('.services-item-price');
                const priceDesc = container.querySelector('.services-item-price-description');
                const desc = container.querySelector('.services-item-desc');
                const line = container.querySelector('.services-item-line');
                
                if (price) price.style.opacity = '';
                if (priceDesc) priceDesc.style.opacity = '';
                if (desc) desc.style.opacity = '';
                if (line) line.style.opacity = '';
            });
        }
    }
    
    // Функция для отображения содержимого подходящих услуг
    function showServiceContent(item) {
        const container = item.querySelector('.services-item-in-container');
        if (container) {
            // Удаляем инлайн стили, чтобы CSS работал корректно
            container.style.backgroundColor = '';
            
            const title = container.querySelector('.services-item-title');
            if (title) title.style.opacity = '';
        }
    }
    
    // Функция для сброса фильтрации
    function resetFilter() {
        activeFilter = null;
        
        // Сбрасываем стиль чекбоксов фильтров
        filterItems.forEach(item => {
            const checkBox = item.querySelector('.check');
            checkBox.style.backgroundColor = 'white';
            checkBox.classList.remove('active'); // Удаляем класс active для скрытия галочки
        });
        
        // Сбрасываем стили всех услуг
        serviceItems.forEach(item => {
            item.style.opacity = '1';
            
            // Полностью удаляем все инлайн стили с элементов
            const container = item.querySelector('.services-item-in-container');
            if (container) {
                container.style.backgroundColor = '';
                
                // Создаем клон элемента, чтобы удалить все обработчики событий
                const newContainer = container.cloneNode(true);
                container.parentNode.replaceChild(newContainer, container);
                
                // Удаляем инлайн стили со всех элементов внутри
                const title = newContainer.querySelector('.services-item-title');
                const desc = newContainer.querySelector('.services-item-desc');
                const price = newContainer.querySelector('.services-item-price');
                const priceDesc = newContainer.querySelector('.services-item-price-description');
                const line = newContainer.querySelector('.services-item-line');
                
                if (title) title.style.opacity = '';
                if (desc) desc.style.opacity = '';
                if (price) price.style.opacity = '';
                if (priceDesc) priceDesc.style.opacity = '';
                if (line) line.style.opacity = '';
            }
        });
    }
});
