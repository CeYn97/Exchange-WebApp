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

document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password-input");
  const newPasswordInput = document.getElementById("newPasswordInput");
  const button = document.getElementById("button");
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

  async function updateUser(userId, updatedData) {
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Ошибка обновления пользователя");
      }

      return await response.json();
    } catch (error) {
      console.error("Ошибка обновления пользователя:", error);
    }
  }

  function validateFields() {
    const password = passwordInput.value.trim();
    const newPassword = newPasswordInput.value.trim();

    let isValid = true;

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

    if (!newPassword) {
      markFieldAsError(newPasswordInput);
    } else {
      clearError(newPasswordInput);
    }

    if (password !== newPassword) {
      markFieldAsError(newPasswordInput);
      alertError.textContent = "Пароли не совпадают";
      alertError.style.color = "red";
      alertError.style.color = "red";
      alertError.style.alignContent = "center";
      alertError.style.textAlign = "center";
      alertError.style.margin = "20px";
      alertError.style.borderRadius = "6px";
      alertError.style.color = "white";
      alertError.style.backgroundColor = "#ff4141";
      alertError.style.width = "200px";
      alertError.style.height = "70px";
      alertError.style.opacity = "0.7";
      return;
      isValid = false;
    } else {
      clearError(newPasswordInput);
    }

    return isValid;
  }

  async function changePassword(event) {
    event.preventDefault();

    if (!validateFields()) {
      return;
    }

    const email = emailInput.value.trim();
    const newPassword = newPasswordInput.value.trim();

    const users = await fetchUsers();

    const user = users.find((user) => user.email === email);

    if (!user) {
      alertError.textContent = "Пользователь с указанным email не найден";
      alertError.style.color = "red";
      alertError.style.alignContent = "center";
      alertError.style.textAlign = "center";
      alertError.style.margin = "20px";
      alertError.style.borderRadius = "6px";
      alertError.style.color = "white";
      alertError.style.backgroundColor = "#ff4141";
      alertError.style.width = "400px";
      alertError.style.height = "70px";
      alertError.style.opacity = "0.7";
      return;
    }

    await updateUser(user.id, { password: newPassword });

    alertError.textContent = "Пароль успешно обновлен";
    alertError.style.color = "green";
    alertError.style.alignContent = "center";
    alertError.style.textAlign = "center";
    alertError.style.margin = "20px";
    alertError.style.borderRadius = "6px";
    alertError.style.color = "white";
    alertError.style.backgroundColor = "#5DE100";
    alertError.style.width = "300px";
    alertError.style.height = "70px";
    alertError.style.opacity = "0.7";

    setTimeout(() => {
      window.location.href = "../html/loginPage.html";
    }, 1000);
  }

  button.addEventListener("click", changePassword);
});
