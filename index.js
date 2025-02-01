fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
        document.querySelector("body").insertAdjacentHTML("afterbegin", data);

        initializeEventListeners();
        initializeModalListeners();
    })
    .catch((error) => console.error("Error loading header:", error));

fetch("footer/footer.html")
    .then((response) => response.text())
    .then((data) => {
        document.getElementById("footer-placeholder").innerHTML = data;
    })
    .catch((error) => console.error("Error loading footer:", error));
function initializeEventListeners() {
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function (e) {
            validateInputs(e);
        });
    } else {
        console.error("Form not found!");
    }

    // ضبط الحد الأدنى للتاريخ ليكون تاريخ اليوم
    const takeoffInput = document.getElementById("takeoff");
    const returnInput = document.getElementById("return");

    if (takeoffInput && returnInput) {
        const today = new Date().toISOString().split('T')[0];
        takeoffInput.min = today;
        returnInput.min = today;
    } else {
        console.error("Takeoff or Return input not found!");
    }

    // تهيئة أحداث تبديل الوجهات
    const swapBtn = document.getElementById("swapBtn");
    if (swapBtn) {
        swapBtn.addEventListener("click", swapDestinations);
    } else {
        console.error("Swap button not found!");
    }

    // تهيئة أحداث التواريخ
    if (takeoffInput && returnInput) {
        takeoffInput.addEventListener("change", function () {
            const takeoffDate = new Date(this.value);
            const returnDate = new Date(returnInput.value);

            if (returnDate <= takeoffDate) {
                alert("Return date must be after the take-off date.");
                returnInput.value = "";
            }

            returnInput.min = this.value;
        });

        returnInput.addEventListener("change", function () {
            const takeoffDate = new Date(takeoffInput.value);
            const returnDate = new Date(this.value);

            if (returnDate <= takeoffDate) {
                alert("Return date must be after the take-off date.");
                this.value = "";
            }
        });
    } else {
        console.error("Takeoff or Return input not found!");
    }
}

// تهيئة أحداث الـ modal
function initializeModalListeners() {
    const modal = document.getElementById("modal");
    const openModal = document.getElementById("openModal");
    const closeModal = document.querySelector(".close");
    const emailButton = document.getElementById("email");
    const emailLoginForm = document.getElementById("emailLoginForm");
    const socialButtons = document.querySelectorAll(".optionsbtn");
    const loginForm = document.getElementById("emailForm");

    if (!modal || !openModal || !closeModal || !emailButton || !emailLoginForm || !loginForm) {
        console.error("Modal elements not found!");
        return;
    }

    // فتح الـ modal
    openModal.addEventListener("click", () => {
        modal.style.display = "block";
        modal.setAttribute("aria-hidden", "false");
        setTimeout(() => {
            modal.querySelector(".modal-content").classList.add("show");
        }, 10);
    });

    // إغلاق الـ modal
    closeModal.addEventListener("click", () => {
        modal.querySelector(".modal-content").classList.remove("show");
        setTimeout(() => {
            modal.style.display = "none";
            modal.setAttribute("aria-hidden", "true");
        }, 300);
    });
}
// // إغلاق الـ modal عند النقر خارجها
// window.addEventListener("click", (event) => {
//     if (event.target === modal) {
//         modal.querySelector(".modal-content").classList.remove("show");
//         setTimeout(() => {
//             modal.style.display = "none";
//             modal.setAttribute("aria-hidden", "true");
//         }, 300);
//     }
// });

// إغلاق الـ modal باستخدام مفتاح Esc
//     document.addEventListener("keydown", (event) => {
//         if (event.key === "Escape" && modal.style.display === "block") {
//             modal.querySelector(".modal-content").classList.remove("show");
//             setTimeout(() => {
//                 modal.style.display = "none";
//                 modal.setAttribute("aria-hidden", "true");
//             }, 300);
//         }
//     });

//     // عرض نموذج تسجيل الدخول عبر البريد الإلكتروني وإخفاء الأزرار الاجتماعية
//     emailButton.addEventListener("click", (event) => {
//         event.preventDefault(); // منع السلوك الافتراضي للزر

//         // إخفاء الأزرار الاجتماعية
//         socialButtons.forEach(button => {
//             button.style.display = "none";
//         });

//         // عرض نموذج البريد الإلكتروني
//         emailLoginForm.style.display = "block";
//     });

//     // التحقق من صحة البريد الإلكتروني وكلمة المرور عند إرسال النموذج
//     loginForm.addEventListener("submit", (event) => {
//         event.preventDefault(); // منع إرسال النموذج

//         // الحصول على قيم المدخلات وعناصر الأخطاء
//         const email = document.getElementById("emailInput").value;
//         const password = document.getElementById("passwordInput").value;
//         const emailError = document.getElementById("emailError");
//         const passwordError = document.getElementById("passwordError");

//         // إعادة تعيين رسائل الأخطاء
//         emailError.style.display = "none";
//         passwordError.style.display = "none";

//         // التحقق من صحة البريد الإلكتروني
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) {
//             emailError.style.display = "block";
//             return;
//         }

//         // التحقق من صحة كلمة المرور
//         const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//         if (!passwordRegex.test(password)) {
//             passwordError.style.display = "block";
//             return;
//         }

//         // إذا كانت المدخلات صحيحة، قم بتنفيذ الإجراء المطلوب
//         alert("Login successful!");
//     });
// }

// التحقق من صحة المدخلات في النموذج
function validateInputs(e) {
    const fromInput = document.getElementById("from");
    const toInput = document.getElementById("to");
    const takeoffInput = document.getElementById("takeoff");
    const returnInput = document.getElementById("return");

    if (!fromInput || !toInput || !takeoffInput) {
        console.error("Form elements not found!");
        return;
    }

    const from = fromInput.value.trim().toLowerCase();
    const to = toInput.value.trim().toLowerCase();
    const takeoff = takeoffInput.value;
    const returnDate = returnInput ? returnInput.value : null;

    if (from === to) {
        e.preventDefault();
        alert("The 'From' and 'To' destinations cannot be the same.");
    } else if (returnDate && new Date(returnDate) <= new Date(takeoff)) {
        e.preventDefault();
        alert("Return date must be after the take-off date.");
    }
}

// تبديل الوجهات
function swapDestinations() {
    const fromInput = document.getElementById("from");
    const toInput = document.getElementById("to");

    if (fromInput && toInput) {
        const temp = fromInput.value;
        fromInput.value = toInput.value;
        toInput.value = temp;
    } else {
        console.error("Destination inputs not found!");
    }
}

