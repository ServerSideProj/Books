import { login } from "../../services/auth.js";

$(document).ready(function () {
  $(".form-login").on("submit", function (event) {
    event.preventDefault();

    const emailInput = $('.form-login input[type="email"]');
    const passwordInput = $('.form-login input[type="password"]');

    const email = emailInput.val().trim();
    const password = passwordInput.val().trim();

    // Email validation
    if (!validateEmail(email)) {
      emailInput[0].setCustomValidity("Please enter a valid email address.");
      emailInput[0].reportValidity();
      return;
    } else {
      emailInput[0].setCustomValidity(""); // Clear any previous errors
    }

    // Password validation
    if (!validatePassword(password)) {
      passwordInput[0].setCustomValidity(
        "Password must be at least 3 characters long."
      );
      passwordInput[0].reportValidity();
      return;
    } else {
      passwordInput[0].setCustomValidity(""); // Clear any previous errors
    }

    // Attempt to login
    login(email, password)
      .then((response) => {
        if (response) {
          console.log("Login successful:", response);
          window.location.href = "/pages/Home";
        } else {
          popupText("Login failed. Please check your email and password.");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("An error occurred during login. Please try again.");
      });
  });
});

// Email validation function
const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

// Password validation function
const validatePassword = (password) => {
  return password.length >= 3;
};
