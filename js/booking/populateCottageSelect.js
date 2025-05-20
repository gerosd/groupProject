import { cottages } from '../cottagesStorage.js';

// Select the cottage dropdown element
const cottageSelect = document.getElementById('cottage-select');

// Populate the dropdown with cottage options
function populateCottageSelect() {
    // Clear any existing options (except the default one)
    const defaultOption = cottageSelect.options[0];
    cottageSelect.innerHTML = '';
    cottageSelect.appendChild(defaultOption);

    // Add an option for each cottage
    cottages.forEach(cottage => {
        const option = document.createElement('option');
        option.value = cottage.id;
        option.textContent = `${cottage.name} - ${cottage.price}₽ за ночь`;
        option.dataset.price = cottage.price;
        option.dataset.peopleAmount = cottage.peopleAmount;
        cottageSelect.appendChild(option);
    });
}

// Initialize the dropdown
populateCottageSelect();

// Add event listener to recalculate prices when a cottage is selected
cottageSelect.addEventListener('change', () => {
    // Trigger the price calculation function if it exists
    if (typeof calculateTotalPrice === 'function') {
        calculateTotalPrice();
    }
});

// Export for use in other modules
export { populateCottageSelect }; 