$(document).ready(function () {
  $(".inner-page-books, .inner-page-read, .inner-page-liked").hide();
  $(".inner-page-books").show();
  $("#all-books").addClass("checked");

  // Change the inner page on option click
  $(".opt").click("click", (e) => changeInnerPage(e.target));

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

// Change the inner page on option click
const changeInnerPage = (opt) => {
  $(".opt").removeClass("checked");
  $(opt).addClass("checked");

  $(".inner-page-books, .inner-page-read, .inner-page-liked").hide();

  // Show the relevant page based on the clicked option's id
  if (opt.id === "all-books") {
    $(".inner-page-books").show();
  } else if (opt.id === "read") {
    $(".inner-page-read").show();
  } else if (opt.id === "liked") {
    $(".inner-page-liked").show();
  }
};
