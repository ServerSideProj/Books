const isLoggedIn = localStorage.getItem("authToken") !== null;
const allBooksUrl = "Book/all-active-books";
const allFriendsUrl = "Users/Following/";

var arrAllBooks = []; // all the books that available
var currBooksDisplay = []; // the books that on the display
var allCategories = [];
var allAuthors = [];
var allFriends = [];

var activeFilters = {
  rate: 0,
  releaseDate: "newest to oldest",
  bookType: "both",
  category: null,
  author: null,
  friend: null,
  priceRange: { min: 0, max: 50 },
  searchText: "",
  priceSort: "low-to-high",
};

$(document).ready(function () {
  $("#loader").show();
  $(".main").hide();

  // get all books
  fetchData(API_URL + allBooksUrl, initializePage, onError);

  if (isLoggedIn) {
    //get all Friends
    fetchData(
      API_URL + allFriendsUrl + localStorage.getItem("email"),
      getAllFriends,
      onError
    );
  }

  // Event handler for price range inputs
  $("input[type='number']").on("input", sortByPriceRange);

  $(".price-filter").on("click", function () {
    $(".price-filter > img").toggleClass("open");
    $(".sm-popup").toggleClass("open");
  });

  $("#search-input").on("input", function () {
    const searchText = $(this).val().toLowerCase();
    filterBooksByText(searchText);
  });

  // Event handler for filter price
  $(".sm-popup p").on("click", function () {
    $(".sm-popup p").removeClass("selected");
    $(this).addClass("selected");
    $(".price-filter p").html(this.outerText);

    const filter = $(this).data("price-filter");
    sortByPrice(filter);
  });

  $("#more-filters").on("click", popupFilters);
  $("#more-filters").on("click", initializePopupFilters);
});

// initialize the books only for the first time running.
const initializePage = (books) => {
  $("#loader").hide();
  $(".main").show();
  arrAllBooks = books;
  getAllCategories();
  getAllAuthors();
  renderBooks(books);
  console.log(books);
};

// Render books on screen
const renderBooks = (books) => {
  currBooksDisplay = books;

  // Update the number of books displayed
  $("#num-books").text(books.length);

  const bookstore = $(".books-container");
  bookstore.empty();

  books.forEach((book) => {
    const bookCardHtml = generateBookCard_allDetails(book); // Get the HTML string
    const $bookCard = $(bookCardHtml);

    // Add click event listener to the book card
    $bookCard.click(() => {
      const bookUrl = `/pages/Book/index.html?id=${book.id}`;
      window.location.href = bookUrl;
    });

    // add listener to the like btn (and prevent from going to the page of the book)
    $bookCard.find(".like-btn").on("click", function (event) {
      event.stopPropagation();
      if (isLoggedIn) {
        $(this).toggleClass("liked");
        //
        //
        // TODO:
        // add to favorites in database
        //
        //
      } else {
        popupLogin();
      }
    });

    // add listener to the add to cart btn (and prevent from going to the page of the book)
    $bookCard.find(".add-to-cart").on("click", function (event) {
      event.stopPropagation();
      if (isLoggedIn) {
        addToCart(event.target.getAttribute("data-book-id"));
      } else {
        popupLogin();
      }
    });

    bookstore.append($bookCard);
  });
};

// Get all the categories from the books
const getAllCategories = () => {
  arrAllBooks.forEach((book) => {
    if (book.categories && Array.isArray(book.categories)) {
      book.categories.forEach((category) => {
        if (!allCategories.includes(category)) {
          allCategories.push(category);
        }
      });
    }
  });
};

// Get all the authors from the books
const getAllAuthors = () => {
  arrAllBooks.forEach((book) => {
    if (book.authors && Array.isArray(book.authors)) {
      book.authors.forEach((author) => {
        if (!allAuthors.includes(author.name)) {
          allAuthors.push(author.name);
        }
      });
    }
  });
};

// Get all friends (follows) from the user data
const getAllFriends = (friends) => {
  allFriends = friends;
  if (friends.length > 0) {
    friends.forEach((friend) => {
      if (!allFriends.includes(friend.username)) {
        allFriends.push(friend.username);
      }
    });
  }
};

