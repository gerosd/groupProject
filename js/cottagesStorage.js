export const cottages = [
    {
        id: 1,
        type: "Стандарт",
        name: "Одноместный коттедж \"Стандарт\"",
        desc: "Уютный одноместный коттедж с посещением бани и трёхразовым питанием (завтрак, обед, ужин). Отличное место для отдыха и уединения!",
        priceForParagraph: "4.000",
        price: 4000,
        peopleAmount: 1,
        bedAmount: 1,
        bathAmount: 1,
        benefits: ["WiFi", "Телевизор", "Кондиционер", "Трёхразовое питание", "Баня"],
        reviews: [
            {
                name: "Анна",
                date: "Май 2025",
                imgURL: "images/reviews/female1.jpg",
                text: "Мне очень понравилось это место. Я отлично провела время и хорошо отдохнула. Спасибо организаторам!",
                rating: 5
            },

            {
                name: "Алексей",
                date: "Апрель 2025",
                imgURL: "images/reviews/male1.jpg",
                text: "Тихий, чистый домик. Баня – огонь! Еда простая, но вкусная. Вернусь снова!",
                rating: 5
            },

            {
                name: "Марина",
                date: "Февраль 2025",
                imgURL: "images/reviews/female2.jpg",
                text: "Идеально для уединения. Персонал доброжелательный, завтраки сытные. Рекомендую!",
                rating: 5
            },

            {
                name: "John",
                date: "Январь 2025",
                imgURL: "images/reviews/male2.jpg",
                text: "Cozy place, great for digital detox. The banya was a highlight!",
                rating: 5
            }

        ],
        photosURL: {
            1: "images/cottages/standard/1mesto.jpg",
            2: "images/cottages/standard/1mesto2.jpg",
            3: "images/cottages/standard/1mesto3.jpg",
            4: "images/cottages/standard/1mesto4.jpg",
        }
    },

    {
        id: 2,
        type: "Стандарт",
        name: "Двухместный коттедж \"Стандарт\"",
        desc: "Комфортный двухместный коттедж с террасой и мангальной зоной. Включены завтрак и ужин. Идеально для романтического отдыха!",
        priceForParagraph: "7.000",
        price: 7000,
        peopleAmount: 2,
        bedAmount: 2,
        bathAmount: 1,
        benefits: ["WiFi", "Телевизор", "Кондиционер", "Завтрак и ужин", "Терраса", "Мангальная зона"],
        reviews: [
            {
                name: "Ольга",
                date: "Март 2025",
                imgURL: "images/reviews/female3.jpg",
                text: "Не хватало микроволновки. Место приятное и тихое.",
                rating: 4
            },

            {
                name: "Elena",
                date: "Март 2025",
                imgURL: "images/reviews/female4.jpg",
                text: "¡Muy acogedor! La terraza es perfecta para cenas románticas. Volveremos.",
                rating: 5
            },

            {
                name: "Li Wei",
                date: "Февраль 2025",
                imgURL: "images/reviews/male3.jpg",
                text: "安静舒适的小屋，桑拿很棒！食物简单但美味。",
                rating: 4
            }

        ],
        photosURL: {
            1: "images/cottages/standard/2mesto.png",
            2: "images/cottages/standard/2mesto2.jpg",
            3: "images/cottages/standard/2mesto3.jpg",
            4: "images/cottages/standard/2mesto4.jpg",
        }
    },

    {
        id: 3,
        type: "Стандарт",
        name: "Коттедж для 5 человек \"Стандарт\"",
        desc: "Просторный коттедж для компании до 5 человек с общей гостиной и кухней. Бесплатный Wi-Fi и парковка. Отличный вариант для семьи или друзей.",
        priceForParagraph: "10.000",
        price: 10000,
        peopleAmount: 5,
        bedAmount: 3,
        bathAmount: 1,
        benefits: ["WiFi", "Телевизор", "Кондиционер", "Бесплатная парковка", "Общая гостиная", "Оборудованная кухня"],
        reviews: [
            {
                name: "Sophie",
                date: "Май 2025",
                imgURL: "images/reviews/female5.jpg",
                text: "Gemütliches Häuschen, toller Grillplatz. Das Frühstück war lecker!",
                rating: 5
            },

            {
                name: "Tom",
                date: "Апрель 2025",
                imgURL: "images/reviews/male4.jpg",
                text: "Great value for money. Loved the barbecue area!",
                rating: 5
            },

            {
                name: "Мария",
                date: "Март 2025",
                imgURL: "images/reviews/female6.jpg",
                text: "Просторно, чисто, есть всё для семьи. Дети в восторге от природы вокруг!",
                rating: 5
            },

            {
                name: "Carlos",
                date: "Март 2025",
                imgURL: "images/reviews/male5.jpg",
                text: "Ideal para amigos. Buena cocina, wifi estable. ¡Repetiremos!",
                rating: 5
            }
        ],
        photosURL: {
            1: "images/cottages/standard/5mesto.jpeg",
            2: "images/cottages/standard/5mesto2.jpg",
            3: "images/cottages/standard/5mesto3.jpg",
            4: "images/cottages/standard/5mesto4.jpg",
        }
    },

    {
        id: 4,
        type: 'Стандарт',
        name: 'Двухэтажный коттедж до 10 человек "Стандарт"',
        desc: "Большой коттедж на 10 гостей с сауной и зоной барбекю. Включён завтрак и обед. Отличное место для праздников и корпоративов.",
        priceForParagraph: "15.000",
        price: 15000,
        peopleAmount: 10,
        bedAmount: 8,
        bathAmount: 3,
        benefits: ["WiFi", "Телевизор", "Кондиционер", "Завтрак и обед", "Сауна", "Зона барбекю", "Фен", "Проживание с животными разрешено"],
        reviews: [
            {
                name: "艺兴",
                date: "Май 2025",
                imgURL: "images/reviews/male6.jpg",
                text: "总的来说，一切都很好，但我心情不好，所以4",
                rating: 4
            },

            {
                name: "Zdzisław",
                date: "Март 2025",
                imgURL: "images/reviews/male7.jpg",
                text: "Dobra lokalizacja, ale brakuje tłumacza na język polski.",
                rating: 4
            },

            {
                name: "Олег",
                date: "Январь 2025",
                imgURL: "images/reviews/male8.jpg",
                text: "Отметили день рождения – всё супер! Сауна, мангал, простор. Персонал помог с организацией.",
                rating: 5
            },

            {
                name: "Игорь",
                date: "Декабрь 2024",
                imgURL: "images/reviews/male9.jpg",
                text: "Отмечали новый год, вышло очень бюджетно для нашей компании. Вернусь.",
                rating: 5
            }

        ],
        photosURL: {
            1: "images/cottages/standard/10mesto.png",
            2: "images/cottages/standard/10mesto2.jpg",
            3: "images/cottages/standard/10mesto3.jpg",
            4: "images/cottages/standard/10mesto4.jpg",
        }
    },

    {
        id: 5,
        type: "Элитный",
        name: "Элитный коттедж для одного",
        desc: "Одноместный элитный коттедж с панорамными окнами, джакузи и персональным обслуживанием. Питание — ресторанное меню на выбор.",
        priceForParagraph: "8.000",
        price: 8000,
        peopleAmount: 1,
        bedAmount: 1,
        bathAmount: 1,
        benefits: ["WiFi", "Smart TV", "Кондиционер", "Ресторанное меню", "Джакузи", "Панорамные окна", "Персональное обслуживание", "Фен", "Проживание с животными разрешено"],
        reviews: [
            {
                name: "Ольга",
                date: "Апрель 2025",
                imgURL: "images/reviews/female7.jpg",
                text: "Роскошный отдых! Джакузи с видом на лес – сказка. Обслуживание на высоте.",
                rating: 5
            },

            {
                name: "Klaus",
                date: "Апрель 2025",
                imgURL: "images/reviews/male10.jpg",
                text: "Exklusiv und stilvoll. Der Whirlpool mit Waldblick ist traumhaft!",
                rating: 5
            },

            {
                name: "Isabelle",
                date: "Февраль 2025",
                imgURL: "images/reviews/female8.jpg",
                text: "Un havre de paix. Le service est impeccable!",
                rating: 5
            },
        ],
        photosURL: {
            1: "images/cottages/elit/1mesto.jpg",
            2: "images/cottages/elit/1mesto2.jpg",
            3: "images/cottages/elit/1mesto3.jpg",
            4: "images/cottages/elit/1mesto4.jpg",
        },
    },

    {
        id: 6,
        type: "Элитный",
        name: "Элитный коттедж для двоих",
        desc: "Двухместный коттедж премиум-класса с камином, крытым бассейном и СПА-процедурами. Полный пансион и консьерж-сервис.",
        priceForParagraph: "10.000",
        price: 10000,
        peopleAmount: 2,
        bedAmount: 1,
        bathAmount: 1,
        benefits: ["WiFi", "Smart TV", "Кондиционер", "Полный пансион", "Крытый бассейн", "Камин", "СПА-процедуры", "Консьерж-сервис", "Фен", "Проживание с животными разрешено"],
        reviews: [
            {
                name: "Андрей",
                date: "Март 2025",
                imgURL: "images/reviews/male11.jpg",
                text: "Романтика на высшем уровне! Камин, бассейн, изысканные ужины. Спасибо!",
                rating: 5
            },

            {
                name: "Евгений",
                date: "Март 2025",
                imgURL: "images/reviews/male12.jpg",
                text: "Лучше места на Алтае вы не найдете, 100%.",
                rating: 5
            },
        ],
        photosURL: {
            1: "images/cottages/elit/2mesto.jpeg",
            2: "images/cottages/elit/2mesto2.jpg",
            3: "images/cottages/elit/2mesto3.jpg",
            4: "images/cottages/elit/2mesto4.jpg",
        }
    },

    {
        id: 7,
        type: "Элитный",
        name: "Элитный коттедж до 5 человек",
        desc: "Роскошный коттедж для 5 гостей с домашним кинотеатром, сауной и видом на озеро. Индивидуальный шеф-повар по запросу.",
        priceForParagraph: "15.000",
        price: 15000,
        peopleAmount: 5,
        bedAmount: 4,
        bathAmount: 2,
        benefits: ["WiFi", "Домашний кинотеатр", "Кондиционер", "Сауна", "Вид на озеро", "Индивидуальный шеф-повар", "Мини-бар", "Фен", "Проживание с животными разрешено"],
        reviews: [
            {
                name: "Александр",
                date: "Апрель 2025",
                imgURL: "images/reviews/male13.jpg",
                text: "Отдыхали компанией, все было прекрасно. Леха разбил головой лампу))",
                rating: 5
            },

            {
                name: "Алексей",
                date: "Апрель 2025",
                imgURL: "images/reviews/male14.jpg",
                text: "Не очень крепкие лампы.",
                rating: 4
            }
        ],
        photosURL: {
            1: "images/cottages/elit/5mesto.png",
            2: "images/cottages/elit/5mesto2.jpg",
            3: "images/cottages/elit/5mesto3.jpg",
            4: "images/cottages/elit/5mesto4.jpg",
        }
    },

    {
        id: 8,
        type: "Элитный",
        name: "Элитный двухэтажный коттедж до 10 человек",
        desc: "Коттедж на 10 человек с частной территорией, бассейном, бильярдом и организацией экскурсий. Все включено (ALL INCLUSIVE).",
        priceForParagraph: "20.000",
        price: 20000,
        peopleAmount: 10,
        bedAmount: 7,
        bathAmount: 2,
        benefits: ["WiFi", "Smart TV", "Кондиционер", "Все включено", "Частная территория", "Бассейн", "Бильярд", "Организация экскурсий", "Фен", "Проживание с животными разрешено"],
        reviews: [
            {
                name: "Julia",
                date: "Март 2025",
                imgURL: "images/reviews/female9.jpg",
                text: "Melhor experiência de hospedagem! Piscina, churrasco, serviço impecável.",
                rating: 5
            }
        ],
        photosURL: {
            1: "images/cottages/elit/10mesto.png",
            2: "images/cottages/elit/10mesto2.jpg",
            3: "images/cottages/elit/10mesto3.jpg",
            4: "images/cottages/elit/10mesto4.jpg",
        }
    },

    {
        id: 9,
        type: "VIP",
        name: "VIP коттедж для одного",
        desc: "Эксклюзивный одноместный коттедж с изысканным меню от мишленовского шефа. Для тех, кто предпочитает люкс.",
        priceForParagraph: "15.000",
        price: 15000,
        peopleAmount: 1,
        bedAmount: 1,
        bathAmount: 1,
        benefits: ["Высокоскоростной WiFi", "OLED TV", "Умный дом", "Меню от мишленовского шефа", "Хаммам", "Персональный батлер", "Премиальная косметика", "Частный трансфер", "Фен", "Проживание с животными разрешено"],
        reviews: [
            {
                name: "Артём",
                date: "Апрель 2025",
                imgURL: "images/reviews/male15.jpg",
                text: "Это не отдых – это королевский прием! Батлер, хаммам, изысканная кухня. 10/10.",
                rating: 5
            },

            {
                name: "Giovanni",
                date: "Март 2025",
                imgURL: "images/reviews/male16.jpg",
                text: "Esclusivo e raffinato. Il servizio è impeccabile, il hammam una delizia!",
                rating: 5
            }
        ],
        photosURL: {
            1: "images/cottages/vip/1mesto.png",
            2: "images/cottages/vip/1mesto2.jpg",
            3: "images/cottages/vip/1mesto3.jpg",
            4: "images/cottages/vip/1mesto4.jpg",
        }
    },

    {
        id: 10,
        type: "VIP",
        name: "VIP коттедж для двоих",
        desc: "Двухместный VIP-коттедж с приватным пляжем, вертолётной площадкой и эксклюзивными экскурсиями. Индивидуальный гид.",
        priceForParagraph: "20.000",
        price: 20000,
        peopleAmount: 2,
        bedAmount: 1,
        bathAmount: 1,
        benefits: ["Высокоскоростной WiFi", "OLED TV", "Умный дом", "Приватный пляж", "Вертолётная площадка", "Эксклюзивные экскурсии", "Индивидуальный гид", "СПА-зона", "Фен", "Проживание с животными разрешено"],
        reviews: [
            {
                name: "Алина",
                date: "Май 2025",
                imgURL: "images/reviews/female10.jpg",
                text: "Так, как здесь, я не отдыхала нигде.",
                rating: 4
            },

            {
                name: "Эвелина",
                date: "Март 2025",
                imgURL: "images/reviews/female11.jpg",
                text: "Хотелось бы парковку подлиннее, мой Ford F-150 еле влез!",
                rating: 5
            }
        ],
        photosURL: {
            1: "images/cottages/vip/2mesto.jpg",
            2: "images/cottages/vip/2mesto2.jpg",
            3: "images/cottages/vip/2mesto3.jpg",
            4: "images/cottages/vip/2mesto4.jpg",
        }
    },

    {
        id: 11,
        type: "VIP",
        name: "VIP коттедж до 5 человек",
        desc: "Люксовый коттедж для 5 персон с вип-обслуживанием, винотекой, массажным кабинетом и круглосуточным консьержем.",
        priceForParagraph: "30.000",
        price: 30000,
        peopleAmount: 5,
        bedAmount: 4,
        bathAmount: 2,
        benefits: ["Высокоскоростной WiFi", "Домашний кинотеатр", "Умный дом", "ВИП-обслуживание", "Винотека", "Массажный кабинет", "Круглосуточный консьерж", "Персональный шеф-повар", "Фен", "Проживание с животными разрешено"],
        reviews: [
            {
                name: "Виктор",
                date: "Апрель 2025",
                imgURL: "images/reviews/male17.jpg",
                text: "Провели переговоры в шикарной обстановке. Винотека, массаж – идеально для делового отдыха.",
                rating: 5
            }
        ],
        photosURL: {
            1: "images/cottages/vip/5mesto.jpeg",
            2: "images/cottages/vip/5mesto2.jpg",
            3: "images/cottages/vip/5mesto3.jpg",
            4: "images/cottages/vip/5mesto4.jpg",
        }
    },

    {
        id: 12,
        type: "VIP",
        name: "VIP двухэтажный коттедж до 10 человек",
        desc: "Элитный особняк на 10 гостей с кинотеатром, боулингом и фитнес-залом. Организация мероприятий любого уровня.",
        priceForParagraph: "40.000",
        price: 40000,
        peopleAmount: 10,
        bedAmount: 8,
        bathAmount: 4,
        benefits: ["Высокоскоростной WiFi", "Кинотеатр", "Умный дом", "Боулинг", "Фитнес-зал", "Организация мероприятий", "Персональный шеф-повар", "Бассейн", "Фен", "Проживание с животными разрешено"],
        reviews: [
            {
                name: "Никита",
                date: "Апрель 2025",
                imgURL: "images/reviews/male18.jpg",
                text: "Устроили тимбилдинг – все в восторге! После такого отдыха наши сотрудники перевыполнили весь план. Кинотеатр, шеф-повар. Супер!",
                rating: 5
            },

            {
                name: "Richard",
                date: "Февраль 2025",
                imgURL: "images/reviews/male19.jpg",
                text: "Unreal experience! Bowling alley, cinema, personal chef – like a billionaire's mansion!",
                rating: 5
            }
        ],
        photosURL: {
            1: "images/cottages/vip/10mesto.png",
            2: "images/cottages/vip/10mesto2.jpg",
            3: "images/cottages/vip/10mesto3.jpg",
            4: "images/cottages/vip/10mesto4.jpg",
        }
    }
];