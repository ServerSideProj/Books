const isLoggedIn = localStorage.getItem("authToken") !== null;
var arrBooks = []; // the books that available on screen
$(document).ready(function () {
  // Initial render of books
  renderBooks(arrBooks);

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

  $(".more-filters").on("click", openFiltersPopup);
});

// get all books from server
const getAllBooks = () => {
  // arrBooks =
};

// Render books on screen
const renderBooks = (books) => {
  const bookstore = $(".books-container");
  bookstore.empty();

  books.forEach((book) => {
    bookstore.append(generateBookCard(false));
  });
};

const openFiltersPopup = () => {
  $(".bg-dark");
};
