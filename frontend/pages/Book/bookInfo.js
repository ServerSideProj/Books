$(document).ready(function () {
  // Extract the book ID from the URL query string
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get("id");

  if (bookId) {
    fetchBookData(bookId);
  } else {
    window.location.href = "/pages/NotFound/";
  }
});

// get the book's data from the server
const fetchBookData = (bookId) => {
  const bookUrl = `${API_URL}/Book/${bookId}`;
  fetchData(bookUrl, displayBookData, onError);
};

const displayBookData = (book) => {
  // Update the book cover image
  $(".book-cover").attr("src", book.imageLink);

  // Update the title and authors
  $(".title").text(book.title);
  $(".authors").text(book.authors.map((author) => author.name).join(", "));

  // Update the book type
  $("#type").text(book.isEbook ? "eBook" : "Physical");

  // Update the adult content indicator
  if (book.maturityRating === "NOT_MATURE") {
    $("#adult").hide(); // Hide the adult content tag if not mature
  } else {
    $("#adult").show();
  }

  // Update the page count
  $("#pages-num").text(book.pageCount);

  // Update the categories
  $("#categories").empty(); // Clear previous categories
  book.categories.forEach((category) => {
    $("#categories").append(`<div class="category">${category}</div>`);
  });

  // Update the rating and number of rates
  $(".rate").first().text(book.avgRating.toFixed(1));
  $("#num-of-rates").text(book.ratingCount);

  // Update the stars display
  const stars =
    "★".repeat(Math.round(book.avgRating)) +
    "☆".repeat(5 - Math.round(book.avgRating));
  $(".stars-container").text(stars);

  // Update the languages
  $("#languages").text(book.language);

  // Update the price
  $("#price").text(book.price);

  // Update the description
  $("#description").text(book.description);

  // Update the "See more in Google" link
  $(".see-more").attr("href", book.infoLink);
};
