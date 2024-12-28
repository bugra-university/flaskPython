// profile.js

document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("new_password");
    const togglePassword = document.getElementById("togglePassword");
    const eyeIcon = togglePassword.querySelector("i");

    togglePassword.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text"; 
            eyeIcon.classList.remove("bi-eye-slash"); 
            eyeIcon.classList.add("bi-eye");
        } else {
            passwordInput.type = "password"; 
            eyeIcon.classList.remove("bi-eye"); 
            eyeIcon.classList.add("bi-eye-slash"); 
        }
    });
});


