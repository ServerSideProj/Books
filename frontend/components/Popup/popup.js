//
const popupLogin = () => {
  const popup = `
        <div id="popup-login" class="popup-container gap-2">
          <img src="../../assets/icons/X.svg" class="btn-x" />
          <p class="xxl-text">You're not connected</p>
          <div class="container-flex-col center gap-1">
            <a
              href="/pages/signup"
              class="btn btn-gradient btn-signup-nav md-text"
              >Sign up</a
            >
            <a href="/pages/login" class="sm-text">Login</a>
          </div>
        </div>`;

  $(".bg-dark").append(popup);
  $(".bg-dark").addClass("open");
  $("#popup-login").addClass("open");

  // Remove previous event listeners
  $(".btn-x").off("click");

  // Add event listener to the "btn-x" to close the nav slide
  $(".btn-x").on("click", () => {
    $("#popup-login").removeClass("open");
  });
};

// type can be: following (Following) | followers (remove)
const popupFriends = (type) => {
  const popup = `
   <div class="popup-container gap-2">
        <img src="../../assets/icons/X.svg" class="btn-x" />
        <div class="container-flex-col gap-03 center">
          <p class="xl-text">
            <span id="num-of-follow">0</span>
            <span id="popup-type">Followers</span>
          </p>
          <div class="search-container">
            <input type="text" placeholder="Name of user" />
            <img src="../../assets/icons/search-icon.svg" alt="search-icon" />
          </div>
        </div>
        <div class="container-users-friends">
<!----------------------- structure of a friend card - needed to be gererate according to friends amount----------------------->
          <div class="container-friend">
            <div class="friend-wrapper">
              <img
                src="../../assets/images/user-profile-image.svg"
                alt="profile image"
                class="friend-profile-img"
              />
              <p class="friend-name">username</p>
            </div>
            <div class="btn xsm-text btn-follow">Following</div>
          </div>
        </div>
      </div>`;

  $(".bg-dark").addClass("open");
  $(".bg-dark").append(popup);
  $("#popup-login").addClass("open");

  // Remove previous event listeners
  $(".btn-x").off("click");

  // Add event listener to the "btn-x" to close the nav slide
  $(".btn-x").on("click", () => {
    $(".popup-container").removeClass("open");
  });
};

//
const popupFilters = () => {
  const popup = ``;

  $(".bg-dark").addClass("open");
  $(".bg-dark").append(popup);
  $("#popup-Filters").addClass("open");

  // Remove previous event listeners
  $(".btn-x").off("click");

  // Add event listener to the "btn-x" to close the nav slide
  $(".btn-x").on("click", () => {
    $(".popup-container").removeClass("open");
  });
};

//
const popupBookIfo = () => {
  const popup = ``;

  $(".bg-dark").addClass("open");
  $(".bg-dark").append(popup);
  $("#popup-book-info").addClass("open");

  // Remove previous event listeners
  $(".btn-x").off("click");

  // Add event listener to the "btn-x" to close the nav slide
  $(".btn-x").on("click", () => {
    $(".popup-container").removeClass("open");
  });
};

//
const popupBookSale = () => {
  const popup = ``;

  $(".bg-dark").addClass("open");
  $(".bg-dark").append(popup);
  $("#popup-book-sale").addClass("open");

  // Remove previous event listeners
  $(".btn-x").off("click");

  // Add event listener to the "btn-x" to close the nav slide
  $(".btn-x").on("click", () => {
    $(".popup-container").removeClass("open");
  });
};
