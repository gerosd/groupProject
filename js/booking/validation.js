import { cottages } from '../cottagesStorage.js';
import { saveBooking } from './saveBooking.js';

const usernameInput = document.getElementById('username');
const phoneInput = document.getElementById('phone');
const amountInput = document.getElementById('amount');
const dateStartInput = document.getElementById('date-start');
const dateEndInput = document.getElementById('date-end');
const confirmButton = document.querySelector('.confirm-button');

// Get cottage info
const cottageId = new URLSearchParams(window.location.search).get('id');
const cottage = cottages.find(c => c.id === parseInt(cottageId));

// Validation states
let validationStates = {
    username: false,
    phone: false,
    amount: false,
    dates: false
};

// Error message styles
const errorStyle = 'border: 2px solid #ff4444; background: rgba(255, 0, 0, 0.1)';
const successStyle = 'border: none; background: var(--input-bg)';

// Validation functions
function validateUsername(value) {
    const nameRegex = /^[A-Za-zА-Яа-яЁё\s]{2,25}$/;
    const isValid = nameRegex.test(value.trim());
    usernameInput.style = isValid ? successStyle : errorStyle;
    validationStates.username = isValid;
    return isValid;
}

function validatePhone(value) {
    // Supports various international formats
    const phoneRegex = /^(\+|00)?[1-9][0-9\s-()]{8,20}$/;
    const isValid = phoneRegex.test(value.trim());
    phoneInput.style = isValid ? successStyle : errorStyle;
    validationStates.phone = isValid;
    return isValid;
}

function validateAmount(value) {
    const amount = parseInt(value);
    const isValid = amount > 0 && amount <= 50;
    const isWithinCottageLimit = cottage ? amount <= cottage.peopleAmount : true;
    
    amountInput.style = isValid ? successStyle : errorStyle;
    validationStates.amount = isValid;
    
    if (isValid && !isWithinCottageLimit) {
        // Show warning but don't prevent submission
        amountInput.style = 'border: 2px solid #ffd700; background: rgba(255, 215, 0, 0.1)';
    }
    
    return isValid;
}

function validateDates() {
    const startDate = new Date(dateStartInput.value);
    const endDate = new Date(dateEndInput.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isStartValid = startDate >= today;
    const isEndValid = endDate > startDate;
    const isValid = isStartValid && isEndValid;

    dateStartInput.style = isStartValid ? successStyle : errorStyle;
    dateEndInput.style = isEndValid ? successStyle : errorStyle;
    validationStates.dates = isValid;
    
    return isValid;
}

function formatPhoneNumber(input) {
    // Удаляем всё, кроме цифр и плюса
    let formatted = input.replace(/[^\d+]/g, '');
    
    // Заменяем +8 на +7
    if (formatted.startsWith('+8')) {
        formatted = '+7' + formatted.substring(2);
    }
    
    // Обработка российских номеров, начинающихся с 8
    if (formatted.startsWith('8') && !formatted.startsWith('+')) {
        formatted = '+7' + formatted.substring(1);
    }
    
    // Добавляем + если его нет (кроме случаев когда номер пустой)
    if (!formatted.startsWith('+') && formatted.length > 0) {
        formatted = '+' + formatted;
    }

    // Определяем код страны
    let countryCode = '';
    if (formatted.startsWith('+7')) {
        countryCode = '+7';
    } else if (formatted.startsWith('+1')) {
        countryCode = '+1';
    } else if (formatted.startsWith('+34')) {
        countryCode = '+34';
    } else if (formatted.startsWith('+86')) {
        countryCode = '+86';
    } else {
        const countryCodeMatch = formatted.match(/^\+\d{1,3}/);
        countryCode = countryCodeMatch ? countryCodeMatch[0] : '';
    }
    const numberPart = formatted.slice(countryCode.length);

    // Форматирование в зависимости от кода страны
    switch (countryCode) {
        case '+7':
            if (formatted.length >= 12) {
                const digits = formatted.substring(2);
                return '+7 ' + digits.substring(0, 3) + ' ' + 
                             digits.substring(3, 6) + ' ' + 
                             digits.substring(6, 8) + ' ' + 
                             digits.substring(8, 10);
            }
            return formatted;
        
        case '+1': // США, Канада
            return formatted.replace(/(\+\d)(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4');
        
        case '+34': // Испания
            return formatted.replace(/(\+\d{2})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');
        
        case '+86': // Китай
            if (numberPart.length >= 11) {
                return formatted.replace(/(\+\d{2})(\d{2})(\d{4})(\d{4})/, '$1 $2 $3 $4');
            }
            return formatted.replace(/(\+\d{2})(\d{3})(\d{4})(\d{4})/, '$1 $2 $3 $4');
        
        default:
            if (numberPart.length >= 6) {
                return formatted.replace(/(\+\d{1,3})(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
            }
            return formatted;
    }
}

// Event listeners
usernameInput.addEventListener('input', (e) => {
    validateUsername(e.target.value);
});

phoneInput.addEventListener('input', (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    e.target.value = formatted;
    validatePhone(formatted);
});

amountInput.addEventListener('input', (e) => {
    validateAmount(e.target.value);
});

dateStartInput.addEventListener('change', validateDates);
dateEndInput.addEventListener('change', validateDates);

// Form submission
confirmButton.addEventListener('click', async () => {
    // Validate all fields
    const isUsernameValid = validateUsername(usernameInput.value);
    const isPhoneValid = validatePhone(phoneInput.value);
    const isAmountValid = validateAmount(amountInput.value);
    const areDatesValid = validateDates();

    if (!isUsernameValid || !isPhoneValid || !isAmountValid || !areDatesValid) {
        alert('Пожалуйста, проверьте правильность заполнения всех полей');
        return;
    }

    // Save booking details
    const booking = saveBooking();
    console.log('Booking saved:', booking);

    // Clear form
    usernameInput.value = '';
    phoneInput.value = '';
    amountInput.value = '';
    dateStartInput.value = '';
    dateEndInput.value = '';
    
    // Reset validation states
    Object.keys(validationStates).forEach(key => {
        validationStates[key] = false;
    });
    
    // Reset styles
    [usernameInput, phoneInput, amountInput, dateStartInput, dateEndInput].forEach(input => {
        input.style = successStyle;
    });
    
    // Recalculate price
    if (typeof calculateTotalPrice === 'function') {
        calculateTotalPrice();
    }
}); 