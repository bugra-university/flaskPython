const passwordField = document.querySelector('#password');
const togglePassword = document.querySelector('#togglePassword');

// Şifre göster/gizle işlevi
togglePassword.addEventListener('click', function () {
  const type = passwordField.type === 'password' ? 'text' : 'password';
  passwordField.type = type;
  this.textContent = type === 'password' ? '👁️' : '🙈'; // Simgeyi değiştir
});
