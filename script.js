const quantity = document.getElementById('quantity');
const decreaseBtn = document.getElementById('decreaseQty');
const increaseBtn = document.getElementById('increaseQty');

decreaseBtn.addEventListener('click', () => {
    const currentValue = parseInt(quantity.value);
    if (currentValue > 1) {
        quantity.value = currentValue - 1;
    }
});

increaseBtn.addEventListener('click', () => {
    const currentValue = parseInt(quantity.value);
    quantity.value = currentValue + 1;
});

// Product Gallery
const mainImage = document.getElementById('mainImage');
const thumbnails = document.querySelectorAll('.thumbnails img');

thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
        // Remove active class from all thumbnails
        thumbnails.forEach(t => t.classList.remove('active'));
        // Add active class to clicked thumbnail
        thumb.classList.add('active');
        // Update main image
        mainImage.src = thumb.src;
    });
});

// Gallery Navigation
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const thumbnailContainer = document.querySelector('.thumbnails');

prevBtn.addEventListener('click', () => {
    thumbnailContainer.scrollBy({
        left: -100,
        behavior: 'smooth'
    });
});

nextBtn.addEventListener('click', () => {
    thumbnailContainer.scrollBy({
        left: 100,
        behavior: 'smooth'
    });
});

// Add to Cart Toast
const addToCartBtn = document.querySelector('.add-to-cart-btn');
const toast = document.getElementById('toast');

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

addToCartBtn.addEventListener('click', () => {
    const qty = quantity.value;
    showToast(`${qty} item(s) added to your cart`);
});

// Heart Button Toggle
const heartBtn = document.querySelector('.heart-btn');
let isLiked = false;

heartBtn.addEventListener('click', () => {
    isLiked = !isLiked;
    heartBtn.textContent = isLiked ? '♥' : '♡';
});

// Add to Bag Buttons
const addToBagBtns = document.querySelectorAll('.add-bag-btn');

addToBagBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        showToast('Item added to your bag');
    });
});

// Toggle Section Visibility
function toggleSection(section) {
    const content = document.getElementById(`${section}-content`);
    const icon = document.getElementById(`${section}-icon`);
  
    if (content.style.display === 'block') {
      content.style.display = 'none';
      icon.textContent = '+';
    } else {
      content.style.display = 'block';
      icon.textContent = '-';
    }
  }
  
  function toggleDetails(section) {
    const content = document.getElementById(`${section}-content`);
    const icon = document.getElementById(`${section}-icon`);
  
    if (content.style.display === "block") {
      content.style.display = "none";
      icon.textContent = "+";
    } else {
      content.style.display = "block";
      icon.textContent = "-";
    }
  }
  
  function toggleReadMore() {
    const readMoreText = document.getElementById("read-more-text");
    const readMoreBtn = document.getElementById("read-more-btn");
  
    if (readMoreText.style.display === "none") {
      readMoreText.style.display = "inline";
      readMoreBtn.textContent = "Read Less";
    } else {
      readMoreText.style.display = "none";
      readMoreBtn.textContent = "Read More";
    }
  }
  

  // Handle pagination
const paginationButtons = document.querySelectorAll(".pagination-btn");

paginationButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    // Remove 'active' class from all buttons
    paginationButtons.forEach((btn) => btn.classList.remove("active"));

    // Add 'active' class to the clicked button
    event.target.classList.add("active");

    // Add logic here to load new reviews based on the page number
  });
});

document.addEventListener('DOMContentLoaded', function () {
    // Get the modal, open/close buttons, and form elements
    const modal = document.getElementById("reviewModal");
    const openModalBtn = document.getElementById("openReviewModalBtn");
    const closeModalBtn = document.getElementById("closeModal");
    const submitReviewBtn = document.getElementById("submitReview");
    const reviewForm = document.getElementById("reviewForm");
    const termsCheckbox = document.getElementById("termsCheckbox");
  
    // Open the modal when "Write a Review" button is clicked
    openModalBtn.addEventListener("click", function () {
        modal.style.display = "block";
    });
  
    // Close the modal when the close button (X) is clicked
    closeModalBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });
  
    // Close the modal if the user clicks outside the modal content
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
  
    // Initialize rating object
    let rating = {
        quality: 0,
        value: 0,
        price: 0,
    };
  
    // Handle star rating selection for each category
    const updateStars = (category, ratingValue) => {
        const stars = document.querySelectorAll(`#${category} .star-rating span`);
        stars.forEach((star, index) => {
            star.style.color = index < ratingValue ? "#f1c40f" : "#ddd"; // Update star color
        });
    };
  
    // Add event listeners for each rating category
    ['quality', 'value', 'price'].forEach(category => {
        const stars = document.querySelectorAll(`#${category} .star-rating span`);
        stars.forEach((star, index) => {
            star.addEventListener("click", function () {
                rating[category] = index + 1; // Rating starts from 1
                updateStars(category, index + 1);
            });
        });
    });
  
    // Enable/Disable Submit button based on form completion
    reviewForm.addEventListener("input", function () {
        const name = document.getElementById("reviewName").value;
        const email = document.getElementById("reviewEmail").value;
        const summary = document.getElementById("reviewSummary").value;
        const reviewText = document.getElementById("reviewText").value;
        const termsAgreed = termsCheckbox.checked;
  
        // Check if all required fields are filled
        if (name && email && summary && reviewText && termsAgreed && rating.quality && rating.value && rating.price) {
            submitReviewBtn.disabled = false; // Enable the submit button
        } else {
            submitReviewBtn.disabled = true; // Disable the submit button
        }
    });
  
    // Handle form submission
    reviewForm.addEventListener("submit", function (event) {
        event.preventDefault();
  
        // Collect the form data
        const formData = {
            name: document.getElementById("reviewName").value,
            email: document.getElementById("reviewEmail").value,
            summary: document.getElementById("reviewSummary").value,
            reviewText: document.getElementById("reviewText").value,
            quality: rating.quality,
            value: rating.value,
            price: rating.price,
        };
  
        // Log the form data
        console.log("Review submitted!", formData);
  
        // Close the modal after submission
        modal.style.display = "none";
  
        // Reset the form and ratings
        reviewForm.reset();
        rating = { quality: 0, value: 0, price: 0 }; // Reset ratings
        submitReviewBtn.disabled = true; // Disable the submit button after submission
    });
});

  