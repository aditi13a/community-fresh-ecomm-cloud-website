// ================= SLIDESHOW =================
const slides = document.querySelectorAll('.banner-section');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

function changeSlide(index) {
    if (!slides.length || !dots.length) return;
    slides[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');
    currentIndex = index;
    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
}

// Auto-slide every 5 seconds
if (slides.length && dots.length) {
    setInterval(() => {
        let nextIndex = (currentIndex + 1) % slides.length;
        changeSlide(nextIndex);
    }, 5000);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => changeSlide(index));
    });
}

// ================= CART SYSTEM =================
if (!localStorage.getItem("cart")) {
  localStorage.setItem("cart", JSON.stringify([]));
}

const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach(button => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-name");
    const price = parseFloat(button.getAttribute("data-price"));
    let cart = JSON.parse(localStorage.getItem("cart"));

    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart!`);
  });
});

// ================= LOCATION AUTOCOMPLETE =================
function initAutocomplete() {
    const input = document.getElementById("autocomplete");
    if (!input) return;
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener("place_changed", function() {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
            console.error("No details available for the selected place.");
            return;
        }
        const locationResult = document.getElementById("location-result");
        locationResult.textContent = place.formatted_address;
    });
}

function toggleDropdown() {
    const dropdownSymbol = document.querySelector(".dropdown-symbol");
    const inputField = document.getElementById("autocomplete");
    if (dropdownSymbol) dropdownSymbol.classList.toggle("open");
    if (inputField) inputField.focus();
}

function loadGoogleMapsAPI() {
    const script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&callback=initAutocomplete";
    script.async = true;
    document.body.appendChild(script);
}
loadGoogleMapsAPI();
