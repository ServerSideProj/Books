// pages: bookstore, homepage (any time a user want to do an action that only sign in users can)
// show popup that requiqre the user to login or to create account.
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
    $(".bg-dark").empty();
    $(".bg-dark").removeClass("open");
  });
};

// page: user-profile, other-user-frofile
// type can be: following (Following) | followers (remove)
const popupFriends = (type) => {
  const popup = `
   <div id="popup-friends" class="popup-container gap-2">
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
            <div class="btn xsm-text btn-follow">${type}</div>
          </div>
        </div>
      </div>`;

  $(".bg-dark").addClass("open");
  $(".bg-dark").append(popup);
  $("#popup-friends").addClass("open");

  // Remove previous event listeners
  $(".btn-x").off("click");

  // Add event listener to the "btn-x" to close the nav slide
  $(".btn-x").on("click", () => {
    $(".bg-dark").empty();
    $(".bg-dark").removeClass("open");
  });
};

// page: bookstore
// show a popup of many options of filter the books on display.
const popupFilters = () => {
  const popup = `
  <div id="popup-filters" class="popup-container gap-02">
        <img src="../../assets/icons/X.svg" class="btn-x" />
        <p class="xxl-text bold">Filters</p>
        <div class="container-bot-border">
          <div class="wrapper-title-filter">
            <p class="xl-text">Category</p>
            <div class="search-container">
              <input type="text" placeholder="category..." />
              <img src="../../assets/icons/search-icon.svg" alt="search-icon" />
            </div>
          </div>

          <div class="container-options">
            <!-- לבנות דרך הקוד, ולשים לב לא לשכוח להוסיף לכל קומפוננטה את הדאטה סט כאטריביוט -->
          </div>
        </div>
        <div class="container-bot-border">
          <div class="wrapper-title-filter">
            <p class="xl-text">Author</p>
            <div class="search-container">
              <input type="text" placeholder="author name..." />
              <img src="../../assets/icons/search-icon.svg" alt="search-icon" />
            </div>
          </div>

          <div class="container-options">
            <!-- לבנות דרך הקוד, ולשים לב לא לשכוח להוסיף לכל קומפוננטה את הדאטה סט כאטריביוט -->
          </div>
        </div>
        <div class="container-bot-border">
          <div class="wrapper-title-filter">
            <p class="xl-text">Friends' Books</p>
            <div class="search-container">
              <input type="text" placeholder="alice143..." />
              <img src="../../assets/icons/search-icon.svg" alt="search-icon" />
            </div>
          </div>

          <div class="container-options">
            <!-- לבנות דרך הקוד, ולשים לב לא לשכוח להוסיף לכל קומפוננטה את הדאטה סט כאטריביוט -->
          </div>
        </div>
        <div class="container-bot-border">
          <div class="wrapper-title-filter">
            <p class="xl-text">Rate</p>
          </div>
          <div class="container-options container-flex space">
            <div data-stars="3" class="opt">
              <img src="../../assets/icons/sqr-icon.svg" alt="sqr-icon" />
              <p class="sm-text">3 stars or less</p>
            </div>
            <div data-stars="4" class="opt">
              <img src="../../assets/icons/sqr-icon.svg" alt="sqr-icon" />
              <p class="sm-text">4 stars</p>
            </div>
            <div data-stars="5" class="opt">
              <img src="../../assets/icons/sqr-icon.svg" alt="sqr-icon" />
              <p class="sm-text">5 stars</p>
            </div>
          </div>
        </div>
        <div class="container-bot-border">
          <div class="wrapper-title-filter">
            <p class="xl-text">Release Date</p>
          </div>
          <div class="container-options container-flex-col space gap-03">
            <div data-date="none" class="opt">
              <img src="../../assets/icons/circle.svg" alt="sqr-icon" />
              <p class="sm-text">none</p>
            </div>
            <div data-date="newest to oldest" class="opt">
              <img src="../../assets/icons/circle.svg" alt="sqr-icon" />
              <p class="sm-text">newest to oldest</p>
            </div>
            <div data-date="oldest to newest" class="opt">
              <img src="../../assets/icons/circle.svg" alt="sqr-icon" />
              <p class="sm-text">oldest to newest</p>
            </div>
          </div>
        </div>
        <div class="container-bot-border">
          <div class="wrapper-title-filter">
            <p class="xl-text">Book Type</p>
          </div>
          <div class="container-options container-flex-col space gap-03">
            <div data-type="both" class="opt">
              <img src="../../assets/icons/circle.svg" alt="sqr-icon" />
              <p class="sm-text">Both</p>
            </div>
            <div data-type="ebooks" class="opt">
              <img src="../../assets/icons/circle.svg" alt="sqr-icon" />
              <p class="sm-text">Only eBooks</p>
            </div>
            <div data-type="phys" class="opt">
              <img src="../../assets/icons/circle.svg" alt="sqr-icon" />
              <p class="sm-text">Only physical books</p>
            </div>
          </div>
        </div>
        <div class="container-flex-col center gap-1"></div>
        <div class="btn select-btn sm-text font-reg btn-gradient">Select</div>
      </div>
  `;

  $(".bg-dark").addClass("open");
  $(".bg-dark").append(popup);
  $("#popup-filters").addClass("open");

  // Remove previous event listeners
  $(".btn-x").off("click");

  // Add event listener to the "btn-x" to close the nav slide
  $(".btn-x").on("click", () => {
    $(".bg-dark").empty();
    $(".bg-dark").removeClass("open");
  });
};

