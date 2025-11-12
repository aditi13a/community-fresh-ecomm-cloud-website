// JavaScript to toggle active tab
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function () {
        document.querySelector('.tab.active').classList.remove('active');
        this.classList.add('active');
    });
});

// JavaScript for dropdown (if needed)
document.getElementById('order-time').addEventListener('change', function () {
    alert(`Filtering orders placed in: ${this.value}`);
});
