import { register } from "../../services/auth.js";

$(document).ready(function () {
  $(".form-login").on("submit", function (event) {
    event.preventDefault();

    const usernameInput = $('.form-login input[type="text"]');
    const emailInput = $('.form-login input[type="email"]');
    const passwordInput = $('.form-login input[type="password"]').eq(0);
    const confirmPasswordInput = $('.form-login input[type="password"]').eq(1);

    const username = usernameInput.val().trim();
    const email = emailInput.val().trim();
    const password = passwordInput.val();
    const confirmPassword = confirmPasswordInput.val();

    // Password match validation
    if (password != confirmPassword) {
      confirmPasswordInput[0].setCustomValidity("Passwords do not match.");
      confirmPasswordInput[0].reportValidity();
      return;
    } else {
      confirmPasswordInput[0].setCustomValidity(""); // Clear any previous errors
    }

    // If the form is valid, proceed with registration
    register(username, password, email)
      .then((success) => {
        if (success) {
          console.log("Registration successful");
          window.location.href = "/pages/Home/";
        } else {
          alert("Registration failed.");
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        alert("An error occurred during registration. Please try again.");
      });
  });
});
