function translatePage(targetLang) {
    // Handle Russian language selection specially
    if (targetLang === 'ru') {
        localStorage.removeItem('selectedLanguage');
        window.location.reload();
        return;
    }

    window.currentLanguage = targetLang;
    // Save the selected language to localStorage
    localStorage.setItem('selectedLanguage', targetLang);

    document.documentElement.lang = targetLang;

    // Select all elements including input placeholders
    const elements = document.querySelectorAll('h1, h2, h3, h4, p, span, button, li, nav a, text, select');
    const inputElements = document.querySelectorAll('input[placeholder]');

    // Function to translate text
    const translateText = (text, targetLang, callback) => {
        if (text.trim()) {
            fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`)
                .then(response => response.json())
                .then(data => {
                    const translation = data[0][0][0];
                    if (translation) {
                        callback(translation);
                    }
                })
                .catch(error => console.error('Translation error:', error));
        }
    };

    // Translate regular elements
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
                translateText(textNode.textContent, targetLang, (translation) => {
                    textNode.textContent = translation;
                });
            });
        } else {
            // For elements with only text content
            translateText(el.textContent, targetLang, (translation) => {
                el.textContent = translation;
            });
        }

        // Mark element as translated
        el.dataset.translated = 'true';
    });

    // Translate input placeholders
    inputElements.forEach(input => {
        if (input.dataset.placeholderTranslated === 'true') return;

        const placeholderText = input.getAttribute('placeholder');
        translateText(placeholderText, targetLang, (translation) => {
            input.setAttribute('placeholder', translation);
            input.dataset.placeholderTranslated = 'true';
        });
    });

    // Переводим тексты цен в фильтре, если функция существует
    if (typeof window.translatePriceLabels === 'function') {
        window.translatePriceLabels();
    }
}

// Function to initialize the page with saved language
function initializeLanguage() {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
        translatePage(savedLanguage);
    }
}

// Make functions available globally
window.translatePage = translatePage;
window.initializeLanguage = initializeLanguage;

// Initialize language when the page loads
document.addEventListener('DOMContentLoaded', initializeLanguage);