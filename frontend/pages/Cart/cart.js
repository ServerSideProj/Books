var items = [];

$(document).ready(function () {
  $("#loader").show();
  $(".main").hide();

  const itemsId = JSON.parse(localStorage.getItem("cartItems")) || [];
  if (itemsId.length === 0) {
    noItems();
  } else {
    getAllItems(itemsId);
    $("#buy-books-btn").on("click", payment);
  }
});

// Fetch all items from the server using the IDs
const getAllItems = (itemsId) => {
  itemsId.forEach((bookId) => {
    if (bookId) {
      const BookIdUrl = `${API_URL}Book/${String(bookId)}`;
      fetchData(BookIdUrl, gotBook, onError);
    }
  });
};

// Add the fetched book to the items array and render the updated list
const gotBook = (book) => {
  $("#loader").hide();
  $(".main").show();
  items.push(book);
  renderItems(items);
};

// Remove item from the list, update the display, and local storage
const removeItem = (bookId) => {
  items = items.filter((book) => String(book.id) !== String(bookId));
  localStorage.setItem(
    "cartItems",
    JSON.stringify(items.map((book) => String(book.id)))
  );
  renderItems(items);
};

// Show items (books) on the display screen
const renderItems = (books) => {
  const bookContainer = $(".container-cart-books");
  bookContainer.empty();

  books.forEach((book) => {
    const bookHtml = `
    <div class="book-list">
      <div class="container-flex gap-1 center-hor book-details">
        <img
          src="${
            book.imageLink || "../../assets/images/book-cover-placeholder.png"
          }"
          alt=""
          class="book-cover"
        />
        <div>
          <div class="title md-text">${book.title}</div>
          <div class="author sm-text">${book.authors
            .map((author) => author.name)
            .join(", ")}</div>
        </div>
      </div>
      <div class="type purple-text font-reg">
        ${book.isEbook ? "eBook" : "Physical"}
      </div>
      <div class="language purple-text font-reg">${
        book.language || "English"
      }</div>
      <div class="price">$${book.price.toFixed(2)}</div>
      <div class="actions">
        <img
          src="../../assets/icons/trash-icon.svg"
          alt="trash-icon"
          class="btn delete"
          data-book-id="${book.id}"
        />
      </div>
    </div>
    `;

    bookContainer.append(bookHtml);
  });

  // Attach event listeners to the delete buttons
  $(".delete").on("click", function () {
    const bookId = $(this).data("book-id");
    const audio = new Audio("../../assets/sounds/whoosh-delete.mp3");
    audio.play();
    removeItem(bookId);
  });

  updateStats(); // Update stats after rendering items
};

// Update the total number of books and total price
const updateStats = () => {
  const totalBooks = items.length;
  const totalPrice = items
    .reduce((sum, book) => sum + book.price, 0)
    .toFixed(2);

  $("#amount").text(totalBooks);
  $("#ttl-price").text(`$${totalPrice}`);
};

// there is no books in the cart
const noItems = () => {
  $("#loader").hide();
  $(".main").show();
  updateStats();
  const bookContainer = $(".container-cart-books");
  bookContainer.empty();
  bookContainer.append(
    '<p class="text-center margin-top-4">No books yet in the cart</p>'
  );
  $("#buy-books-btn").css("opacity", "0.3");
};

const payment = () => {
  // Iterate through all items in the cart and send them to the server
  items.forEach((book) => {
    const bookcopy = {
      BookId: book.id,
      OwnerEmail: localStorage.getItem("email"),
    };

    // Determine whether to send to "add-ebook-copy" or "add-physbook-copy"
    if (book.isEbook) {
      sendData(
        `${API_URL}Book/add-ebook-copy`,
        bookcopy,
        (response) => {
          console.log("Ebook copy added successfully:", response.CopyId);
        },
        (error) => {
          console.error("Error adding ebook copy:", error);
        }
      );
    } else {
      sendData(
        `${API_URL}Book/add-physbook-copy`,
        bookcopy,
        (response) => {
          console.log(
            "Physical book copy added successfully:",
            response.CopyId
          );
        },
        (error) => {
          console.error("Error adding physical book copy:", error);
        }
      );
    }
  });

  // Remove all items from local storage cart list
  localStorage.removeItem("cartItems");

  // Clear the items array and re-render the cart
  items = [];
  noItems();

  popupPayment();

  // Play the payment sound effect
  const audio = new Audio("../../assets/sounds/payment.mp3");
  audio.play();

  var end = Date.now() + 2 * 1000;

  // go Buckeyes!
  var colors = ["#f764cc", "#f7f7f7"];

  // conffeti animation!
  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};
