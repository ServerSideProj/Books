$(document).ready(function () {
  $(".inner-page-books, .inner-page-read, .inner-page-liked").hide();
  // Show the "My Books" page by default
  $(".inner-page-books").show();
  // Add 'checked' class to the "My Books" option
  $("#all-books").addClass("checked");

  // Change the inner page on option click
  $(".opt").click(function () {
    $(".opt").removeClass("checked");
    $(this).addClass("checked");

    $(".inner-page-books, .inner-page-read, .inner-page-liked").hide();

    // Show the relevant page based on the clicked option's id
    if (this.id === "all-books") {
      $(".inner-page-books").show();
    } else if (this.id === "read") {
      $(".inner-page-read").show();
    } else if (this.id === "liked") {
      $(".inner-page-liked").show();
    }
  });

  // Trigger file input click on btn click
  $(".add-image-icon").click(function () {
    $("#file-input").click();
  });

  // Change profile image on file input change
  $("#file-input").change((e) => changeProfile(e));
});

// Change the profile image function
const changeProfile = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      $(".user-photo").attr("src", event.target.result);
    };
    reader.readAsDataURL(file);
  }
};
