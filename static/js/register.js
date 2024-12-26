
const form = document.querySelector('form');
const password = document.querySelector('input[name="password"]');
const confirmPassword = document.querySelector('input[name="confirm_password"]');
const email = document.querySelector('input[name="email"]');

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


form.addEventListener('submit', function (e) {
  if (password.value !== confirmPassword.value) {
    confirmPassword.setCustomValidity('Passwords do not match.');
    confirmPassword.reportValidity();
    e.preventDefault(); 
  } else {
    confirmPassword.setCustomValidity('');
  }
});

confirmPassword.addEventListener('input', function () {
  confirmPassword.setCustomValidity('');
});

email.addEventListener('input', function () {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    email.setCustomValidity('Please enter a valid email address.'); // Geçersiz e-posta formatı mesajı
    email.reportValidity();
  } else {
    email.setCustomValidity(''); // Hata temizleme
  }
});
