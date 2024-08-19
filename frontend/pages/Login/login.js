import { login } from "../../services/auth.js";

$(document).ready(function () {
  $(".form-login").on("submit", function (event) {
    event.preventDefault();

    const email = $('.form-login input[type="email"]').val();
    const password = $('.form-login input[type="password"]').val();

    if (!validateEmail(email) || !validatePassword(password)) {
      wrongData();
      return; // Stop the login process if validation fails
    }

    login(email, password)
      .then((response) => {
        if (response) {
          console.log("Login successful:", response);
          window.location.href = "/pages/Home";
        } else {
          wrongData();
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
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

// Add red to input to show that the data is not correct
const wrongData = () => {
  $(".input-box-sqr").each(function () {
    if (!validateEmail($(this).val()) && $(this).attr("type") === "email") {
      $(this).addClass("wrong");
    } else if (
      $(this).attr("type") === "password" &&
      !validatePassword($(this).val())
    ) {
      $(this).addClass("wrong");
    }
  });

  setTimeout(function () {
    $(".input-box-sqr").removeClass("wrong");
  }, 2000);
};
