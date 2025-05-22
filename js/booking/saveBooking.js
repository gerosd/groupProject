import { cottages } from '../cottagesStorage.js';

export async function saveBooking() {
    // Get form elements
    const usernameInput = document.getElementById('username');
    const phoneInput = document.getElementById('phone');
    const cottageSelect = document.getElementById('cottage-select');
    const amountInput = document.getElementById('amount');
    const dateStartInput = document.getElementById('date-start');
    const dateEndInput = document.getElementById('date-end');
    const totalPriceElement = document.getElementById('totalPrice');
    const prePayElement = document.getElementById('pre-pay');

    // Get the selected cottage
    const selectedCottageId = cottageSelect.value ? parseInt(cottageSelect.value) : null;
    const cottage = cottages.find(c => c.id === selectedCottageId);

    // Extract price from the total price element (removing currency symbol and other text)
    const priceText = totalPriceElement.textContent;
    const priceMatch = priceText.match(/(\d+(?:,\d+)?)₽/);
    const price = priceMatch ? parseInt(priceMatch[1].replace(',', '')) : 0;

    // Extract prepayment amount
    const prePayText = prePayElement.textContent;
    const prePayMatch = prePayText.match(/(\d+(?:,\d+)?)₽/);
    const prepayment = prePayMatch ? parseInt(prePayMatch[1].replace(',', '')) : 0;

    // Create booking object
    const booking = {
        id: Date.now(), // Use timestamp as unique ID
        date: new Date().toISOString(),
        name: usernameInput.value,
        phone: "'" + phoneInput.value,
        cottage: cottage ? cottage.name : null,
        date_start: dateStartInput.value,
        date_end: dateEndInput.value,
        people_amount: parseInt(amountInput.value) || 1,
        price: price,
        predoplata: prepayment,
        isComplete: false,
    };

    const scriptURL = 'https://script.google.com/macros/s/AKfycbyb79ES_RtrHSJD3UVlcuKDewBqsKciiv8bPFwwVbU9mGCrvHy-6gps_pwEymdA18it/exec';

    try {
        // When using no-cors mode, we can't read the response content
        await fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(booking)
        });
        
        // Since we can't access the response in no-cors mode,
        // we assume success if no error was thrown
        alert('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
        
    } catch (error) {
        console.log(error.message);
        alert('Ошибка при отправке');
    }

    return booking;
}
