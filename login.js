document.addEventListener("DOMContentLoaded", function () {
    // Get DOM elements
    var emailButton = document.getElementById("email");
    var emailLoginForm = document.getElementById("emailLoginForm");
    var socialButtons = document.querySelectorAll(".optionsbtn");
    var loginForm = document.getElementById("emailForm");
    var backButton = document.getElementById("backButton");
    var rememberCheckbox = document.querySelector("#remember input[type='checkbox']");

    // Show email login form and hide social buttons
    emailButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default button behavior

        // Hide all social buttons
        for (var i = 0; i < socialButtons.length; i++) {
            socialButtons[i].style.display = "none";
        }

        // Show the email login form
        emailLoginForm.style.display = "block";
    });

    // Back button to show social buttons again
    backButton.addEventListener("click", function () {
        // Show all social buttons
        for (var i = 0; i < socialButtons.length; i++) {
            socialButtons[i].style.display = "block";
        }

        // Hide the email login form
        emailLoginForm.style.display = "none";
    });

    // Validate email and password on form submission
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission

        // Get input values and error elements
        var email = document.getElementById("emailInput").value;
        var password = document.getElementById("passwordInput").value;
        var emailError = document.getElementById("emailError");
        var passwordError = document.getElementById("passwordError");

        // Reset error messages
        emailError.style.display = "none";
        passwordError.style.display = "none";

        // Validate email
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            emailError.style.display = "block";
            return;
        }

        // Validate password
        var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            passwordError.style.display = "block";
            return;
        }

        // Save email and password to localStorage if "Remember me" is checked
        if (rememberCheckbox.checked) {
            localStorage.setItem("user-email", email);
            localStorage.setItem("user-password", password);
        } else {
            // Remove saved email and password if "Remember me" is unchecked
            localStorage.removeItem("user-email");
            localStorage.removeItem("user-password");
        }

        // If validation passes, submit the form (or perform further actions)
        alert("Login successful!");
        window.location.href = "../index.html"; // Redirect to home page after login
    });

    // On page load, check if email and password are saved in localStorage
    window.onload = function () {
        var savedEmail = localStorage.getItem("user-email");
        var savedPassword = localStorage.getItem("user-password");

        if (savedEmail && savedPassword) {
            document.getElementById("emailInput").value = savedEmail;
            document.getElementById("passwordInput").value = savedPassword;
            rememberCheckbox.checked = true; // Check the "Remember me" checkbox
        }
    };
});