const password = document.getElementById("password-input");
const newPassword = document.getElementById("newPasswordInput");
const toggleVisibility = document.getElementById("toggle-visibility");
const button = document.getElementById("button");

toggleVisibility.addEventListener("click", () => {
  if (password.type === "password" && newPassword.type === "password") {
    newPassword.type = "text";
    password.type = "text";
  } else {
    newPassword.type = "password";
    password.type = "password";
  }
});

function validateLogin() {
  let isValid = true;

  function markFieldAsError(field) {
    field.classList.add("input-error");
    isValid = false;
  }

  function clearError(field) {
    field.classList.remove("input-error");
  }

  if (!password.value.trim()) {
    markFieldAsError(password);
  } else {
    clearError(password);
  }

  if (!newPassword.value.trim()) {
    markFieldAsError(newPassword);
  } else {
    clearError(newPassword);
  }

  return isValid;
}

function validatePasswords() {
  if (password.value !== newPassword.value) {
    alert("Пароли не совпадают!");
    password.classList.add("input-error");
    newPassword.classList.add("input-error");
    return false;
  }

  return true;
}

document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("button");

  button.addEventListener("click", (event) => {
    if (!validateLogin() || !validatePasswords()) {
      event.preventDefault();
    } else {
      window.location.href = "../html/loginPage.html";
    }
  });
});
