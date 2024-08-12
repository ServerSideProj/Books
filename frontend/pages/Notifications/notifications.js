var transactions = [];

$(document).ready(function () {
  fetchTransactions();
});

function fetchTransactions() {
  fetchData(
    API_URL +
      "Transaction/seller-transactions/" +
      localStorage.getItem("email"),
    showTransaction,
    ECB
  );
}

const showTransaction = (data) => {
  transactions = data;
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
              <div class="btn btn-purple sm-text" onclick="acceptOffer(${transaction.transactionId}, ${transaction.coinsOffer})">Accept</div>
              <div class="btn btn-grey-stroke sm-text" onclick="declineOffer(${transaction.transactionId})">Decline</div>
            </div>
          </div>
        `;

    $(".container-cart-books").append(bookHTML);
  });
};

const acceptOffer = (transactionId, coins) => {
  localStorage.setItem(
    "coins",
    parseInt(localStorage.getItem("coins")) + coins
  );
  console.log(transactionId);
  sendData(
    API_URL + "Transaction/accept/" + transactionId,
    () => refreshTransactionDiv(transactionId),
    ECB
  );
};

const declineOffer = (transactionId) => {
  sendData(
    API_URL + "Transaction/decline/" + transactionId,
    () => refreshTransactionDiv(transactionId),
    ECB
  );
};

const refreshTransactionDiv = (transactionId) => {
  // Remove only the specific transaction div
  $(`#transaction-${transactionId}`).remove();

  // Optionally, fetch the updated list of transactions
  fetchTransactions();
};

const ECB = (error) => {
  console.log(error);
};
