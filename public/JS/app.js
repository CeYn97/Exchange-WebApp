const passwordInput = document.getElementById("password-input");
const toggleVisibility = document.getElementById("toggle-visibility");

toggleVisibility.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
});
