document.addEventListener("DOMContentLoaded", function () {
  const signUpButton = document.getElementById("button");
  const forgotPasswordButton = document.getElementById("forgotPassword");
  const linkButton = document.getElementById("linkButton");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password-input");
  const alertError = document.getElementById("alert-error");

  async function fetchUsers() {
    try {
      const response = await fetch("http://localhost:3000/users");
      if (!response.ok) {
        throw new Error("Ошибка получения user");
      }
      return await response.json();
    } catch (error) {
      console.error("Ошибка получения user:", error);
      return [];
    }
  }

  function validateFields() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
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

    if (!email) {
      markFieldAsError(emailInput);
    } else {
      clearError(emailInput);
    }

    if (!password) {
      markFieldAsError(passwordInput);
    } else {
      clearError(passwordInput);
    }

    return isValid;
  }

  async function handleLogin(event) {
    event.preventDefault();

    if (!validateFields()) {
      return;
    }

    const users = await fetchUsers();

    if (
      users.some((user) => user.email === email && user.password === password)
    ) {
      window.location.href = "../html/mainPage.html";
    } else {
      alertError.textContent = "Неправильный логин или пароль";
      alertError.style.color = "red";
    }
  }

  signUpButton.addEventListener("click", handleLogin);

  forgotPasswordButton.addEventListener("click", () => {
    window.location.href = "../html/forgotPassword.html";
  });

  linkButton.addEventListener("click", () => {
    window.location.href = "../html/registrationPage.html";
  });
});
