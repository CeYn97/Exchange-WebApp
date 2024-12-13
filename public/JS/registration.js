document.addEventListener("DOMContentLoaded", function () {
  const firstName = document.getElementById("name");
  const lastName = document.getElementById("lastName");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password-input");
  const signUpButton = document.getElementById("button");
  const linkButton = document.getElementById("linkButton");
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

    if (!firstName.value.trim()) {
      markFieldAsError(firstName);
    } else {
      clearError(firstName);
    }

    if (!lastName.value.trim()) {
      markFieldAsError(lastName);
    } else {
      clearError(lastName);
    }

    return isValid;
  }

  async function registrationUsers(event) {
    event.preventDefault();
    if (!validateFields()) {
      return;
    }
    const users = await fetchUsers();

    const email = emailInput.value.trim();
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      alertError.textContent = "Пользователь с таким email уже существует.";
      alertError.style.color = "red";
      alertError.style.display = "block";
      return;
    }

    const lastId = users.reduce((maxId, user) => Math.max(maxId, user.id), 0);

    const newUser = {
      id: lastId + 1,
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      email: emailInput.value.trim(),
      password: passwordInput.value.trim(),
    };

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        window.location.href = "../html/mainPage.html";
      } else {
        throw new Error("Ошибка регистрации пользователя");
      }
    } catch (error) {
      alertError.textContent =
        "Не удалось зарегистрировать пользователя. Попробуйте снова.";
      alertError.style.color = "red";
    }
  }

  signUpButton.addEventListener("click", registrationUsers);

  linkButton.addEventListener("click", () => {
    window.location.href = "../html/registrationPage.html";
  });
});
