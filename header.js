

// document.addEventListener("DOMContentLoaded", () => {
//     // Get DOM elements
//     const modal = document.getElementById("modal");
//     const openModal = document.getElementById("openModal");
//     const closeModal = document.querySelector(".close");
//     const emailButton = document.getElementById("email");
//     const emailLoginForm = document.getElementById("emailLoginForm");
//     const socialButtons = document.querySelectorAll(".optionsbtn");
//     const loginForm = document.getElementById("emailForm");

//     // Open modal
//     openModal.addEventListener("click", () => {
//         modal.style.display = "block";
//         modal.setAttribute("aria-hidden", "false");
//         setTimeout(() => {
//             modal.querySelector(".modal-content").classList.add("show");
//         }, 10);
//     });

//     // Close modal
//     closeModal.addEventListener("click", () => {
//         modal.querySelector(".modal-content").classList.remove("show");
//         setTimeout(() => {
//             modal.style.display = "none";
//             modal.setAttribute("aria-hidden", "true");
//         }, 300);
//     });

//     // Close modal when clicking outside
//     window.addEventListener("click", (event) => {
//         if (event.target === modal) {
//             modal.querySelector(".modal-content").classList.remove("show");
//             setTimeout(() => {
//                 modal.style.display = "none";
//                 modal.setAttribute("aria-hidden", "true");
//             }, 300);
//         }
//     });

//     // Close modal with Esc key
//     document.addEventListener("keydown", (event) => {
//         if (event.key === "Escape" && modal.style.display === "block") {
//             modal.querySelector(".modal-content").classList.remove("show");
//             setTimeout(() => {
//                 modal.style.display = "none";
//                 modal.setAttribute("aria-hidden", "true");
//             }, 300);
//         }
//     });

//     // Show email login form and hide social buttons
//     emailButton.addEventListener("click", (event) => {
//         event.preventDefault(); // Prevent default button behavior

//         // Hide all social buttons
//         socialButtons.forEach(button => {
//             button.style.display = "none";
//         });

//         // Show the email login form
//         emailLoginForm.style.display = "block";
//     });

//     // Validate email and password on form submission
//     loginForm.addEventListener("submit", (event) => {
//         event.preventDefault(); // Prevent form submission

//         // Get input values and error elements
//         const email = document.getElementById("emailInput").value;
//         const password = document.getElementById("passwordInput").value;
//         const emailError = document.getElementById("emailError");
//         const passwordError = document.getElementById("passwordError");

//         // Reset error messages
//         emailError.style.display = "none";
//         passwordError.style.display = "none";

//         // Validate email
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) {
//             emailError.style.display = "block";
//             return;
//         }

//         // Validate password
//         const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//         if (!passwordRegex.test(password)) {
//             passwordError.style.display = "block";
//             return;
//         }

//         // If validation passes, submit the form (or perform further actions)
//         alert("Login successful!");
//     });
// });