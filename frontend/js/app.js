// app.js

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("consultationForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent default form submission

        // Get form values
        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const message = document.getElementById("message").value.trim();

        // Basic validation
        if (!name || !phone || !message) {
            alert("Please fill in all fields before submitting.");
            return;
        }

        // Simple phone number validation (optional)
        const phonePattern = /^[0-9]{7,15}$/; // allows 7-15 digits
        if (!phonePattern.test(phone)) {
            alert("Please enter a valid phone number (7-15 digits).");
            return;
        }

        // Simulate form submission
        alert(
            `Thank you, ${name}! Your appointment request has been received.\nWe will contact you shortly at ${phone}.`
        );

        // Optionally, reset the form
        form.reset();
    });
});