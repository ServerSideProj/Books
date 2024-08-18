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
const popupFriends = (friendsList, type) => {
  const friendCards = friendsList
    .map((friend) => {
      return `
      <div class="container-friend">
        <div class="friend-wrapper">
          <img src="${
            friend.profileImage || "../../assets/images/user-profile-image.svg"
          }" alt="profile image" class="friend-profile-img" />
          <p class="friend-name">${friend.username}</p>
        </div>
        <div class="btn xsm-text btn-follow">${type}</div>
      </div>`;
    })
    .join(""); // Join all friend cards into a single string
  const popup = `
   <div id="popup-friends" class="popup-container gap-2">
        <img src="../../assets/icons/X.svg" class="btn-x" />
        <div class="container-flex-col gap-03 center width100">
          <p class="xl-text">
           <span id="num-of-follow">${friendsList.length}</span>
            <span id="popup-type">${
              type.charAt(0).toUpperCase() + type.slice(1)
            }</span>
          </p>
          <div class="search-container">
            <input type="text" placeholder="Name of user" />
            <img src="../../assets/icons/search-icon.svg" alt="search-icon" />
          </div>
        </div>
        <div class="container-users-friends">
        ${friendCards}
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
      <div class="container-flex-col width100">
        <div class="container-bot-border">
          <div class="wrapper-title-filter">
            <p class="xl-text">Category</p>
            <div class="search-container">
            <input list="categories" id="category-input" placeholder="Pick a category">
            <datalist id="categories"></datalist>
            </div>
          </div>
        </div>
        <div class="container-bot-border">
          <div class="wrapper-title-filter">
            <p class="xl-text">Author</p>
            <div class="search-container">
              <input list="authors" id="author-input" placeholder="Pick an author" />
              <datalist id="authors"></datalist>
            </div>
          </div>
        </div>
        <div id="filter-friends" class="container-bot-border">
          <div class="wrapper-title-filter">
            <p class="xl-text">Friends' Books</p>
            <div class="search-container">
              <input list="friends" id="friends-input" placeholder="Pick a friend" />
              <datalist id="friends"></datalist>
            </div>
          </div>
        </div>
        <div class="container-bot-border">
          <div class="wrapper-title-filter">
            <p class="xl-text">Rate</p>
          </div>
          <div class="container-options container-flex space mobile-col" data-stars="true">
            <div data-stars="0" class="opt">
              <img src="../../assets/icons/circle-checked.svg" alt="sqr-icon" />
              <p class="sm-text">all rates</p>
            </div>
            <div data-stars="3" class="opt">
              <img src="../../assets/icons/circle.svg" alt="sqr-icon" />
              <p class="sm-text">above 3 stars</p>
            </div>
            <div data-stars="4" class="opt">
              <img src="../../assets/icons/circle.svg" alt="sqr-icon" />
              <p class="sm-text">above 4 stars</p>
            </div>
            <div data-stars="5" class="opt">
              <img src="../../assets/icons/circle.svg" alt="sqr-icon" />
              <p class="sm-text">5 stars</p>
            </div>
          </div>
        </div>
        <div class="container-bot-border">
          <div class="wrapper-title-filter">
            <p class="xl-text">Release Date</p>
          </div>
          <div class="container-options container-flex-col space gap-03" data-date="true">
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
          <div class="container-options container-flex-col space gap-03" data-type="true">
            <div data-type="both" class="opt">
              <img src="../../assets/icons/circle-checked.svg" alt="sqr-icon" />
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
        <div class="container-flex-col center gap-1 "></div>
        <div class="btns-space container-flex">
          <div class="btn clear-btn sm-text font-reg btn-grey-stroke">Clear all filters</div>
          <div class="btn select-btn sm-text font-reg btn-gradient">Select</div>
        </div>
      </div>
    </div>
  `;

  $(".bg-dark").addClass("open");
  $(".bg-dark").append(popup);
  $("#popup-filters").addClass("open");
  if (!isLoggedIn) {
    $("#friends-input").parent().css("background-color", "var(--grey-light)");
    $("#friends-input").attr("placeholder", "Have no friends yet.");
    $("#friends-input").css("pointer-events", "none");
  }

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
const popupBookInfo = (book) => {
  const saleSection = !book.isEbook
    ? `<div class="row-bot-line">
       <p class="xl-text">Open for sale?</p>
       <div class="switch-btn sale" data-book-id=${book.id} data-copy-id=${book.copyId}>
         <div class="circle-switch"></div>
       </div>
     </div>`
    : "";

  const popup = `
  <div id="popup-book-info"
      class="popup-container popup-flex-row gap-2 bg-white"
      >
      <img src="../../assets/icons/X.svg" class="btn-x" />
      <div class="card-popup">
        <img
          src="${
            book.imageLink || "../../assets/images/book-cover-placeholder.png"
          } "
          alt="book cover"
          class="book-cover"
        />
        <div class="container-flex-col center text-center">
          <p class="title l-text">${book.title}</p>
          <p class="authors sm-text grey-text"> 
          ${book.authors.map((author) => author.name).join(", ")}
          </p>
        </div>
      </div>
      <div class="container-flex-col center-ver">
        <div class="row-bot-line">
          <p class="xl-text">Finished reading?</p>
          <div class="switch-btn done" data-book-id=${book.id} data-copy-id=${
    book.copyId
  }>
            <div class="circle-switch"></div>
          </div>
        </div>
        ${saleSection}
        <div class="container-flex-col gap-1 width100">
          <div class="row-bot-line no-line padding-0">
            <p class="xl-text">Write a review</p>
            <div class="stars">*****</div>
          </div>
          <textarea class="input-box-sqr"></textarea>
          <div class="btn btn-gradient">Send</div>
        </div>
      </div>
    </div>
    `;

  $(".bg-dark").addClass("open");
  $(".bg-dark").append(popup);
  $("#popup-book-info").addClass("open");

  // Set the initial state of the finished reading and sale switches based on the book's status
  if (book.finishedReading) {
    $(".switch-btn.done").addClass("checked");
  }
  if (book.isForSale) {
    $(".switch-btn.sale").addClass("checked");
  }

  // Remove previous event listeners
  $(".btn-x").off("click");
  $(".switch-btn").off("click");

  // Add event listener to the "btn-x" to close the nav slide
  $(".btn-x").on("click", () => {
    $(".bg-dark").empty();
    $(".bg-dark").removeClass("open");
  });

  // Event handler for the "Sale" toggle bookmark
  $(".switch-btn.sale").on("click", function () {
    $(this).toggleClass("checked");
    let isForSale = $(this).hasClass("checked");

    // Prepare the data to be sent to the server
    let data = {
      bookId: book.id,
      copyId: book.copyId,
      userEmail: book.ownerEmail,
      isEbook: book.isEbook,
      isForSale: isForSale,
    };

    // Construct the URL with query parameters
    let url = `${API_URL}Book/update-sale-status?copyId=${
      data.copyId
    }&userEmail=${encodeURIComponent(data.userEmail)}&isEbook=${
      data.isEbook
    }&isForSale=${data.isForSale}`;

    // Send the POST request with an empty body
    $.ajax({
      url: url,
      type: "POST",
      success: function (response) {
        isForSaleStatus(data, response);
      },
      error: onError,
    });
  });

  // Event handler for the "Fone" toggle bookmark
  $(".switch-btn.done").on("click", function () {
    $(this).toggleClass("checked");
    let finishedReading = $(this).hasClass("checked");

    // Prepare the data to be sent to the server
    let data = {
      bookId: book.id,
      copyId: book.copyId,
      userEmail: book.ownerEmail,
      isEbook: book.isEbook,
      finishedReading: finishedReading,
    };

    // Construct the URL with query parameters
    let url = `${API_URL}Book/update-finished-reading?copyId=${
      data.copyId
    }&userEmail=${encodeURIComponent(data.userEmail)}&isEbook=${
      data.isEbook
    }&finishedReading=${data.finishedReading}`;

    $.ajax({
      url: url,
      type: "POST",
      success: function (response) {
        isFinishedReading(data, response);
      },
      error: onError,
    });
  });
};

// page: other-user-profile
// shows a popup
const popupBookSaleOffer = (book) => {
  const popup = `
  <div
        id="popup-book-sale"
        class="popup-container popup-flex-row gap-2 bg-white"
      >
        <img src="../../assets/icons/X.svg" class="btn-x" />
        <div class="card-popup">
          <img
            src="${
              book.imageLink || "../../assets/images/book-cover-placeholder.png"
            }"
            alt="book cover"
            class="book-cover"
          />
          <div class="container-flex-col center">
            <p class="title l-text">${book.title}</p>
            <p class="authors sm-text grey-text">
            ${book.authors.map((author) => author.name).join(", ")}</p>
          </div>
        </div>
        <div class="container-flex-col center-ver">
          <div>
            <p class="xl-text">How many Story-coins would you like to offer</p>
            <p class="xxl-text bold">for this book?</p>
          </div>
          <div class="container-flex gap-1">
            <div class="btn sqr-purple-btn">5</div>
            <div class="btn sqr-purple-btn">10</div>
            <div class="btn sqr-purple-btn">20</div>
            <div class="btn sqr-purple-btn">30</div>
            <div class="btn sqr-purple-btn">50</div>
          </div>
          <div id="send-offer-btn" class="btn btn-gradient" data-copy-id="${
            book.copyId
          }" data-book-id="${book.id}">Send Offer</div>
        </div>
      </div>
      `;

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

  $("#send-offer-btn").on("click", () => {
    if ($("#send-offer-btn").hasClass("available")) {
      var selectedText = $(".container-flex .sqr-purple-btn.selected").text();
      console.log(selectedText);

      // Prepare the data to be sent in the POST request
      var dataToSend = {
        transactionId: 0, // changed in the server
        salerEmail: sessionStorage.getItem("friendEmail"),
        buyerEmail: localStorage.getItem("email"),
        coinsOffer: parseInt(selectedText),
        copyId: $("#send-offer-btn").data("copy-id"),
        bookId: $("#send-offer-btn").data("book-id"),
        isActive: true, // changed in the server
        isAccepted: true, // changed in the server
        transactionDate: new Date().toISOString(), // changed in the server
      };
      console.log(dataToSend);

      // Make the AJAX POST request
      $.ajax({
        url: `${API_URL}Transaction/create`,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(dataToSend),
        success: function (response) {
          // Handle the success scenario
          popupText("Your request was sent successfully!🚀");
        },
        error: function (xhr, status, error) {
          // Check if the error message returned from the server is "Insufficient coins."
          if (
            xhr.responseJSON &&
            xhr.responseJSON.error === "Insufficient coins."
          ) {
            popupText("Sorry, you don't have enough Story-coins :(");
          } else if (
            xhr.responseJSON &&
            xhr.responseJSON.error ===
              "New offer must be greater than the last rejected offer."
          ) {
            popupText(
              "New offer must be greater than the last rejected offer."
            );
          } else if (
            xhr.responseJSON &&
            xhr.responseJSON.error === "Transaction limit exceeded."
          ) {
            popupText(
              "Transaction limit exceeded. </br> You can make only 2 transactions."
            );
          }
        },
      });
    } else {
      $(".sqr-purple-btn").addClass("mark");
      setTimeout(function () {
        $(".sqr-purple-btn").removeClass("mark");
      }, 1500);
    }
  });

  $(".sqr-purple-btn").on("click", (e) => {
    $(".sqr-purple-btn").removeClass("selected");
    e.target.classList.add("selected");
    $("#send-offer-btn").addClass("available");
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

// pages: bookstore, bookInfo
// show popup that tells the user that this book is already on it's cart list.
const popupAlreadyOnCart = () => {
  const popup = `
        <div id="popup-on-cart" class="popup-container gap-2">
          <img src="../../assets/icons/X.svg" class="btn-x" />
          <p class="xxl-text">This book is already in your cart</p>
          <div class="container-flex-col center gap-1">
            <a href="/pages/Cart" class="sm-text">Go to cart</a>
          </div>
        </div>`;

  $(".bg-dark").append(popup);
  $(".bg-dark").addClass("open");
  $("#popup-on-cart").addClass("open");

  // Remove previous event listeners
  $(".btn-x").off("click");

  // Add event listener to the "btn-x" to close the nav slide
  $(".btn-x").on("click", () => {
    $(".bg-dark").empty();
    $(".bg-dark").removeClass("open");
  });
};
// pages: bookstore, bookInfo
// show popup that tells the user that this book is already on it's cart list.
const popupAlreadyPurchased = () => {
  const popup = `
        <div id="popup-on-cart" class="popup-container gap-2">
          <img src="../../assets/icons/X.svg" class="btn-x" />
          <p class="xxl-text text-center">This book is already purchased by you!</p>
          <div class="container-flex-col center gap-1">
            <a href="/pages/UserProfile" class="sm-text">See all purchased books</a>
          </div>
        </div>`;

  $(".bg-dark").append(popup);
  $(".bg-dark").addClass("open");
  $("#popup-on-cart").addClass("open");

  // Remove previous event listeners
  $(".btn-x").off("click");

  // Add event listener to the "btn-x" to close the nav slide
  $(".btn-x").on("click", () => {
    $(".bg-dark").empty();
    $(".bg-dark").removeClass("open");
  });
};

// page: cart
// Popup function for payment confirmation
const popupPayment = () => {
  const popup = `
    <div id="popup-payment" class="popup-container gap-2">
      <img src="../../assets/icons/X.svg" class="btn-x" />
      <p class="xxl-text">Added succesfully to your list 📚</p>
      <div class="container-flex-col center gap-1">
        <a href="/pages/userProfile" class="sm-text">See all of my books</a>
      </div>
    </div>
  `;

  $(".bg-dark").append(popup);
  $(".bg-dark").addClass("open");
  $("#popup-payment").addClass("open");

  // Remove previous event listeners
  $(".btn-x").off("click");

  // Add event listener to the "btn-x" to close the nav slide
  $(".btn-x").on("click", () => {
    $(".bg-dark").empty();
    $(".bg-dark").removeClass("open");
  });
};

// page: friend profile
// Popup function for notiffing the request was sent successfuly
const popupText = (text) => {
  const popup = `
        <div id="popup-text" class="popup-container gap-2">
          <img src="../../assets/icons/X.svg" class="btn-x" />
          <p class="xxl-text text-center">${text}</p>
        </div>`;

  $(".bg-dark").empty();
  $(".bg-dark").addClass("open");
  $(".bg-dark").append(popup);
  $("#popup-text").addClass("open");

  // Remove previous event listeners
  $(".btn-x").off("click");

  // Add event listener to the "btn-x" to close the nav slide
  $(".btn-x").on("click", () => {
    $(".bg-dark").empty();
    $(".bg-dark").removeClass("open");
  });
};
