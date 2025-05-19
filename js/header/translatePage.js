function translatePage(targetLang) {
    // Устанавливаем глобальную переменную текущего языка
    window.currentLanguage = targetLang;
    
    // Устанавливаем атрибут lang для HTML тега
    document.documentElement.lang = targetLang;
    
    const elements = document.querySelectorAll('h1, h2, h3, h4, p, span, button, li');

    elements.forEach(el => {
        const text = el.textContent;
        if (text.trim()) {
            fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`)
                .then(response => response.json())
                .then(data => {
                    const translation = data[0][0][0];
                    if (translation) {
                        el.textContent = translation;
                    }
                })
                .catch(error => console.error('Translation error:', error));
        }
    });
    
    // Переводим тексты цен в фильтре, если функция существует
    if (typeof window.translatePriceLabels === 'function') {
        window.translatePriceLabels();
    }
}

window.translatePage = translatePage;