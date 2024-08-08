const API_ALL_BOOKS = "Book/all-books";
const API_ALL_USERS = "Users";
const API_ALL_AUTHORS = "Author/all-authors";

$(document).ready(function () {
  // Change the inner page on option click
  $(".opt").on("click", (e) => changeInnerPage(e.target));

  getTableBooks();

  // set the books as the inner page
  $(".inner-page-books, .inner-page-users, .inner-page-authors").hide();
  $(".inner-page-books").show();
  $("#books").addClass("checked");
});

// Change the inner page on option click
const changeInnerPage = (opt) => {
  $(".opt").removeClass("checked");
  $(opt).addClass("checked");

  $(".inner-page-books, .inner-page-users, .inner-page-authors").hide();

  // Show the relevant page based on the clicked option's id
  if (opt.id === "books") {
    $(".inner-page-books").show();
    getTableBooks();
  } else if (opt.id === "users") {
    $(".inner-page-users").show();
    getTableUsers();
  } else if (opt.id === "authors") {
    $(".inner-page-authors").show();
    getTableAuthors();
  }
};

const getTableBooks = () => {
  // change api url
  initializeTable("booksTable", API_ALL_BOOKS, [
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
  initializeTable("usersTable", API_ALL_USERS, [
    { data: "email" },
    { data: "username" },
    // { data: "Purcheses amount" },
    // { data: "Following" },
    // { data: "Followers" },
  ]);
};

const getTableAuthors = () => {
  // change api url
  initializeTable("authorsTable", API_ALL_AUTHORS, [
    { data: "name" },
    // { data: "nationality" },
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
