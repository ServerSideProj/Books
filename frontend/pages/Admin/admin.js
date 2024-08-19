const API_ALL_BOOKS = "Book/get-all-books-admin";
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

  // get amount of books in db
  fetchData(
    API_URL + "Book/total-books-count",
    (res) => {
      if (res && res.totalBooks !== undefined) {
        $("#total-books").text(res.totalBooks);
      } else {
        console.error("Unexpected response format:", res);
      }
    },
    onError
  );

  // Get amount of authors in db
  fetchData(
    API_URL + "Author/total-authors-count",
    (res) => {
      if (res && res.totalAuthors !== undefined) {
        $("#total-authors").text(res.totalAuthors);
      } else {
        console.error("Unexpected response format:", res);
      }
    },
    onError
  );

  //get amount of users in db
  // Get amount of users in db
  fetchData(
    API_URL + "Users/total-users-count",
    (res) => {
      if (res && res.totalUsers !== undefined) {
        $("#total-users").text(res.totalUsers);
      } else {
        console.error("Unexpected response format:", res);
      }
    },
    onError
  );
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
    { data: "title", render: renderEditableField },
    { data: "language", render: renderEditableField },
    { data: "avgRating" },
    { data: "ratingCount" },
    { data: "PurchaseCount" },
    {
      data: "isEbook",
      render: function (data) {
        return data === 1 || data === "1" || data === true || data === "true"
          ? "eBook"
          : "Physical";
      },
    },
    {
      data: "active",
      render: function (data) {
        return `<input type="checkbox" disabled ${
          data === true || data === 1 || data === "1" ? "checked" : ""
        }>`;
      },
    },
    {
      data: null,
      render: function (data, type, row) {
        return `<div class="btn edit-books-btn" data-id="${row.id}">Edit</div>`;
      },
    },
  ]);

  // Use delegated event handling
  $("#booksTable tbody").on("click", ".edit-books-btn", function () {
    const btn = $(this);
    btn.addClass("done");
    const row = btn.closest("tr");

    if (btn.text() === "Edit") {
      btn.text("Done");

      // Enable the editable fields
      row.find(".editable-field").prop("disabled", false);

      // Make the checkbox clickable (if needed)
      row.find("input[type='checkbox']").prop("disabled", false);
    } else {
      // Change button text back to "Edit"
      btn.text("Edit");

      // Disable the fields again
      row.find(".editable-field").prop("disabled", true);
      row.find("input[type='checkbox']").prop("disabled", true);

      // Collect updated data
      const updatedData = {
        id: row.find(".edit-books-btn").data("id"),
        title: row.find(".editable-field").eq(0).val(),
        language: row.find(".editable-field").eq(1).val(),
        active: row.find("input[type='checkbox']").is(":checked"),
      };

      // Send the updated data to the server
      $.ajax({
        url: API_URL + "Book/update-book-admin",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(updatedData),
        success: function (response) {
          console.log("Book updated successfully:", response);
          // Optionally reload the table data
          btn.removeClass("done");
          $("#booksTable").DataTable().ajax.reload();
        },
        error: function (xhr, status, error) {
          console.error("Error updating book:", error);
        },
      });
    }
  });
};

// Function to render editable fields
const renderEditableField = (data) => {
  return `<input type="text" value="${data}" disabled class="editable-field">`;
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
