import {cottages} from '../cottagesStorage.js';

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function getReviewWordForm(count) {
    if (count % 100 >= 11 && count % 100 <= 14) {
        return 'отзывов';
    }

    const lastDigit = count % 10;

    if (lastDigit === 1) {
        return 'отзыв';
    } else if (lastDigit >= 2 && lastDigit <= 4) {
        return 'отзыва';
    } else {
        return 'отзывов';
    }
}

function calculateAverageRating(reviews) {
    if (!reviews || reviews.length === 0) return 0;

    const sum = reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
    const average = sum / reviews.length;

    // Round to 2 decimal places
    return Math.round(average * 100) / 100;
}

function fillCottageInfo() {
    const cottageId = getUrlParameter('id');
    if (!cottageId) return;

    const cottage = cottages.find(c => c.id === parseInt(cottageId));
    if (!cottage) return;

    // Fill cottage information
    const images = document.querySelectorAll('.cottage-right img');
    images.forEach((img, index) => {
        const photoIndex = index + 1;
        if (cottage.photosURL[photoIndex]) {
            img.src = cottage.photosURL[photoIndex];
        }
    })

    document.querySelector('.form-h2').textContent = cottage.name;
    document.querySelector('.price p').textContent = cottage.priceForParagraph + ' ₽/сут';
    document.querySelector('.cottage-desc').textContent = cottage.desc;
    document.querySelector('.booking').textContent = 'Забронировать';
    document.querySelector('.booking').addEventListener('click', () => {
        window.location = `booking.html?id=${cottage.id}`;
    })

    // Fill amounts
    const amounts = document.querySelectorAll('.amount-item span');
    if (amounts.length >= 3) {
        amounts[0].textContent = cottage.peopleAmount + ' чел.';
        amounts[1].textContent = cottage.bedAmount + ' спальных мест';
        amounts[2].textContent = cottage.bathAmount + ' санузел';
    }

    // Fill benefits
    if (cottage.benefits && cottage.benefits.length > 0) {
        const benefitsContainer = document.querySelector('.cottage-advantages');
        benefitsContainer.innerHTML = ''; // Clear existing benefits
        
        cottage.benefits.forEach(benefit => {
            const benefitItem = document.createElement('li');
            benefitItem.textContent = benefit;
            benefitsContainer.appendChild(benefitItem);
        });
    }

    // Fill reviews
    if (cottage.reviews && cottage.reviews.length > 0) {
        const reviewsContainer = document.querySelector('.reviews-scroll');
        reviewsContainer.innerHTML = ''; // Clear existing reviews

        // Calculate and display average rating
        const averageRating = calculateAverageRating(cottage.reviews);
        const ratingElement = document.querySelector('.reviews-amount p');
        if (ratingElement) {
            ratingElement.textContent = averageRating.toFixed(2);
        }

        cottage.reviews.forEach(review => {
            const reviewHTML = `
                <div class="review-item">
                    <div class="review-item-header">
                        <img src="${review.imgURL}" alt="user">
                        <div class="item-header-info">
                            <p class="review-name">${review.name}</p>
                            <p class="review-date">${review.date}</p>
                        </div>
                    </div>
                    <p class="review-text">${review.text}</p>
                </div>
            `;
            reviewsContainer.innerHTML += reviewHTML;
        });

        // Update reviews count with proper word form
        const reviewsCount = document.querySelector('.reviews-amount ul li');
        if (reviewsCount) {
            const count = cottage.reviews.length;
            reviewsCount.textContent = `${count} ${getReviewWordForm(count)}`;
        }
    }
}

document.addEventListener('DOMContentLoaded', fillCottageInfo);