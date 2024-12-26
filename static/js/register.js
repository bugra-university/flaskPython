const form = document.querySelector('form');
const password = document.querySelector('input[name="password"]');
const confirmPassword = document.querySelector('input[name="confirm_password"]');

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
