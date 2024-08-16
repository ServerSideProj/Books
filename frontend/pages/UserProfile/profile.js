const isLoggedIn = localStorage.getItem("authToken") !== null;
var innerPage = "all-books";
var allUserBooks = [];
var likedBooks = [];

$(document).ready(function () {
  if (!isLoggedIn) {
    window.location.href = "/pages/NotFound/";
    return;
  }

  // Fetch the user's purchased books first
  const email = localStorage.getItem("email");
  fetchData(
    API_URL + "Book/user-purchases/" + encodeURIComponent(email),
    firstFetchBooks,
    onError
  );

  // Check for the 'section' query parameter in the URL
  const urlParams = new URLSearchParams(window.location.search);
  const section = urlParams.get("section");

  // Fetch all liked books
  const likedBooksUrl = `${API_URL}Book/get-liked-books?userEmail=${encodeURIComponent(
    email
  )}`;
  fetchData(
    likedBooksUrl,
    function (books) {
      likedBooks = books;
      if (section === "liked") {
        const likedOption = $("#liked");
        changeInnerPage(likedOption[0]); // Navigate to liked section if specified
      } else {
        changeInnerPage($("#all-books")[0]); // Default to all-books if not specified
      }
    },
    onError
  );

  const profileImageLink = localStorage
    .getItem("profileImageLink")
    .endsWith("/Images/")
    ? "../../assets/images/user-profile-image.svg"
    : localStorage.getItem("profileImageLink");
  $(".user-photo").attr("src", profileImageLink);

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
  innerPage = opt.id;
  renderCurrentPage();
};

// Centralized function to render the current page based on `innerPage`
const renderCurrentPage = () => {
  if (innerPage === "all-books") {
    renderBooks(allUserBooks);
  } else if (innerPage === "read") {
    const finishedBooks = allUserBooks.filter((book) => book.finishedReading);
    renderBooks(finishedBooks);
  } else if (innerPage === "liked") {
    renderBooks(likedBooks);
    $(".book-card").css("pointer-events", "none");
  }
};

// Change the profile image function
const changeProfile = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      $(".user-photo").attr("src", event.target.result);
      saveProfileImage(file); // Save the image to the server
    };
    reader.readAsDataURL(file);
  }
};

// Function to save the profile image to the server
const saveProfileImage = (file) => {
  const email = localStorage.getItem("email");
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
      $(".user-photo").attr("src", IMAGE_URL + response.imageName);
      localStorage.setItem("profileImageLink", IMAGE_URL + response.imageName);
    },
    error: function (status, error) {
      console.log("Upload failed:", status, error);
    },
  });
};

const firstFetchBooks = (books) => {
  allUserBooks = [...books];
  renderCurrentPage();
};

// Function to render books in the "My Books" section
const renderBooks = (books) => {
  const ownedBooks = $(".inner-page-books");
  ownedBooks.empty();

  books.forEach((book) => {
    const bookCardHtml = generateBookCard_default(book);
    const $bookCard = $(bookCardHtml);
    ownedBooks.append($bookCard);

    // Add the "done" bookmark if the book is finished
    if (book.finishedReading) {
      let bookmark = createBookmark("done");
      $bookCard.append(bookmark);
    }

    // Add the "sale" bookmark if the book is for sale
    if (book.isForSale) {
      let bookmark = createBookmark("sale");
      $bookCard.append(bookmark);
    }

    // Add click event listener to the book card
    $bookCard.on("click", () => {
      popupBookInfo(book);
    });
  });
};

// Success function for updating the finished reading status
const isFinishedReading = (data, response) => {
  // Update the relevant book in the array
  const bookIndex = allUserBooks.findIndex((book) => book.id === data.bookId);
  if (bookIndex !== -1) {
    allUserBooks[bookIndex].finishedReading = data.finishedReading;
  }

  renderCurrentPage();
};

// Success function for updating the sale status
const isForSaleStatus = (data, response) => {
  // Update the relevant book in the array
  const bookIndex = allUserBooks.findIndex((book) => book.id === data.bookId);
  if (bookIndex !== -1) {
    allUserBooks[bookIndex].isForSale = data.isForSale;
  }
  renderCurrentPage();
};
