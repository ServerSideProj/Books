const isLoggedIn = localStorage.getItem("authToken") !== null;
const allBooksUrl = "Book/all-active-books";

var arrBooks = []; // the books that available on screen

$(document).ready(function () {
  $("#loader").show();
  $(".main").hide();

  // Initial render of books
  getAllBooks();

  $(".price-filter").on("click", function () {
    $(".price-filter > img").toggleClass("open");
    $(".sm-popup").toggleClass("open");
  });

  // Event handler for filter price
  $(".sm-popup p").on("click", function () {
    $(".sm-popup p").removeClass("selected");
    $(this).addClass("selected");
    $(".price-filter p").html(this.outerText);

    const filter = $(this).data("price-filter");
    sortAndRenderBooks(filter);
  });

  $("#more-filters").on("click", popupFilters);
});

// get all books from server
const getAllBooks = () => {
  fetchData(API_URL + allBooksUrl, renderBooks, onError);
};

// Render books on screen
const renderBooks = (books) => {
  $("#loader").hide();
  $(".main").show();

  arrBooks = books;
  const bookstore = $(".books-container");
  bookstore.empty();

  books.forEach((book) => {
    const bookCardHtml = generateBookCard_allDetails(book); // Get the HTML string
    const $bookCard = $(bookCardHtml);

    // Add click event listener to the book card
    $bookCard.click(() => {
      const bookUrl = `/pages/Book/index.html?id=${book.id}`;
      window.location.href = bookUrl;
    });

    // add listener to the like btn (and prevent from going to the page of the book)
    $bookCard.find(".like-btn").on("click", function (event) {
      event.stopPropagation();
      if (isLoggedIn) {
        $(this).toggleClass("liked");
      } else {
        popupLogin();
      }
    });

    bookstore.append($bookCard);
  });
};
