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
      'Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character.'
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
togglePassword.addEventListener('click', function () {
  const type = password.type === 'password' ? 'text' : 'password';
  password.type = type;
  this.textContent = type === 'password' ? '👁️' : '🙈'; // Simgeyi değiştir
});

// Şifre doğrulama alanını göster/gizle
toggleConfirmPassword.addEventListener('click', function () {
  const type = confirmPassword.type === 'password' ? 'text' : 'password';
  confirmPassword.type = type;
  this.textContent = type === 'password' ? '👁️' : '🙈'; // Simgeyi değiştir
});
