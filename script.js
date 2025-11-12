const slides = document.querySelectorAll('.banner-section');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

function changeSlide(index) {
    // Remove active class from current slide and dot
    slides[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');
    
    // Update to new slide
    currentIndex = index;
    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
}

// Auto-slide every 5 seconds
setInterval(() => {
    let nextIndex = (currentIndex + 1) % slides.length;
    changeSlide(nextIndex);
}, 5000);

// Add click event to dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => changeSlide(index));
});


function initAutocomplete() {
    // Create the autocomplete object and associate it with the input field
    const input = document.getElementById("autocomplete");
    const autocomplete = new google.maps.places.Autocomplete(input);
    
    // Bias the search to your country or region, if desired
    // autocomplete.setComponentRestrictions({ country: 'US' });
    
    autocomplete.addListener("place_changed", function() {
        const place = autocomplete.getPlace();
        
        if (!place.geometry) {
            console.error("No details available for the selected place.");
            return;
        }

        // Get the formatted address and set it to the location result span
        const locationResult = document.getElementById("location-result");
        locationResult.textContent = place.formatted_address;
    });
}

function toggleDropdown() {
    const dropdownSymbol = document.querySelector(".dropdown-symbol");
    const inputField = document.getElementById("autocomplete");

    // Toggle open class for rotation effect
    dropdownSymbol.classList.toggle("open");

    // Focus the input field when dropdown is clicked
    inputField.focus();
}

// Load the Google Maps API and initialize the autocomplete function
function loadGoogleMapsAPI() {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDSuVPeDNAnSMCrKd_0xvdm3_klscX6jcw&libraries=places&callback=initAutocomplete`;
    script.async = true;
    document.body.appendChild(script);
}

// Call the function to load the Google Maps API
loadGoogleMapsAPI();
