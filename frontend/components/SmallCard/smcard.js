$(document).ready(function () {
  generatecards();
});

const generatecards = () => {
  for (let j = 1; j <= 2; j++) {
    for (let i = 0; i < 8; i++) {
      const card = `
        <div class="sm-card">
            <img src="../../assets/images/author-placeholder.png" alt="" class="image-author" />
            <div class="container-flex-col">
            <p class="xl-text">name of author</p>
            <p class="sm-text grey-text">Number of books: <span class="books-amount">4</span></p>
            </div>
        </div>`;
      $(`.line${j}-a`).append(card);
      $(`.line${j}-b`).append(card);
    }
  }
};
