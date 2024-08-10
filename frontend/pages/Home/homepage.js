const isLoggedIn = localStorage.getItem("authToken") !== null;

const topEbooksUrl = "Book/popular-digital-books"; // URL to fetch the top 5 ebooks
const topPhysBooksUrl = "Book/popular-physical-books"; // URL to fetch the top 5 ebooks
const allAuthorsUrl = "Author/all-authors";

$(document).ready(function () {
  getTopEBooks();
  getTopPhysical();

  getAuthors();
});

const getTopEBooks = () => {
  // get the top ebooks from server
  fetchData(API_URL + topEbooksUrl, topEBooksFetchSuccess, onError);

  for (let i = 0; i < 5; i++) {
    let card = generateBookCard(true);
    $("#top-ebooks").append(card);
  }
  $("#top-ebooks > *").each(function () {
    const likeBtn = $(this).find(".like-btn").get(0);
    $(likeBtn).on("click", function () {
      if (isLoggedIn) $(this).toggleClass("liked");
      else {
        popupLogin();
      }
    });
  });
};

const getTopPhysical = () => {
  // get the top physical books from server
  fetchData(API_URL + topPhysBooksUrl, topPhysFetchSuccess, onError);

  for (let i = 0; i < 5; i++) {
    let card = generateBookCard(true);
    $("#top-physicals").append(card);
  }
  $("#top-physicals > *").each(function () {
    const likeBtn = $(this).find(".like-btn").get(0);
    $(likeBtn).on("click", function () {
      if (isLoggedIn) $(this).toggleClass("liked");
      else {
        popupLogin();
      }
    });
  });
};

// get the top ebooks from server
const topEBooksFetchSuccess = (response) => {
  const topEbooksContainer = $("#top-ebooks");
  topEbooksContainer.empty(); // Clear previous content

  // Iterate through the response to get the top 5 ebooks
  response.slice(0, 5).forEach((book) => {
    const bookCard = generateBookCard_homepage(book);

    topEbooksContainer.append(bookCard);
  });

  // Attach event handlers for the like buttons
  topEbooksContainer.find(".like-btn").each(function () {
    $(this).on("click", function () {
      if (isLoggedIn) $(this).toggleClass("liked");
      else {
        popupLogin();
      }
    });
  });
};

// get the top physical books from server
const topPhysFetchSuccess = (response) => {
  const topPhysContainer = $("#top-physicals");
  topPhysContainer.empty(); // Clear previous content

  // Iterate through the response to get the top 5 ebooks
  response.slice(0, 5).forEach((book) => {
    const bookCard = generateBookCard_homepage(book);

    topPhysContainer.append(bookCard);
  });

  // Attach event handlers for the like buttons
  topPhysContainer.find(".like-btn").each(function () {
    $(this).on("click", function () {
      if (isLoggedIn) $(this).toggleClass("liked");
      else {
        popupLogin();
      }
    });
  });
};

const getAuthors = () => {
  fetchData(API_URL + 'Author/authors-with-book-count', gotAllAuthors, onError);
};


const gotAllAuthors = (response) => {
  const data = response;
  generatecards(data);
};

