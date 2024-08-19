var transactions = [];

$(document).ready(function () {
  fetchTransactions(); // get all transactions
});

// get all transactions
function fetchTransactions() {
  fetchData(
    API_URL +
      "Transaction/seller-transactions/" +
      localStorage.getItem("email"),
    renderTransactions,
    onError
  );
}

// render all transactions
const renderTransactions = (transactions) => {
  $(".container-cart-books").empty();
  transactions.forEach((transaction) => {
    const authorsList = transaction.authors
      .map((author) => author.name)
      .join(", ");

    const bookHTML = `
          <div class="book-list" id="transaction-${transaction.transactionId}">
            <div class="container-flex gap-1 center-hor book-details">
              <img
                src="${transaction.imageLink}"
                alt="${transaction.title}"
                class="book-cover"
              />
              <div>
                <div class="title md-text">${transaction.title}</div>
                <div class="author sm-text">by ${authorsList}</div>
              </div>
            </div>
            <div class="purple-text font-reg sm-text offer">
              <span class="bold username">${transaction.username}</span> sent an offer
            </div>
            <div class="actions">
              <div class="offer-coins xl-text purple-text">
                <span>${transaction.coinsOffer}</span> coins
              </div>
              <div class="accept-btn btn btn-purple sm-text" data-transaction-id="${transaction.transactionId}" data-transaction-coins="${transaction.coinsOffer}">Accept</div>
              <div class="decline-btn btn btn-grey-stroke sm-text" data-transaction-id="${transaction.transactionId}">Decline</div>
            </div>
          </div>
        `;

    $(".container-cart-books").append(bookHTML);
  });

  $(".accept-btn").on("click", (e) => {
    var transactionId = $(e.target).data("transaction-id");
    var transactionCoins = $(e.target).data("transaction-coins");

    acceptOffer(transactionId, transactionCoins);
  });

  $(".decline-btn").on("click", (e) => {
    var transactionId = $(e.target).data("transaction-id");

    declineOffer(transactionId);
  });
};

const acceptOffer = (transactionId, coins) => {
  localStorage.setItem(
    "coins",
    parseInt(localStorage.getItem("coins")) + coins
  );
  sendData(
    API_URL + "Transaction/accept/" + transactionId,
    null, // No data
    () => {
      fetchTransactions();
      // Play the payment sound effect
      const audio = new Audio("../../assets/sounds/payment.mp3");
      audio.play();
      popupText("Congrats for selling your book!");
    },
    onError
  );
};

const declineOffer = (transactionId) => {
  sendData(
    API_URL + "Transaction/decline/" + transactionId,
    null, // No data
    () => {
      fetchTransactions();
      const audio = new Audio("../../assets/sounds/whoosh-delete.mp3");
      audio.play();
    },
    onError
  );
};
