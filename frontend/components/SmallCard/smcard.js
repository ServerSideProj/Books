$(document).ready(function () {
  generatecards();
});

const generatecards = () => {
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 10; i++) {
      const card = `
        <div class="sm-card">
            <img src="" alt="" class="image-author" />
            <div class="container-flex-col">
            <p class="xl-text">name of author</p>
            <p class="sm-text grey-text">name of author</p>
            </div>
        </div>`;
      $(`.line${j}`).append(card);
    }
  }
};
