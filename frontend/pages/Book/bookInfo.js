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

  if (sessionStorage.getItem(`isLiked`) == "true") {
    $(".like-container").addClass("liked");
  } else {
    $(".like-container").removeClass("liked");
  }

  // add listener to the like btn
  $(".like-container").on("click", function () {
    if (isLoggedIn) {
      // Check if the book is already in the user's purchases
      const bookAlreadyPurchased = allUserBooks.some(
        (book) => book.id == bookId
      );

      if (!bookAlreadyPurchased) {
        $(this).toggleClass("liked");

        // Prepare the data to be sent to the server
        const data = {
          bookId: bookId,
          userEmail: localStorage.getItem("email"),
        };

        updateLikeStatus(data);
      } else {
        popupAlreadyPurchased();
      }
    } else {
      popupLogin();
    }
  });

  // add listener to the add to cart btn
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
  const starsContainer = $(".stars-container");
  starsContainer.empty(); // Clear any existing stars

  // Loop through 5 star positions
  for (let i = 1; i <= 5; i++) {
    let starImage;

    if (i <= Math.floor(book.avgRating)) {
      // Full star
      starImage = "../../assets/icons/star-full.svg";
    } else if (i === Math.ceil(book.avgRating) && book.avgRating % 1 !== 0) {
      // Half star
      starImage = "../../assets/icons/star-half.svg";
    } else {
      // Empty star
      starImage = "../../assets/icons/star-empty.svg";
    }

    // Create the img element and append it to the container
    starsContainer.append(
      `<img src="${starImage}" alt="star" class="star-icon" />`
    );
  }

  // Update the languages
  $("#languages").text(book.language);

  // Update the price
  $("#price").text(book.price);

  // Update the description
  $("#description").text(book.description);

  // Update the "See more in Google" link
  $(".see-more").attr("href", book.infoLink);

  handleSpeechDesc();
};

// show all reviews of user about this book.
// show all reviews of user about this book.
const displayReviews = (reviews) => {
  if (reviews.length === 0) {
    $(".reviews-wrapper").append(
      `<p class="padding-left-2">No reviews yet.</p>`
    );
    return;
  }
  let allReviewsHtml = "";

  for (let i = 0; i < reviews.length; i++) {
    let profileImage = reviews[i].profileImage
      ? IMAGE_URL + reviews[i].profileImage
      : "../../assets/images/user-profile-image.svg";

    let username = reviews[i].username || "Anonymous";

    // Generate stars based on rating
    let starsHTML = "";
    for (let j = 1; j <= 5; j++) {
      let starImage;

      if (j <= Math.floor(reviews[i].rating)) {
        // Full star
        starImage = "../../assets/icons/star-full.svg";
      } else if (
        j === Math.ceil(reviews[i].rating) &&
        reviews[i].rating % 1 !== 0
      ) {
        // Half star
        starImage = "../../assets/icons/star-half.svg";
      } else {
        // Empty star
        starImage = "../../assets/icons/star-empty.svg";
      }

      starsHTML += `<img src="${starImage}" alt="star" class="star-icon" />`;
    }

    let reviewCard = `
      <div class="review-card">
        <p class="sm-text text-center font-reg">${reviews[i].reviewText}</p>
        <div class="stars-container-review">
          ${starsHTML} <!-- Insert the stars here -->
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

// handle speech and pause btns of description.
const handleSpeechDesc = () => {
  const speakButton = $("#speak-description-btn");
  const pauseButton = $("#pause-btn");

  // Start speech and show pause button
  speakButton.on("click", function () {
    var descriptionText = $("#description").text();
    responsiveVoice.speak(descriptionText, null, {
      onstart: function () {
        pauseButton.show();
      },
      onend: function () {
        pauseButton.hide();
      },
    });
  });

  // Pause speech and hide pause button
  pauseButton.on("click", function () {
    responsiveVoice.pause();
    pauseButton.hide();
  });

  // Stop speech when page is exited
  $(window).on("beforeunload", function () {
    responsiveVoice.cancel();
  });

  // Hide pause button if there is no active speech
  $(document).on("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
      responsiveVoice.cancel();
      pauseButton.hide();
    }
  });
};
