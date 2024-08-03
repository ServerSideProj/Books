import { logout } from "../../services/auth.js";
const MOBILE_WIDTH = 768;

$(document).ready(function () {
  function updateNavbar() {
    const isLoggedIn = localStorage.getItem("authToken") !== null;
    if (window.innerWidth <= MOBILE_WIDTH) {
      generateMobileNavbar(isLoggedIn);
    } else {
      generateDesktopNavbar(isLoggedIn);
    }
  }

  // Initial check
  updateNavbar();

  // Update nav on resize
  $(window).resize(function () {
    updateNavbar();
  });

  $(".logout").on("click", logout);
});

// create a default navbaar desktop - user is not logged
const generateDesktopNavbar = (isLoggedIn) => {
  const loggedOutNav = `
    <div class="navbar-desktop">
        <div class="container-full-space">
            <a href="/pages/bookstore" class="sm-text">Bookstore</a>
        </div>
        <div class="logo-container">
            <a href="/pages/home"><img src="../../assets/logo/logo-nav.svg" alt="logo" class="logo-nav"></a>
        </div>
        <div class="container-full-space right">
            <a href="/pages/login" class="sm-text">Login</a>
            <a href="/pages/signup" class="btn btn-gradient btn-signup-nav sm-text">Sign up</a>
        </div>
    </div>
`;
  const loggedInNav = `
        <div class="navbar-desktop">
            <div class="container-full-space">
                <img src="../../assets/icons/Shopping cart.svg" alt="Shopping Cart" class="cart-icon icon">
                <img src="../../assets/icons/heart.svg" alt="heart" class="heart-icon icon">
                <a href="/pages/bookstore" class="sm-text">Bookstore</a>
                <a href="/pages/notifications" class="sm-text">Notifications</a>
            </div>
            <div class="logo-container">
                <img src="../../assets/logo/logo-nav.svg" alt="logo" class="logo-nav">
            </div>
            <div class="container-full-space right">
                <p class="sm-text gradient-text">
                    0 coins
                </p>
                <div class="container-gap-sm">
                    <p class="sm-text username-nav">username</p>
                    <img src="../../assets/images/user-profile-image.svg" alt="profile image" class="profile-image-sm">
                </div>
                <p class="sm-text">|</p>
                <p class="sm-text logout">Log out</p>
            </div>
        </div>
    `;
  $(".navbar").html(isLoggedIn ? loggedInNav : loggedOutNav);
};

// create navbar desktop - user is logged!
const generateMobileNavbar = (isLoggedIn) => {
  const nav = `<div class="nav-mobile">
      <div class="logo-container">
      <a href="/pages/home">
        <img src="../../assets/logo/logo-nav.svg" alt="logo" class="logo-nav" />
        </a>
      </div>
      <div class="hamburger-container">
        <img
          src="../../assets/icons/hamburger.svg"
          alt="hamburger"
          class="hamburger"
        />
      </div>
    </div>`;
  const navSlideLogged = `<div class="nav-slide">
    <img src="../../assets/icons/X.svg" class="btn-x">
      <div class="container-flex-col">
        <div class="user-container-nav-slide">
          <img
            src="../../assets/images/user-profile-image.svg"
            alt="user-image"
            class="user-image-md"
          />
          <p class="l-text username-nav">username</p>
        </div>
        <div class="icons-container">
          <p class="sm-text bold md-text">0 coins</p>
          <div class="container-gap-30">
            <img
              src="../../assets/icons/heart.svg"
              alt="heart"
              class="heart-icon icon"
            />
            <img
              src="../../assets/icons/Shopping cart.svg"
              alt="Shopping Cart"
              class="cart-icon icon"
            />
          </div>
        </div>
        <div class="container-nav-texts">
          <a href="/pages/home" class="xl-text">Home</a>
          <a href="/pages/bookstore" class="xl-text">Bookstore</a>
          <a href="/pages/notifications" class="xl-text">Notifications</a>
          <a href="/pages/profile" class="xl-text">Profile</a>
        </div>
      </div>
      <p class="logout md-text">Log out</p>
    </div>`;
  const navSlideNotLogged = `<div class="nav-slide">
  <img src="../../assets/icons/X.svg" class="btn-x">
      <div class="container-flex-col">
        <div class="user-container-nav-slide">
          <img
            src="../../assets/images/user-profile-image.svg"
            alt="user-image"
            class="user-image-md"
          />
          <p class="l-text username-nav">Not registered</p>
        </div>
        <div class="container-nav-texts">
          <a href="/pages/home" class="xl-text">Home</a>
          <a href="/pages/bookstore" class="xl-text">Bookstore</a>
        </div>
      </div>
      <div class="container-flex-col center">
        <a href="/pages/signup" class="btn btn-gradient btn-signup-nav md-text"
          >Sign up</a
        >
        <a href="/pages/login" class="sm-text">Login</a>
      </div>
    </div>`;

  $(".navbar").html(nav + (isLoggedIn ? navSlideLogged : navSlideNotLogged));

  // Remove previous event listeners
  $(".hamburger-container").off("click");
  $(".btn-x").off("click");

  // Add event listener to the hamburger to open the nav slide
  $(".hamburger-container").on("click", () => {
    $(".nav-slide").toggleClass("open");
  });

  // Add event listener to the "btn-x" to close the nav slide
  $(".btn-x").on("click", () => {
    $(".nav-slide").removeClass("open");
  });
};
