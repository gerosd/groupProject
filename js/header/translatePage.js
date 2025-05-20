function translatePage(targetLang) {
    // Устанавливаем глобальную переменную текущего языка
    window.currentLanguage = targetLang;

    // Устанавливаем атрибут lang для HTML тега
    document.documentElement.lang = targetLang;

    const elements = document.querySelectorAll('h1, h2, h3, h4, p, span, button, li, input::placeholder');

    elements.forEach(el => {
        // Skip elements that are already translated
        if (el.dataset.translated === 'true') return;

        // For elements that might contain HTML (like li with a tags)
        if (el.innerHTML !== el.textContent) {
            const textNodes = [];
            const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
            let node;
            while (node = walk.nextNode()) {
                if (node.textContent.trim()) {
                    textNodes.push(node);
                }
            }

            textNodes.forEach(textNode => {
                const text = textNode.textContent;
                if (text.trim()) {
                    fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`)
                        .then(response => response.json())
                        .then(data => {
                            const translation = data[0][0][0];
                            if (translation) {
                                textNode.textContent = translation;
                            }
                        })
                        .catch(error => console.error('Translation error:', error));
                }
            });
        } else {
            // For elements with only text content
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
        }

        // Mark element as translated
        el.dataset.translated = 'true';
    });

    // Переводим тексты цен в фильтре, если функция существует
    if (typeof window.translatePriceLabels === 'function') {
        window.translatePriceLabels();
    }
}

window.translatePage = translatePage;