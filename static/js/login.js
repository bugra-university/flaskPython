const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const eyeIcon = togglePassword.querySelector("i");

togglePassword.addEventListener("click", function () {
  // Şifre alanının türünü değiştir
  if (passwordInput.type === "password") {
    passwordInput.type = "text"; // Şifreyi göster
    eyeIcon.classList.remove("bi-eye-slash"); // Kapalı göz ikonunu kaldır
    eyeIcon.classList.add("bi-eye"); // Açık göz ikonunu ekle
  } else {
    passwordInput.type = "password"; // Şifreyi gizle
    eyeIcon.classList.remove("bi-eye"); // Açık göz ikonunu kaldır
    eyeIcon.classList.add("bi-eye-slash"); // Kapalı göz ikonunu ekle
  }
});
