$(document).ready(function () {
  $(".buy-books-btn").on("click", payment);
});

const payment = () => {
  //TODO: send the items to the server
  //TODO: remove all items from the local storage

  // Add sound effect
  const audio = new Audio("../../assets/sounds/payment.mp3");
  audio.play();
};
