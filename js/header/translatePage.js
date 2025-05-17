function translatePage(targetLang) {
    const elements = document.querySelectorAll('h1, h2, h3, h4, p, span, a, button');
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
}

window.translatePage = translatePage;