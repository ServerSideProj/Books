const isLoggedIn = localStorage.getItem("authToken") !== null;
var arrBooks = []; // the books that available on screen
$(document).ready(function () {
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

  $(".more-filters").on("click", openFiltersPopup);
});

// get all books from server
const getAllBooks = () => {
  fetchData(API_URL + "Book/all-active-books", renderBooks, error);
};

function error(e) {
  console.log(e);
}

// Render books on screen
const renderBooks = (books) => {
  arrBooks = books;
  const bookstore = $(".books-container");
  bookstore.empty();

  books.forEach((book) => {
    bookstore.append(generateBookCard(false, book));
  });
};

const openFiltersPopup = () => {
  $(".bg-dark");
};
