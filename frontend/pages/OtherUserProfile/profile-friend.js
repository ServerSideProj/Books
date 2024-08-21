const userEmail = sessionStorage.getItem("friendEmail");
const ownerEmail = localStorage.getItem("email");
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
    API_URL + "Users/username/" + encodeURIComponent(userEmail),
    (res) => {
      $("#username").text(res.username);
      $(".user-photo").attr("src", IMAGE_URL + res.profileImageLink);
    },
    onError
  );

  checkFriendshipStatus();

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
    var newSrc;
    var isAddingFriend;

    // Determine whether the user is adding or removing a friend based on the current icon
    if (currentSrc === "../../assets/icons/Add user.svg") {
      newSrc = "../../assets/icons/User remove.svg";
      isAddingFriend = true; // Adding friend
    } else {
      newSrc = "../../assets/icons/Add user.svg";
      isAddingFriend = false; // Removing friend
    }

    // Update the icon immediately
    $(this).attr("src", newSrc);

    var url = isAddingFriend
      ? `${API_URL}Users/add-friend`
      : `${API_URL}Users/remove-friend`;

    // Prepare the data to send to the server
    var data = {
      FollowerEmail: ownerEmail,
      FollowedAfter: userEmail,
    };

    // Send the request to add or remove the friend
    $.ajax({
      url: url,
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (response) {
        isAddingFriend
          ? popupText("Nice having new friends!")
          : console.log("Friend removed successfully.");
      },
      error: function (error) {
        console.error("Error updating friend status:", error);
        // Optionally, revert the icon change if the server request fails
        $(this).attr("src", currentSrc); // Revert icon back to original
      },
    });
  });
});

// initialiize all users books in array
const firstFetchBooks = (books) => {
  userAllBooks = [...books];
  renderBooks(userAllBooks);
};

// render books on the screen
const renderBooks = (books) => {
  $("#num-books").text("(" + books.length + ")");

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

const checkFriendshipStatus = () => {
  const data = {
    FollowerEmail: ownerEmail,
    FollowedAfter: userEmail,
  };

  $.ajax({
    url: `${API_URL}Users/check-friendship-status`,
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(data),
    success: function (response) {
      if (response.isFriend) {
        // They are friends, so show the "Remove friend" icon
        $(".add-friend").attr("src", "../../assets/icons/User remove.svg");
      } else {
        // They are not friends, so show the "Add friend" icon
        $(".add-friend").attr("src", "../../assets/icons/Add user.svg");
      }
    },
    error: function (error) {
      console.error("Error checking friendship status:", error);
    },
  });
};