const initializePopupFilters = () => {
  // Populate the datalists with the current options
  const datalistC = $("#categories");
  datalistC.empty();
  allCategories.forEach((category) => {
    datalistC.append(`<option value="${category}">`);
  });

  const datalistA = $("#authors");
  datalistA.empty();
  allAuthors.forEach((author) => {
    datalistA.append(`<option value="${author}">`);
  });

  const datalistF = $("#friends");
  datalistF.empty();
  if (allFriends.length === 0) {
    $("#friends-input").parent().css("background-color", "var(--grey-light)");
    $("#friends-input").attr("placeholder", "Have no friends yet.");
    $("#friends-input").css("pointer-events", "none");
  }
  allFriends.forEach((friend) => {
    datalistF.append(`<option value="${friend}">`);
  });

  // Set the current selected rate filter
  $(".container-options[data-stars] .opt").each(function () {
    const stars = $(this).data("stars");
    if (stars === activeFilters.rate) {
      $(this).addClass("selected");
      $(this)
        .find("img")
        .attr("src", function () {
          return $(this)
            .attr("src")
            .replace("circle.svg", "circle-checked.svg");
        });
    } else {
      $(this).removeClass("selected");
      $(this)
        .find("img")
        .attr("src", function () {
          return $(this)
            .attr("src")
            .replace("circle-checked.svg", "circle.svg");
        });
    }
  });

  // Set the current selected release date filter
  $(".container-options[data-date] .opt").each(function () {
    const date = $(this).data("date");
    if (date === activeFilters.releaseDate) {
      $(this).addClass("selected");
      $(this)
        .find("img")
        .attr("src", function () {
          return $(this)
            .attr("src")
            .replace("circle.svg", "circle-checked.svg");
        });
    } else {
      $(this).removeClass("selected");
      $(this)
        .find("img")
        .attr("src", function () {
          return $(this)
            .attr("src")
            .replace("circle-checked.svg", "circle.svg");
        });
    }
  });

  // Set the current selected book type filter
  $(".container-options[data-type] .opt").each(function () {
    const type = $(this).data("type");
    if (type === activeFilters.bookType) {
      $(this).addClass("selected");
      $(this)
        .find("img")
        .attr("src", function () {
          return $(this)
            .attr("src")
            .replace("circle.svg", "circle-checked.svg");
        });
    } else {
      $(this).removeClass("selected");
      $(this)
        .find("img")
        .attr("src", function () {
          return $(this)
            .attr("src")
            .replace("circle-checked.svg", "circle.svg");
        });
    }
  });

  // Set the current selected category filter
  $("#category-input").val(activeFilters.category || "");

  // Set the current selected author filter
  $("#author-input").val(activeFilters.author || "");

  // Set the current selected friend filter
  $("#friends-input").val(activeFilters.friend || "");

  $(".select-btn").off("click");
  $(".clear-btn").off("click");
  $(".container-options .opt").off("click");

  // Event handlers for selecting options
  $(".container-options[data-stars] .opt").on("click", filterRate);
  $(".container-options[data-date] .opt").on("click", filterDate);
  $(".container-options[data-type] .opt").on("click", filterType);

  // Event handler for the Select button
  $(".select-btn").on("click", function () {
    const selectedData = collectFilterData();
    activeFilters = { ...activeFilters, ...selectedData }; // Update activeFilters with the selected data
    $(".select-btn").off("click");
    $(".bg-dark").empty();
    $(".bg-dark").removeClass("open");
    console.log(activeFilters);
    applyAllFilters();
  });

  // Event handler for the Clear button
  $(".clear-btn").on("click", function () {
    activeFilters = {
      rate: 0,
      releaseDate: "newest to oldest",
      bookType: "both",
      category: null,
      author: null,
      friend: null,
      priceRange: { min: 0, max: 50 },
      searchText: "",
      priceSort: "low-to-high",
    };
    initializePopupFilters(); // Reinitialize the filters to the default state
  });
};
