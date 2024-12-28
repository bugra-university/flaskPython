document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector('form');
  const password = document.querySelector('input[name="password"]');
  const confirmPassword = document.querySelector('input[name="confirm_password"]');
  const email = document.querySelector('input[name="email"]');

  // Şifre göster/gizle simgeleri
  const togglePassword = document.querySelector('#togglePassword');
  const toggleConfirmPassword = document.querySelector('#toggleConfirmPassword');

  // Şifre güvenliği kontrolü
  password.addEventListener('input', function () {
      const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!strongPasswordRegex.test(password.value)) {
          password.setCustomValidity(
              'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character (e.g. @$!%*?&).'
          );
          password.reportValidity();
      } else {
          password.setCustomValidity(''); // Hata temizleme
      }
  });

  // Şifre eşleşme kontrolü
  form.addEventListener('submit', function (e) {
      if (password.value !== confirmPassword.value) {
          confirmPassword.setCustomValidity('Passwords do not match.');
          confirmPassword.reportValidity();
          e.preventDefault(); // Form gönderimini engelle
      } else {
          confirmPassword.setCustomValidity('');
      }

      // E-posta doğrulama
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value)) {
          email.setCustomValidity('Please enter a valid email address.');
          email.reportValidity();
          e.preventDefault(); // Form gönderimini engelle
      }
  });

  // Şifre alanı üzerinde hata temizleme
  confirmPassword.addEventListener('input', function () {
      confirmPassword.setCustomValidity('');
  });

  // E-posta doğrulama
  email.addEventListener('input', function () {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value)) {
          email.setCustomValidity('Please enter a valid email address.');
          email.reportValidity();
      } else {
          email.setCustomValidity('');
      }
  });

  // Şifre alanını göster/gizle
  const eyeIconPassword = togglePassword.querySelector("i"); // Iconu seçiyoruz
  togglePassword.addEventListener("click", function () {
      if (password.type === "password") {
          password.type = "text"; 
          eyeIconPassword.classList.remove("bi-eye-slash"); 
          eyeIconPassword.classList.add("bi-eye");
      } else {
          password.type = "password"; 
          eyeIconPassword.classList.remove("bi-eye"); 
          eyeIconPassword.classList.add("bi-eye-slash"); 
      }
  });

  // Şifre doğrulama alanını göster/gizle
  const eyeIconConfirmPassword = toggleConfirmPassword.querySelector("i"); // Iconu seçiyoruz
  toggleConfirmPassword.addEventListener("click", function () {
      if (confirmPassword.type === "password") {
          confirmPassword.type = "text"; 
          eyeIconConfirmPassword.classList.remove("bi-eye-slash"); 
          eyeIconConfirmPassword.classList.add("bi-eye");
      } else {
          confirmPassword.type = "password"; 
          eyeIconConfirmPassword.classList.remove("bi-eye"); 
          eyeIconConfirmPassword.classList.add("bi-eye-slash"); 
      }
  });
});
