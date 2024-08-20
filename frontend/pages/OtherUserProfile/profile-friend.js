const userEmail = sessionStorage.getItem("friendEmail");
var userAllBooks = [];
var filteredBooks = [];

$(document).ready(function () {
  console.log(userEmail);
  // fetch all books of user
  fetchData(
    API_URL + "Book/user-purchases/" + encodeURIComponent(userEmail),
    firstFetchBooks,
    onError
  );

  fetchData(
    API_URL + "User/username" + encodeURIComponent(userEmail),
    (res) => {
      $("#username").text(res.username);
    },
    onError
  );

  $(".oval-btn").click(function () {
    // Remove 'selected' class from all buttons
    $(".oval-btn").removeClass("selected");

    if ($(this)[0].id === "for-sale") {
      filteredBooks = userAllBooks.filter((book) => {
        return book.isForSale;
      });
      renderBooks(filteredBooks);
    } else if ($(this)[0].id === "not-sale") {
      filteredBooks = userAllBooks.filter((book) => {
        return !book.isForSale;
      });
      renderBooks(filteredBooks);
    } else {
      renderBooks(userAllBooks);
    }

    // Add 'selected' class to the clicked button
    $(this).addClass("selected");
  });

  // add/remove friend
  $(".add-friend").click(function () {
    var currentSrc = $(this).attr("src");
    // change the add friend to remove friend (and back) on user click.
    var newSrc =
      currentSrc === "../../assets/icons/Add user.svg"
        ? "../../assets/icons/User remove.svg"
        : "../../assets/icons/Add user.svg";
    $(this).attr("src", newSrc);

    // server here
  });
});

// initialiize all users books in array
const firstFetchBooks = (books) => {
  userAllBooks = [...books];
  renderBooks(userAllBooks);
};

// render books on the screen
const renderBooks = (books) => {
  console.log(books);

  const userBooks = $(".inner-page-books");
  userBooks.empty();

  books.forEach((book) => {
    const bookCardHtml = generateBookCard_default(book);
    const $bookCard = $(bookCardHtml);
    userBooks.append($bookCard);

    // Add the "for sale" strip if the book is for sale
    if (book.isForSale) {
      let forSale = addForSale("sale");
      $bookCard.append(forSale);
    } else {
      $bookCard.css("pointer-events", "none");
    }

    // Add click event listener to the book card
    $bookCard.on("click", () => {
      popupBookSaleOffer(book);
    });
  });
};
