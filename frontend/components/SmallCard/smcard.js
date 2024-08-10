function generateCards(authors) {
  let index = 0;
  for (var j = 1; j <= 2; j++) {
    for (var i = 0; i < 8; i++) {
      if (index < authors.length) {
        var author = authors[index];
        var card = `
          <div class="sm-card">
              <img src="${
                author.pictureUrl ||
                "../../assets/images/author-placeholder.png"
              }" alt="${author.name}" class="image-author" />
              <div class="container-flex-col gap-03">
              <p class="xl-text">${author.name || "Name of Author"}</p>
              <p class="sm-text grey-text">Number of books: <span class="books-amount">${
                author.bookCount || "0"
              }</span></p>
              </div>
          </div>`;

        $(`.line${j}-a`).append(card);
        $(`.line${j}-b`).append(card);
        index += 1;
      } else {
        break;
      }
    }
  }
}
