import { cottages } from '../cottagesStorage.js';

const dateStart = document.getElementById('date-start');
const dateEnd = document.getElementById('date-end');
const totalPriceElement = document.getElementById('totalPrice');
const prePay = document.getElementById('pre-pay');
const amountInput = document.getElementById('amount');
const cottageSelect = document.getElementById('cottage-select');

function getUrlParameter(name) {
    name = name.replace(/\[/, '\\[').replace(/]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Get cottageId from URL if available, used for pre-selecting the cottage
const cottageIdFromUrl = getUrlParameter('id');

function setupCottageSelect() {
    if (cottageIdFromUrl) {
        const parsedId = parseInt(cottageIdFromUrl);
        // Pre-select the cottage in the dropdown
        cottageSelect.value = parsedId;
    }

    if (typeof calculateTotalPrice === 'function') {
        calculateTotalPrice();
    }
}

document.addEventListener('DOMContentLoaded', setupCottageSelect);

function calculateTotalPrice() {
    // Get the selected cottage
    const selectedCottageId = cottageSelect.value ? parseInt(cottageSelect.value) : null;
    const cottage = cottages.find(c => c.id === selectedCottageId);
    
    if (!cottage) {
        totalPriceElement.textContent = '0₽';
        prePay.textContent = '0₽';
        return;
    }

    const startDate = new Date(dateStart.value);
    const endDate = new Date(dateEnd.value);
    const peopleAmount = parseInt(amountInput.value) || 1;
    
    // If no dates selected, show price per night
    if (!dateStart.value || !dateEnd.value) {
        const pricePerNight = cottage.price * peopleAmount;
        const prePayValue = pricePerNight * 0.1;
        totalPriceElement.textContent = `${pricePerNight}₽ за ночь`;
        prePay.textContent = `${prePayValue}₽`;
        return;
    }

    if (startDate >= endDate) {
        alert('Дата выезда должна быть позже даты заезда');
        dateEnd.value = '';
        const pricePerNight = cottage.price * peopleAmount;
        const prePayValue = pricePerNight * 0.1;
        totalPriceElement.textContent = `${pricePerNight}₽ за ночь`;
        prePay.textContent = `${prePayValue}₽`;
        return;
    }

    // Calculate number of nights
    const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    
    // Calculate total price with people amount adjustment
    let totalPrice = nights * cottage.price * peopleAmount;
    let prePayValue = nights * cottage.price * peopleAmount * 0.1;
    
    // Update total price display
    totalPriceElement.textContent = `${totalPrice}₽ (${nights} ${getNightsText(nights)})`;
    prePay.textContent = `${prePayValue}₽`;
}

function getNightsText(nights) {
    if (nights % 10 === 1 && nights % 100 !== 11) {
        return 'ночь';
    } else if ([2, 3, 4].includes(nights % 10) && ![12, 13, 14].includes(nights % 100)) {
        return 'ночи';
    } else {
        return 'ночей';
    }
}

dateStart.addEventListener('change', calculateTotalPrice);
dateEnd.addEventListener('change', calculateTotalPrice);
cottageSelect.addEventListener('change', calculateTotalPrice);

const today = new Date().toISOString().split('T')[0];
dateStart.min = today;
dateEnd.min = today;

dateStart.addEventListener('change', () => {
    dateEnd.min = dateStart.value;
});

amountInput.addEventListener('input', calculateTotalPrice);

window.calculateTotalPrice = calculateTotalPrice;