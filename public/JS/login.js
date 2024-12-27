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
        throw new Error("Ошибка получения пользователей");
      }
      return await response.json();
    } catch (error) {
      console.error("Ошибка получения пользователей:", error);
      return [];
    }
  }

  function validateFields() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const radioChecked = document.querySelector('input[type="radio"]:checked');
    let isValid = true;

    if (!email) {
      emailInput.classList.add("input-error");
      isValid = false;
    } else {
      emailInput.classList.remove("input-error");
    }

    if (!password) {
      passwordInput.classList.add("input-error");
      isValid = false;
    } else {
      passwordInput.classList.remove("input-error");
    }

    if (!radioChecked) {
      alertError.textContent = "Выберите опцию 'Remember me'";
      alertError.style.color = "red";
      alertError.style.color = "red";
      alertError.style.alignContent = "center";
      alertError.style.textAlign = "center";
      alertError.style.margin = "20px";
      alertError.style.borderRadius = "6px";
      alertError.style.color = "white";
      alertError.style.backgroundColor = "#ff4141";
      alertError.style.width = "300px";
      alertError.style.height = "70px";
      alertError.style.opacity = "0.7";
      isValid = false;
    } else {
      alertError.textContent = "";
    }

    return isValid;
  }

  async function handleLogin(event) {
    event.preventDefault();

    if (!validateFields()) {
      return;
    }

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const users = await fetchUsers();

    if (users.length === 0) {
      alertError.textContent = "Ошибка подключения к базе данных";
      alertError.style.color = "red";
      alertError.style.color = "red";
      alertError.style.alignContent = "center";
      alertError.style.textAlign = "center";
      alertError.style.margin = "20px";
      alertError.style.borderRadius = "6px";
      alertError.style.color = "white";
      alertError.style.backgroundColor = "#ff4141";
      alertError.style.width = "300px";
      alertError.style.height = "70px";
      alertError.style.opacity = "0.7";
      return;
    }

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      window.location.href = "../html/mainPage.html";
    } else {
      alertError.textContent = "Неправильный логин или пароль";
      alertError.style.color = "red";
      alertError.style.color = "red";
      alertError.style.alignContent = "center";
      alertError.style.textAlign = "center";
      alertError.style.margin = "20px";
      alertError.style.borderRadius = "6px";
      alertError.style.color = "white";
      alertError.style.backgroundColor = "#ff4141";
      alertError.style.width = "300px";
      alertError.style.height = "70px";
      alertError.style.opacity = "0.7";
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
