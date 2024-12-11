function validateLogin() {
  const email = document.getElementById("email");
  const password = document.getElementById("password-input");
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  let isRadioChecked = false;

  let isValid = true;

  radioButtons.forEach((radio) => {
    if (!radio.checked) {
      radio.style.border = "2px solid red";
    } else {
      radio.style.border = "1px solid #cbd5e0";
      isRadioChecked = true;
    }
  });

  if (!isRadioChecked) {
    isValid = false;
  }

  function markFieldAsError(field) {
    field.classList.add("input-error");
    isValid = false;
  }

  function clearError(field) {
    field.classList.remove("input-error");
  }

  if (!email.value.trim()) {
    markFieldAsError(email);
  } else {
    clearError(email);
  }

  if (!password.value.trim()) {
    markFieldAsError(password);
  } else {
    clearError(password);
  }

  return isValid;
}

document.addEventListener("DOMContentLoaded", function () {
  const signUpButton = document.getElementById("button");

  signUpButton.addEventListener("click", (event) => {
    if (!validateLogin()) {
      event.preventDefault();
    } else {
      window.location.href = "../html/mainPage.html";
    }
  });

  document.getElementById("forgotPassword").addEventListener("click", () => {
    window.location.href = "../html/forgotPassword.html";
  });

  document.getElementById("linkButton").addEventListener("click", () => {
    window.location.href = "../html/registrationPage.html";
  });
});
