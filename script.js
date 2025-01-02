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



document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnails img');
    let currentIndex = 0; 
   
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            
            thumbnails.forEach(t => t.classList.remove('active'));
            
            thumb.classList.add('active');
            
            mainImage.src = thumb.src;
            
            currentIndex = index;
        });
    });
    
    
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const thumbnailContainer = document.querySelector('.thumbnails');
    
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateMainImage();
            scrollToThumbnail();
        }
    });
    
   
    nextBtn.addEventListener('click', () => {
        if (currentIndex < thumbnails.length - 1) {
            currentIndex++;
            updateMainImage();
            scrollToThumbnail();
        }
    });
    
    
    function updateMainImage() {
        thumbnails.forEach(t => t.classList.remove('active'));
        thumbnails[currentIndex].classList.add('active');
        mainImage.src = thumbnails[currentIndex].src;
    }
    
   
    function scrollToThumbnail() {
        const selectedThumbnail = thumbnails[currentIndex];
        thumbnailContainer.scrollBy({
            left: selectedThumbnail.offsetLeft - thumbnailContainer.offsetLeft - thumbnailContainer.clientWidth / 2,
            behavior: 'smooth'
        });
    }    

});


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


const heartBtn = document.querySelector('.heart-btn');
let isLiked = false;

heartBtn.addEventListener('click', () => {
    isLiked = !isLiked;
    heartBtn.textContent = isLiked ? '♥' : '♡';
});


const addToBagBtns = document.querySelectorAll('.add-bag-btn');

addToBagBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        showToast('Item added to your bag');
    });
});


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
  


const paginationButtons = document.querySelectorAll(".pagination-btn");

paginationButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    
    paginationButtons.forEach((btn) => btn.classList.remove("active"));

    
    event.target.classList.add("active");

  });
});

document.addEventListener('DOMContentLoaded', function () {
   
    const modal = document.getElementById("reviewModal");
    const openModalBtn = document.getElementById("openReviewModalBtn");
    const closeModalBtn = document.getElementById("closeModal");
    const submitReviewBtn = document.getElementById("submitReview");
    const reviewForm = document.getElementById("reviewForm");
    const termsCheckbox = document.getElementById("termsCheckbox");
  
    openModalBtn.addEventListener("click", function () {
        modal.style.display = "block";
    });
  
    closeModalBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });
  
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    let rating = {
        quality: 0,
        value: 0,
        price: 0,
    };
  
    const updateStars = (category, ratingValue) => {
        const stars = document.querySelectorAll(`#${category} .star-rating span`);
        stars.forEach((star, index) => {
            star.style.color = index < ratingValue ? "#f1c40f" : "#ddd"; 
        });
    };
  

    ['quality', 'value', 'price'].forEach(category => {
        const stars = document.querySelectorAll(`#${category} .star-rating span`);
        stars.forEach((star, index) => {
            star.addEventListener("click", function () {
                rating[category] = index + 1; 
                updateStars(category, index + 1);
            });
        });
    });

    reviewForm.addEventListener("input", function () {
        const name = document.getElementById("reviewName").value;
        const email = document.getElementById("reviewEmail").value;
        const summary = document.getElementById("reviewSummary").value;
        const reviewText = document.getElementById("reviewText").value;
        const termsAgreed = termsCheckbox.checked;
  
        if (name && email && summary && reviewText && termsAgreed && rating.quality && rating.value && rating.price) {
            submitReviewBtn.disabled = false; 
        } else {
            submitReviewBtn.disabled = true; 
        }
    });

    reviewForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = {
            name: document.getElementById("reviewName").value,
            email: document.getElementById("reviewEmail").value,
            summary: document.getElementById("reviewSummary").value,
            reviewText: document.getElementById("reviewText").value,
            quality: rating.quality,
            value: rating.value,
            price: rating.price,
        };

        console.log("Review submitted!", formData);

        modal.style.display = "none";
  
        reviewForm.reset();
        rating = { quality: 0, value: 0, price: 0 }; 
        submitReviewBtn.disabled = true; 
    });
});

let currentIndex = 0;
const container = document.getElementById('productContainer');
const totalCards = document.querySelectorAll('.product-card').length;
const visibleCards = 3; 
const slideWidth = 100 / visibleCards; 

function slideProducts(direction) {
  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = totalCards - visibleCards;
  } else if (currentIndex > totalCards - visibleCards) {
    currentIndex = 0;
  }

  container.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
}


function autoSlide() {
  slideProducts(1);
}


let autoSlideInterval = setInterval(autoSlide, 3000);


container.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
container.addEventListener('mouseleave', () => autoSlideInterval = setInterval(autoSlide, 3000));

  