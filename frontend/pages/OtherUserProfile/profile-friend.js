$(document).ready(function () {
  $(".oval-btn").click(function () {
    // Remove 'selected' class from all buttons
    $(".oval-btn").removeClass("selected");

    // Add 'selected' class to the clicked button
    $(this).addClass("selected");
  });

  // change the add friend to remove friend (and back) on user click.
  $(".add-friend").click(function () {
    var currentSrc = $(this).attr("src");
    var newSrc =
      currentSrc === "../../assets/icons/Add user.svg"
        ? "../../assets/icons/User remove.svg"
        : "../../assets/icons/Add user.svg";
    $(this).attr("src", newSrc);
  });
});
