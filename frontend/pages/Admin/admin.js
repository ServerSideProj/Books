$(document).ready(function () {
  // set the books as the inner page
  $(".inner-page-books, .inner-page-users, .inner-page-authors").hide();
  $(".inner-page-books").show();
  $("#books").addClass("checked");

  getTableBooks();
  getTableUsers();
  getTableAuthors();

  // Change the inner page on option click
  $(".opt").on("click", (e) => changeInnerPage(e.target));
});

// Change the inner page on option click
const changeInnerPage = (opt) => {
  $(".opt").removeClass("checked");
  $(opt).addClass("checked");

  $(".inner-page-books, .inner-page-users, .inner-page-authors").hide();

  // Show the relevant page based on the clicked option's id
  if (opt.id === "books") {
    $(".inner-page-books").show();
  } else if (opt.id === "users") {
    $(".inner-page-users").show();
  } else if (opt.id === "authors") {
    $(".inner-page-authors").show();
  }
};

const getTableBooks = () => {
  // change api url
  initializeTable("booksTable", "/books", [
    { data: "id" },
    { data: "title" },
    { data: "language" },
    { data: "avgRating" },
    { data: "ratingCount" },
    { data: "maturityRating" },
    { data: "bookType" },
  ]);
};

const getTableUsers = () => {
  // change api url
  initializeTable("usersTable", "/users", [
    { data: "id" },
    { data: "name" },
    { data: "Purcheses amount" },
    { data: "Following" },
    { data: "Followers" },
  ]);
};

const getTableAuthors = () => {
  // change api url
  initializeTable("authorsTable", "/authors", [
    { data: "id" },
    { data: "name" },
    { data: "nationality" },
  ]);
};

// Function to initialize DataTable
const initializeTable = (tableId, ajaxUrl, columns) => {
  $("#" + tableId).DataTable({
    ajax: {
      url: API_URL + ajaxUrl,
      dataSrc: "",
    },
    columns: columns,
    destroy: true, // reinitialize the table
  });
};
