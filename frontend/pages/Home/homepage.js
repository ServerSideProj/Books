const isLoggedIn = localStorage.getItem("authToken") !== null;

const topEbooksUrl = "Book/popular-digital-books"; // URL to fetch the top 5 ebooks

$(document).ready(function () {
  getTopEBooks();
  getTopPhysical();
});

const getTopEBooks = () => {
  // get the top ebooks from server
  fetchData(API_URL + topEbooksUrl, onFetchSuccess, onFetchError);

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

// Function to handle success response
function onFetchSuccess(response) {
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
}

// Function to handle error response
const onFetchError = (xhr, status, error) => {
  const topEbooksContainer = $("#top-ebooks");
  topEbooksContainer.html(`<p>Error fetching top ebooks: ${error}</p>`);
};
