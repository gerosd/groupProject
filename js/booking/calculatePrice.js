import { cottages } from '../cottagesStorage.js';

const dateStart = document.getElementById('date-start');
const dateEnd = document.getElementById('date-end');
const totalPriceElement = document.getElementById('totalPrice');
const prePay = document.getElementById('pre-pay');
const amountInput = document.getElementById('amount');

function getUrlParameter(name) {
    name = name.replace(/\[/, '\\[').replace(/]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

const cottageId = getUrlParameter('id');

function setupCottageTypeInput() {
    const typeField = document.querySelector('.type-field p');

    if (!cottageId) {
        console.error('No cottage ID found in URL parameters');
        return;
    }

    const parsedId = parseInt(cottageId);
    const cottage = cottages.find(c => c.id === parsedId);

    typeField.textContent = cottage.name;

    if (typeof calculateTotalPrice === 'function') {
        calculateTotalPrice();
    }
}

document.addEventListener('DOMContentLoaded', setupCottageTypeInput);

function calculateTotalPrice() {
    const cottage = cottages.find(c => c.id === parseInt(cottageId));
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

const today = new Date().toISOString().split('T')[0];
dateStart.min = today;
dateEnd.min = today;

dateStart.addEventListener('change', () => {
    dateEnd.min = dateStart.value;
});

amountInput.addEventListener('input', calculateTotalPrice);

window.calculateTotalPrice = calculateTotalPrice;