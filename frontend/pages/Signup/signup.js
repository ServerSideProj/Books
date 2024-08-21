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
    if (password !== confirmPassword) {
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
          window.location.href = "../Home/";
        } else {
          // Set custom validity on the email field if the registration fails
          emailInput[0].setCustomValidity("Email already in the database.");
          emailInput[0].reportValidity();
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        // Set custom validity on the email field if there's an error during registration
        emailInput[0].setCustomValidity("Email already registered.");
        emailInput[0].reportValidity();
      });
  });
});
