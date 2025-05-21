import { services } from '../mapStorage.js';

(function() {
    const interactiveSelectors = [
        '#svg1 path',
        '#basketball',
        '#concert',
        '#parking',
        '#football',
        '#stolovaya',
        '#volleyball',
        '#bannya',
        '#ribalka',
        '#motoRent',
        '#horseClub',
        '#tennisCourt',
        '#les'
    ];
    const selector = interactiveSelectors.join(', ');

    const idToServiceMap = {
        'basketball': 'Баскетбольная площадка',
        'concert': 'Концертная площадка',
        'parking': 'Парковка',
        'football': 'Футбольное поле',
        'stolovaya': 'Столовая',
        'volleyball': 'Волейбольная площадка',
        'bannya': 'Банный комплекс',
        'ribalka': 'Место для рыбалки',
        'motoRent': 'Аренда квадроциклов',
        'horseClub': 'Конный клуб',
        'tennisCourt': 'Теннисный корт',
        'golph': 'Поле для гольфа',
        'les': 'Лесной массив',
        'standard1m': 'Стандартный коттедж для одного',
        'standard2m': 'Стандартный коттедж для двух',
        'standart5m': 'Стандартный коттедж до пяти человек',
        'standard10m': 'Стандартный коттедж до десяти человек',
        'elyth1m': 'Элитный коттедж для одного',
        'elyth2m': 'Элитный коттедж для двух',
        'elyth5m': 'Элитный коттедж до пяти человек',
        'elyth10m': 'Элитный коттедж до десяти человек',
        'vip1m': 'VIP коттедж для одного',
        'vip2m': 'VIP коттедж для двух',
        'vip5m': 'VIP коттедж до пяти человек',
        'vip10m': 'VIP коттедж до десяти человек',
    };

    function createCirclesForElements() {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            const circle = document.createElement('div');
            circle.className = 'cursor-circle';
            document.body.appendChild(circle);
            
            function updatePosition() {
                const rect = element.getBoundingClientRect();
                circle.style.left = (rect.left + rect.width / 2) + 'px';
                circle.style.top = (rect.top + rect.height / 2) + 'px';
                circle.style.display = 'block';
            }
            
            updatePosition();
            window.addEventListener('scroll', updatePosition);
            window.addEventListener('resize', updatePosition);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createCirclesForElements);
    } else {
        createCirclesForElements();
    }

    const sideMenu = document.createElement('div');
    sideMenu.className = 'side-menu';
    sideMenu.innerHTML = `
        <button class="side-menu-close">&times;</button>
        <img class="side-menu-image" src="" alt="">
        <h2 class="side-menu-title"></h2>
        <p class="side-menu-description"></p>
        <a class="side-menu-link" href="" style="display: none;">Подробнее</a>
    `;
    document.body.appendChild(sideMenu);

    function showSideMenu(serviceName) {
        console.log('Showing side menu for:', serviceName);
        const service = services.find(s => s.name === serviceName);
        if (!service) {
            console.error('Service not found:', serviceName);
            return;
        }

        const image = sideMenu.querySelector('.side-menu-image');
        const title = sideMenu.querySelector('.side-menu-title');
        const description = sideMenu.querySelector('.side-menu-description');
        const link = sideMenu.querySelector('.side-menu-link');

        image.src = service.img;
        image.alt = service.name;
        title.textContent = service.name;
        description.textContent = service.desc;

        if (service.link && service.link !== 'none') {
            link.href = service.link;
            link.style.display = 'inline-block';
            link.textContent = 'Подробнее';
        } else {
            link.style.display = 'none';
        }

        // Check if we have a saved language in localStorage
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage) {
            // Translate title, description and link text
            translateElement(title, savedLanguage);
            translateElement(description, savedLanguage);
            if (link.style.display !== 'none') {
                translateElement(link, savedLanguage);
            }
        }

        sideMenu.classList.add('active');
    }

    // Helper function to translate an element's text content
    function translateElement(element, targetLang) {
        const text = element.textContent;
        if (text.trim()) {
            fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`)
                .then(response => response.json())
                .then(data => {
                    const translation = data[0][0][0];
                    if (translation) {
                        element.textContent = translation;
                    }
                })
                .catch(error => console.error('Translation error:', error));
        }
    }

    function closeSideMenu() {
        sideMenu.classList.remove('active');
    }

    document.addEventListener('click', (e) => {
        const target = e.target.closest(selector);
        if (target) {
            console.log('Clicked element:', target.id);
            const id = target.id;
            const serviceName = idToServiceMap[id];
            console.log('Service name:', serviceName);
            if (serviceName) {
                showSideMenu(serviceName);
            }
        }
    });

    const closeButton = sideMenu.querySelector('.side-menu-close');
    closeButton.addEventListener('click', closeSideMenu);

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.side-menu') && !e.target.closest(selector)) {
            closeSideMenu();
        }
    });
})();