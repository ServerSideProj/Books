const isLoggedIn = localStorage.getItem("authToken") !== null;
var bookId;
$(document).ready(function () {
  // Show the loader initially
  $("#loader").show();
  $(".main").hide();

  // Extract the book ID from the URL query string
  const urlParams = new URLSearchParams(window.location.search);
  bookId = urlParams.get("id");

  if (bookId) {
    fetchBookData(bookId);
  } else {
    window.location.href = "/pages/NotFound/";
  }
});

// get the book's data from the server
const fetchBookData = (bookId) => {
  const bookUrl = `${API_URL}Book/${bookId}`;
  const reviewsUrl = `${API_URL}Book/reviews/${bookId}`;
  fetchData(bookUrl, displayBookData, onError);
  fetchData(reviewsUrl, displayReviews, onError);
};

const displayBookData = (book) => {
  $("#loader").hide();
  $(".main").show();

  // add listener to the "read more" btn
  $(".see-more-sum").on("click", (e) => {
    $("#description").toggleClass("open");
    if ($("#description").hasClass("open")) e.target.innerText = "read less";
    else e.target.innerText = "read more";
  });

  // add listener to the like btn
  $(".like-container").on("click", function () {
    if (isLoggedIn) {
      $(this).toggleClass("liked");
    } else {
      popupLogin();
    }
  });

  // add listener to the like btn
  $("#add-to-cart-btn").on("click", function () {
    if (isLoggedIn) {
      addToCart(bookId);
    } else {
      popupLogin();
    }
  });

  // Update the book cover image
  $(".book-cover").attr("src", book.imageLink);

  // Update the title and authors
  $(".title").text(book.title);

  // Update the title and authors
  const authorsHtml = book.authors
    .map(
      (author) =>
        `<span class="author-link" data-author-id="${author.id}">${author.name}</span>`
    )
    .join(", ");
  $(".authors").html(authorsHtml);

  // Attach click event listeners to authors
  $(".author-link").click(function () {
    const authorId = $(this).data("author-id");
    const authorUrl = `${API_URL}Author/${authorId}`;
    fetchData(authorUrl, openPopupAuthor, onError);
  });

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

const displayReviews = (reviews) => {
  if (reviews.length === 0) {
    $(".reviews-wrapper").append(
      `<p class="padding-left-2">No reviews yet.</p>`
    );
    return;
  }
  let allReviewsHtml = "";

  for (let i = 0; i < reviews.length; i++) {
    let profileImage =
      reviews[i].profileImage || "../../assets/images/user-profile-image.svg";
    let username = reviews[i].username || "Anonymous";

    let reviewCard = `
      <div class="review-card">
              <p class="sm-text text-center font-reg">${reviews[i].reviewText}</p>
              <div class="stars-container">
                Rating: <span>${reviews[i].rating}</span>
              </div>
              <div class="container-flex-col gap-03 center-hor">
                <img
                  src="${profileImage}"
                  alt="user-profile-image"
                  class="user-image"
                />
                <p class="username">${username}</p>
              </div>
            </div>
      `;
    allReviewsHtml += reviewCard;
  }
  $(".reviews-wrapper").append(allReviewsHtml);
};
