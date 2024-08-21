import { logout } from "../../services/auth.js";
const MOBILE_WIDTH = 810;

$(document).ready(function () {
  function updateNavbar() {
    const isLoggedIn = localStorage.getItem("authToken") !== null;
    if (window.innerWidth <= MOBILE_WIDTH) {
      generateMobileNavbar(isLoggedIn);
    } else {
      generateDesktopNavbar(isLoggedIn);
    }
    checkForNotification();
    attachEventListeners();
  }

  // Initial check
  updateNavbar();

  // Update nav on resize
  $(window).resize(function () {
    updateNavbar();
  });
});

const attachEventListeners = () => {
  $(".search-nav-icon").on("click", searchForUsers);
  $(".logout").on("click", logout);
};

const generateDesktopNavbar = (isLoggedIn) => {
  if (isLoggedIn) {
    // Retrieve user details from localStorage
    const username = localStorage.getItem("authToken");

    if (username === "admin") {
      const adminNav = `<div class="navbar-desktop">
    <div class="container-full-space">
      <a href="../bookstore" class="sm-text">Bookstore</a>
      <img src="../../assets/icons/Search-pink.svg" alt="search" class="search-nav-icon icon">
    </div>
    <div class="logo-container">
      <a href="../home"
        ><img
          src="../../assets/logo/logo-nav.svg"
          alt="logo"
          class="logo-nav"
      /></a>
    </div>
    <div class="container-full-space right">
      <a href="../Admin"><p class="sm-text">Admin Page</p></a>
      <p class="sm-text">|</p>
      <a> <p class="sm-text logout">Log out</p></a>
    </div>
  </div>`;
      $(".navbar").html(adminNav);
    }
    // add nav log in
    else {
      const profileImageLink =
        localStorage.getItem("profileImageLink").endsWith("/Images/") ||
        localStorage.getItem("profileImageLink") == ""
          ? "../../assets/images/user-profile-image.svg"
          : localStorage.getItem("profileImageLink");
      const coins = localStorage.getItem("coins") || "0";

      const loggedInNav = `
      <div class="navbar-desktop">
        <div class="container-full-space">
           <a href="../Cart"><img src="../../assets/icons/Shopping cart.svg" alt="Shopping Cart" class="cart-icon icon"></a>
           <a href="../UserProfile/index.html?section=liked"><img src="../../assets/icons/heart.svg" alt="heart" class="heart-icon icon"></a>
           <img src="../../assets/icons/Search-pink.svg" alt="search" class="search-nav-icon icon">
          <a href="../bookstore" class="sm-text">Bookstore</a>
          <div class="container-flex">
          <a href="../notifications" class="sm-text">Notifications</a>
          <div class="notify-circle"></div>
          </div>
        </div>
        <div class="logo-container">
          <a href="../home"><img src="../../assets/logo/logo-nav.svg" alt="logo" class="logo-nav"></a>
        </div>
        <div class="container-full-space right">
          <p class="sm-text gradient-text" id="coins">${coins} coins</p>
          <a href='../userprofile'>
            <div class="container-gap-sm">
              <p class="sm-text username-nav">${username}</p>
              <img src="${profileImageLink}" alt="profile image" class="profile-image-sm">
            </div> 
          </a>
          <p class="sm-text">|</p>
          <a><p class="sm-text logout">Log out</p></a>
        </div>
      </div>
    `;
      $(".navbar").html(loggedInNav);
    }
  } else {
    const loggedOutNav = `
      <div class="navbar-desktop">
        <div class="container-full-space">
          <a href="../bookstore" class="sm-text">Bookstore</a>
        </div>
        <div class="logo-container">
          <a href="../home"><img src="../../assets/logo/logo-nav.svg" alt="logo" class="logo-nav"></a>
        </div>
        <div class="container-full-space right">
          <a href="../login" class="sm-text">Login</a>
          <a href="../signup" class="btn btn-gradient btn-signup-nav sm-text">Sign up</a>
        </div>
      </div>
    `;
    $(".navbar").html(loggedOutNav);
  }
};

