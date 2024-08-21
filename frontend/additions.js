$(document).ready(function () {
  $(".ran-img").attr("src", "./assets/images/ran-photo.png");
  $(".hila-img").attr("src", "./assets/images/hila-photo.png");

  animateRows();

  // Check if the current URL ends with "additions.html"
  if (window.location.pathname.endsWith("additions.html")) {
    $(".btn-border-bot").text("Go to Home page");
    $(".btn-border-bot").parent().attr("href", "./pages/Home/");
  }
});

function animateRows() {
  // Select all the rows in the table
  const rows = $("tr");

  rows.each(function (index) {
    $(this).css({
      opacity: "0",
      position: "relative",
      top: "20px",
    });

    // Apply a delay and animate the row
    $(this)
      .delay(index * 200)
      .animate(
        {
          opacity: "1",
          top: "0",
        },
        800
      ); // 800ms animation time
  });
}
