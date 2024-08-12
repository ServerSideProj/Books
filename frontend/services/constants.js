/////// לשנות את כל הערכים לפי הנתיבים הנכונים

// For home:
const PORT = "7136";
const API_URL = `https://localhost:${PORT}/api/`;

const FILE_URL = `https://localhost:${PORT}/api/FileUpload`;
const IMAGE_URL = `https://localhost:${PORT}/Images`;

// For Ruppin server
// export const COURSES_URL = `https://proj.ruppin.ac.il/cgroup80/test2/tar1/api/courses`;
// export const INSTRUCTORS_URL = `https://proj.ruppin.ac.il/cgroup80/test2/tar1/api/instructors`;
// export const USERS_URL = `https://proj.ruppin.ac.il/cgroup80/test2/tar1/api/Users`;
// export const FILE_URL = `https://proj.ruppin.ac.il/cgroup80/test2/tar1/api/FileUpload`;
// export const IMAGE_URL = `https://proj.ruppin.ac.il/cgroup80/test2/tar1/Images`;

//
//
// Global functions
//
//

// Add this book to the cart
const addToCart = (bookId) => {
  // Get the existing cart items from localStorage
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Check if the book is already in the cart
  const bookAlreadyInCart = cartItems.includes(bookId);

  if (bookAlreadyInCart) {
    // the book already in the cart
    alert("This book is already in your cart");
  } else {
    // add to cart
    cartItems.push(bookId);
    // Save the updated cart array back to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    console.log("Item added to cart:", cartItems);

    // Add sound effect
    const audio = new Audio("../../assets/sounds/add-to-cart.mp3");
    audio.play();

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