// create navbar desktop - user is logged!
const generateMobileNavbar = (isLoggedIn) => {
  if (isLoggedIn) {
    // Retrieve user details from localStorage
    const username = localStorage.getItem("authToken");

    if (username === "admin") {
      const nav = `<div class="nav-mobile">
      <div class="logo-container">
      <a href="../home">
        <img src="../../assets/logo/logo-nav.svg" alt="logo" class="logo-nav" />
        </a>
      </div>
      <div class="container-flex align-items-start">
        <div class="hamburger-container">
          <img
            src="../../assets/icons/hamburger.svg"
            alt="hamburger"
            class="hamburger"
          />
        </div>
      </div>
    </div>`;
      const adminNav = `
      <div class="navbar-desktop">
    <div class="container-full-space">
      <a href="../bookstore" class="sm-text">Bookstore</a>
      <img src="../../assets/icons/Search-pink.svg" alt="search" class="search-nav-icon icon">
    </div>
    <div class="logo-container">
      <a href="../home"
        ><img
          src="../../assets/logo/logo-nav.svg"
          alt="logo"
          class="logo-nav"
      /></a>
    </div>
    <div class="container-full-space right">
      <a href="../Admin"><p class="sm-text">Admin Page</p></a>
      <p class="sm-text">|</p>
      <a> <p class="sm-text logout">Log out</p></a>
    </div>
  </div>`;
      $(".navbar").html(nav + adminNav);
    }
    // add nav log in
    else {
      const profileImageLink =
        localStorage.getItem("profileImageLink").endsWith("/Images/") ||
        localStorage.getItem("profileImageLink") == ""
          ? "../../assets/images/user-profile-image.svg"
          : localStorage.getItem("profileImageLink");
      const coins = localStorage.getItem("coins") || "0";

      const nav = `<div class="nav-mobile">
      <div class="logo-container">
      <a href="../home">
        <img src="../../assets/logo/logo-nav.svg" alt="logo" class="logo-nav" />
        </a>
      </div>
      <div class="container-flex align-items-start">
        <img src="../../assets/icons/Search-pink.svg" alt="search" class="search-nav-icon icon">
        <div class="hamburger-container">
          <img
            src="../../assets/icons/hamburger.svg"
            alt="hamburger"
            class="hamburger"
          />
        </div>
      </div>
    </div>`;
      const navSlideLogged = `<div class="nav-slide">
    <img src="../../assets/icons/X.svg" class="btn-x">
      <div class="container-flex-col">
        <div class="user-container-nav-slide">
          <img
            src="${profileImageLink}"
            alt="user-image"
            class="user-image-md"
          />
          <p class="l-text username-nav">${username}</p>
        </div>
        <div class="icons-container">
          <p class="sm-text bold md-text" id="coins">${coins} coins</p>
          <div class="container-gap-30">
            <a href="../UserProfile/index.html?section=liked"><img src="../../assets/icons/heart.svg" alt="heart" class="heart-icon icon"></a>
            <a href="../Cart"><img
              src="../../assets/icons/Shopping cart.svg"
              alt="Shopping Cart"
              class="cart-icon icon"
            /></a>
          </div>
        </div>
        <div class="container-nav-texts">
          <a href="../home" class="xl-text">Home</a>
          <a href="../bookstore" class="xl-text">Bookstore</a>
          <a href="../notifications" class="xl-text">Notifications</a>
          <a href="../profile" class="xl-text">Profile</a>
        </div>
      </div>
      <p class="logout md-text">Log out</p>
    </div>`;

      $(".navbar").html(nav + navSlideLogged);
    }
  } else {
    const nav = `<div class="nav-mobile">
    <div class="logo-container">
    <a href="../home">
      <img src="../../assets/logo/logo-nav.svg" alt="logo" class="logo-nav" />
      </a>
    </div>
    <div class="container-flex align-items-start">
        <img src="../../assets/icons/Search-pink.svg" alt="search" class="search-nav-icon icon">
        <div class="hamburger-container">
          <img
            src="../../assets/icons/hamburger.svg"
            alt="hamburger"
            class="hamburger"
          />
        </div>
      </div>
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
            <a href="../home" class="xl-text">Home</a>
            <a href="../bookstore" class="xl-text">Bookstore</a>
          </div>
        </div>
        <div class="container-flex-col center">
          <a href="../signup" class="btn btn-gradient btn-signup-nav md-text"
            >Sign up</a
          >
          <a href="../login" class="sm-text">Login</a>
        </div>
      </div>`;

    $(".navbar").html(nav + navSlideNotLogged);
  }

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

// add a little circle near to the "notification" in the nav in case the user have any notification.
const checkForNotification = () => {
  fetchData(
    API_URL +
      "Transaction/seller-transactions/" +
      localStorage.getItem("email"),
    (data) => {
      if (data.length > 0) $(".notify-circle").addClass("show");
      else $(".notify-circle").removeClass("show");
    },
    onError
  );
};
