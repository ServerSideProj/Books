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

  $(".create-author-btn").on("click", popupCreateAuthor);
  $(".create-user-btn").on("click", popupCreateUser);
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
  initializeTable("booksTable", API_ALL_BOOKS, [
    { data: "id" },
    { data: "title" },
    { data: "language" },
    { data: "avgRating" },
    { data: "ratingCount" },
    { data: "maturityRating" },
    {
      data: "isEbook",
      render: function (data, type, row) {
        return data === 1 || data === "1" || data === true || data === "true"
          ? "eBook"
          : "Physical";
      },
    },
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

// creates new user
const handleCreateNewUser = (username, email, password, coins) => {
  coins = parseInt(coins, 10);

  $.ajax({
    url: API_URL + "Users/createNewUser",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      Username: username,
      Email: email,
      Password: password,
      Coins: coins,
    }),
    success: function (response) {
      popupText("The user created succesfully");
    },
    error: function (xhr, status, error) {
      console.error("AJAX Request Failed:", {
        status: status,
        error: error,
        response: xhr.responseText,
      });
      if (xhr.responseJSON && xhr.responseJSON.error) {
        console.error("Server Error:", xhr.responseJSON.error);
      } else {
        console.error("An unexpected error occurred.");
      }
    },
  });
};

// creates new user
const handleCreateNewAuthor = (name, biography, wikiLink, pictureUrl) => {
  $.ajax({
    url: API_URL + "Author",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      Name: name,
      Biography: biography || "",
      WikiLink: wikiLink || "",
      PictureUrl: pictureUrl || "",
    }),
    success: function (response) {
      popupText("The user created succesfully");
    },
    error: function (xhr, status, error) {
      console.error("AJAX Request Failed:", {
        status: status,
        error: error,
        response: xhr.responseText,
      });
      if (xhr.responseJSON && xhr.responseJSON.error) {
        console.error("Server Error:", xhr.responseJSON.error);
      } else {
        console.error("An unexpected error occurred.");
      }
    },
  });
};
