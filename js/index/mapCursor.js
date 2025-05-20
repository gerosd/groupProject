import { services } from '../../js/mapStorage.js';

(function() {
    const cursorCircle = document.createElement('div');
    cursorCircle.className = 'cursor-circle';
    cursorCircle.style.display = 'none';
    document.body.appendChild(cursorCircle);

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

    const interactiveSelectors = [
        'path',
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
        '#tennisCourt'
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

    function onMouseMove(e) {
        cursorCircle.style.left = e.clientX + 'px';
        cursorCircle.style.top = e.clientY + 'px';
    }

    function onPointerOver(e) {
        if (e.target.closest(selector)) {
            cursorCircle.style.display = 'block';
        }
    }

    function onPointerOut(e) {
        if (!e.relatedTarget || !e.relatedTarget.closest(selector)) {
            cursorCircle.style.display = 'none';
        }
    }

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
        } else {
            link.style.display = 'none';
        }

        sideMenu.classList.add('active');
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

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('pointerover', onPointerOver);
    document.addEventListener('pointerout', onPointerOut);
})();