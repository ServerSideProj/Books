const isLoggedIn = localStorage.getItem("authToken") !== null;

$(document).ready(function () {
  getTopEBooks();
  getTopPhysical();
});

const getTopEBooks = () => {
  for (let i = 0; i < 5; i++) {
    let card = generateBookCard(true);
    $("#top-ebooks").append(card);
  }
  $("#top-ebooks > *").each(function () {
    const likeBtn = $(this).find(".like-btn").get(0);
    $(likeBtn).on("click", function () {
      if (isLoggedIn) $(this).toggleClass("liked");
      else {
        popupLogin();
      }
    });
  });
};

const getTopPhysical = () => {
  for (let i = 0; i < 5; i++) {
    let card = generateBookCard(true);
    $("#top-physicals").append(card);
  }
  $("#top-physicals > *").each(function () {
    const likeBtn = $(this).find(".like-btn").get(0);
    $(likeBtn).on("click", function () {
      if (isLoggedIn) $(this).toggleClass("liked");
      else {
        popupLogin();
      }
    });
  });
};
