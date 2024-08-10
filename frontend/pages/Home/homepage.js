const isLoggedIn = localStorage.getItem("authToken") !== null;

const topEbooksUrl = "Book/popular-digital-books"; // URL to fetch the top 5 ebooks
const topPhysBooksUrl = "Book/popular-physical-books"; // URL to fetch the top 5 ebooks
const allAuthorsUrl = "Author/all-authors";

$(document).ready(function () {
  getTopPhysical();
  getTopEBooks();

  getAuthors();
});

const getTopEBooks = () => {
  // get the top ebooks from server
  fetchData(API_URL + topEbooksUrl, topEBooksFetchSuccess, onError);
};

const getTopPhysical = () => {
  // get the top physical books from server
  fetchData(API_URL + topPhysBooksUrl, topPhysFetchSuccess, onError);
};

// get the top ebooks from server
const topEBooksFetchSuccess = (response) => {
  const topEbooksContainer = $("#top-ebooks");
  topEbooksContainer.empty(); // Clear previous content

  // Iterate through the response to get the top 5 ebooks
  response.slice(0, 5).forEach((book) => {
    const bookCardHtml = generateBookCard_default(book); // Get the HTML string
    const $bookCard = $(bookCardHtml); // Convert to jQuery object

    // Add click event listener to the book card
    $bookCard.click(() => {
      window.location.href = `/pages/Book?id=${book.id}`;
    });

    topEbooksContainer.append($bookCard);
  });
};

// get the top physical books from server
const topPhysFetchSuccess = (response) => {
  const topPhysContainer = $("#top-physicals");
  topPhysContainer.empty(); // Clear previous content

  // Iterate through the response to get the top 5 physical books
  response.slice(0, 5).forEach((book) => {
    const bookCardHtml = generateBookCard_default(book); // Get the HTML string
    const $bookCard = $(bookCardHtml); // Convert HTML string to jQuery object

    // Add click event listener to the book card
    $bookCard.click(() => {
      window.location.href = `/pages/Book?id=${book.id}`;
    });

    topPhysContainer.append($bookCard);
  });
};
const getAuthors = () => {
  fetchData(API_URL + "Author/authors-with-book-count", gotAllAuthors, onError);
};

const gotAllAuthors = (response) => {
  const data = response;
  generateCards(data);
};
