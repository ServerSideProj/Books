import { login } from "../../services/auth.js";

$(document).ready(function () {
  $(".form-login").on("submit", function (event) {
    event.preventDefault();

    const email = $('.form-login input[type="email"]').val();
    const password = $('.form-login input[type="password"]').val();

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

// add red to input for showing the data is not correct
const wrongData = () => {
  $(".input-box-sqr").addClass("wrong");

  setTimeout(function () {
    $(".input-box-sqr").removeClass("wrong");
  }, 2000);
};
