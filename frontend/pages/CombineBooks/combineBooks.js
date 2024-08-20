var arrAllBooks = [];

$(document).ready(function () {
  $("#btn-mix").on("click", mixBooks);

  // Fetch all available books
  fetchData(API_URL + "Book/all-active-books", gotAllBooks, onError);

  // Event listeners for book selection
  $("#book1").on("change", function () {
    updateBookCard("#book-1", $(this).val());
  });

  $("#book2").on("change", function () {
    updateBookCard("#book-2", $(this).val());
  });
});

const mixBooks = () => {
  const book1 = $("#book1").val();
  const book2 = $("#book2").val();

  // Check if the user chose 2 books to combine
  if (!book1 || !book2) {
    popupText("You need to choose 2 books.");
  } else if (book1 === book2) {
    // Check if both selected books are the same
    popupText("You need to choose two different books.");
  } else {
    // Proceed with mixing the books
    console.log("Mixing books:", book1, book2);
    //
    //
    //
    // Add your code to send the selected books to the AI for mixing
    //
    //
    //
  }
};

const gotAllBooks = (books) => {
  arrAllBooks = books;

  // Populate the select options
  populateBookOptions("#book1");
  populateBookOptions("#book2");
};

// insert all books names to the select element
const populateBookOptions = (selectElementId) => {
  const $select = $(selectElementId);
  $select.empty();

  // Add a default "Please select a book" option
  $select.append('<option value="">Select a book</option>');

  // Append each book title as an option
  arrAllBooks.forEach((book) => {
    $select.append(`<option value="${book.id}">${book.title}</option>`);
  });
};

const updateBookCard = (cardSelector, bookId) => {
  const selectedBook = arrAllBooks.find((book) => book.id == bookId);

  if (selectedBook) {
    $(`${cardSelector} img`).attr(
      "src",
      selectedBook.imageLink || "../../assets/images/book-cover-placeholder.png"
    );
    $(`${cardSelector} #book-title`).text(selectedBook.title || "Title");
    $(`${cardSelector} #book-author`).text(
      selectedBook.authors.map((author) => author.name).join(", ") || "Authors"
    );
  } else {
    // If no book is selected or bookId is empty, reset to placeholder content
    $(`${cardSelector} img`).attr(
      "src",
      "../../assets/images/book-cover-placeholder.png"
    );
    $(`${cardSelector} #book-title`).text("Title");
    $(`${cardSelector} #book-author`).text("Authors");
  }
};
