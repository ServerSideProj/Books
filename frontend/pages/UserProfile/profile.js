const isLoggedIn = localStorage.getItem("authToken") !== null;

$(document).ready(function () {
  if (!isLoggedIn) window.location.href = "/pages/NotFound/";

  $(".inner-page-books, .inner-page-read, .inner-page-liked").hide();
  $(".inner-page-books").show();
  $("#all-books").addClass("checked");

  const profileImageLink = localStorage.getItem("profileImageLink");
  if (profileImageLink && profileImageLink !== "") {
    $(".user-photo").attr("src", profileImageLink);
  }

  // Fetch and render books when the page loads
  fetchBooks();

  // Change the inner page on option click
  $(".opt").click("click", (e) => changeInnerPage(e.target));

  // Trigger file input click on btn click
  $(".add-image-icon").click(function () {
    $("#file-input").click();
  });

  // Change profile image on file input change
  $("#file-input").change((e) => changeProfile(e));
});

// Change the inner page on option click
const changeInnerPage = (opt) => {
  $(".opt").removeClass("checked");
  $(opt).addClass("checked");

  $(".inner-page-books, .inner-page-read, .inner-page-liked").hide();

  // Show the relevant page based on the clicked option's id
  if (opt.id === "all-books") {
    $(".inner-page-books").show();
    fetchBooks(); // Re-fetch and render books when "My Books" is clicked
  } else if (opt.id === "read") {
    $(".inner-page-read").show();
    // Fetch and render read books if needed
  } else if (opt.id === "liked") {
    $(".inner-page-liked").show();
    // Fetch and render liked books if needed
  }
};

// Change the profile image function
const changeProfile = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      // Update the local profile image
      $(".user-photo").attr("src", event.target.result);

      // Now save the image to the server
      saveProfileImage(file);
    };
    reader.readAsDataURL(file);
  }
};

// Function to save the profile image to the server
const saveProfileImage = (file) => {
  const email = localStorage.getItem("email");

  // Create a FormData object
  const formData = new FormData();
  formData.append("file", file);
  formData.append("email", email);

  $.ajax({
    url: API_URL + "Users/UploadProfileImage",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      console.log("Upload successful!", response);
      console.log("Image Link: " + IMAGE_URL + response.imageName);
      $(".user-photo").attr("src", IMAGE_URL + response.imageName);
      localStorage.setItem("profileImageLink", IMAGE_URL + response.imageName);
    },
    error: function (status, error) {
      console.log("Upload failed:", status);
      console.log("Error:", error);
    },
  });
};

// Fetch and render books
const fetchBooks = () => {
  const email = localStorage.getItem("email");

  fetchData(
    API_URL + "Book/user-purchases/" + encodeURIComponent(email),
    renderBooks,
    onError
  );
};

// Function to render books in the "My Books" section
const renderBooks = (books) => {
  const ownedBooks = $(".inner-page-books");
  ownedBooks.empty();

  books.forEach((book) => {
    const bookCardHtml = generateBookCard_default(book);
    const $bookCard = $(bookCardHtml);
    ownedBooks.append($bookCard);

    // Add click event listener to the book card
    $bookCard.on("click", () => {
      popupBookInfo(book);
    });
  });
};
