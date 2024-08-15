const isLoggedIn = localStorage.getItem("authToken") !== null;

var allUserBooks = [];

$(document).ready(function () {
  if (isLoggedIn) {
    const email = localStorage.getItem("email");
    // get all books of user
    fetchData(
      API_URL + "Book/user-purchases/" + encodeURIComponent(email),
      gotUserBooks,
      onError
    );
  }
});

// Fetch all the books the user purchased before
const gotUserBooks = (books) => {
  allUserBooks = [...books];
};

// Add this book to the cart
const addToCart = (bookId) => {
  // Get the existing cart items from localStorage
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Check if the book is already in the user's purchases
  const bookAlreadyPurchased = allUserBooks.some((book) => book.id == bookId);

  if (bookAlreadyPurchased) {
    // If the book is already purchased by the user
    const audio = new Audio("../../assets/sounds/cant-do.mp3");
    audio.play();
    popupAlreadyPurchased(); // Display a message or take action for already purchased book
    return;
  }

  // Check if the book is already in the cart
  const bookAlreadyInCart = cartItems.includes(bookId);

  if (bookAlreadyInCart) {
    // the book is already in the cart
    const audio = new Audio("../../assets/sounds/cant-do.mp3");
    audio.play();
    popupAlreadyOnCart();
    // alert("This book is already in your cart");
  } else {
    // add to cart
    cartItems.push(bookId);
    // Save the updated cart array back to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log("Item added to cart:", cartItems);

    // Add sound effect
    const audio = new Audio("../../assets/sounds/add-to-cart.mp3");
    audio.play();
    $(".cart-icon").addClass("add");

    setTimeout(function () {
      $(".cart-icon").removeClass("add");
    }, 2000);

    // animation of adding to cart
    $(".top-popup")
      .css("opacity", 0)
      .slideDown("slow")
      .animate({ opacity: 1 }, { queue: false, duration: "slow" });
    setTimeout(function () {
      $(".top-popup")
        .css("opacity", 1)
        .slideDown("slow")
        .animate({ opacity: 0 }, { queue: false, duration: "slow" });
    }, 3000);
  }
};
