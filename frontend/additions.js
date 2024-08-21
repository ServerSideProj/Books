$(document).ready(function () {
  animateRows();

  // Check if the current URL ends with "additions.html"
  if (window.location.pathname.endsWith("additions.html")) {
    $(".btn-border-bot").text("Go to Home page");
    $(".btn-border-bot").parent().attr("href", "/pages/Home/");
  }
});

function animateRows() {
  // Select all the rows in the table
  const rows = $("tr");

  // Loop through each row
  rows.each(function (index) {
    $(this).css({
      opacity: "0", // Start with the row hidden
      position: "relative", // Needed for the sliding effect
      top: "20px", // Start with the row slightly below its final position
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