// page: profile
// shows the user information on a book (done reading? for sale? write review)
const popupBookInfo = () => {
  const popup = ``;

  $(".bg-dark").addClass("open");
  $(".bg-dark").append(popup);
  $("#popup-book-info").addClass("open");

  // Remove previous event listeners
  $(".btn-x").off("click");
  $(".switch-btn").off("click");

  // Add event listener to the "btn-x" to close the nav slide
  $(".btn-x").on("click", () => {
    $(".bg-dark").empty();
    $(".bg-dark").removeClass("open");
  });

  // add listener to switch btns
  $(".switch-btn.sale").on("click", function () {
    $(this).toggleClass("checked");
  });
  $(".switch-btn.done").on("click", function () {
    $(this).toggleClass("checked");
    if ($(this).hasClass("checked")) {
      confetti();
    }
  });
};

// page: other-user-profile
// shows a popup
const popupBookSaleOffer = () => {
  const popup = ``;

  $(".bg-dark").addClass("open");
  $(".bg-dark").append(popup);
  $("#popup-book-sale").addClass("open");

  // Remove previous event listeners
  $(".btn-x").off("click");

  // Add event listener to the "btn-x" to close the nav slide
  $(".btn-x").on("click", () => {
    $(".bg-dark").empty();
    $(".bg-dark").removeClass("open");
  });
};

// page: book info
// show a popup of a author data
const openPopupAuthor = (author) => {
  const popup = `
    <div id="popup-author" class="popup-container container-flex-col gap-1">
        <img src="../../assets/icons/X.svg" class="btn-x" />
        <div class="container-flex justify-content-space"> 
        <p class="xxl-text">${author.name}</p>
          <img
            src="${
              author.pictureUrl || "../../assets/images/author-placeholder.png"
            }"
            alt="author image"
            class="author-image"
          />
        </div>
        <p class="md-text">${author.biography}</p>
        <a href="${author.wikiLink}" class="more-info">more-info</a>
      </div>`;

  $(".bg-dark").addClass("open");
  $(".bg-dark").append(popup);
  $("#popup-author").addClass("open");

  // Remove previous event listeners
  $(".btn-x").off("click");

  // Add event listener to the "btn-x" to close the nav slide
  $(".btn-x").on("click", () => {
    $(".bg-dark").empty();
    $(".bg-dark").removeClass("open");
  });
};
