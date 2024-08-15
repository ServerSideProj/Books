const generateBookCard_default = (book) => {
  return `
    <div data-book-id=${book.id} class="book-card">
      <div class="book-card-img" style="background-image: url('${
        book.imageLink
      }');">
          <div class="container-flex flex-end-space width100">
          <div
              class="price-wrapper on-cover-bg white-text xsm-text"
          >
              $${book.price}
          </div>
          <div
              class="type-wrapper on-cover-bg white-text xsm-text"
          >
          ${book.isEbook ? "eBook" : "Physical"}
          </div>
          </div>
      </div>
          <div class="container-flex-col gap-0 container-texts-card">
              <p class="md-text">${book.title}</p>
              <p class="xsm-text grey-text font-reg">
              ${book.authors.map((author) => author.name).join(", ")}
              </p>
          </div>
      </div>`;
};
const createBookmark = (type) => {
  //type can be "sale" or "done"
  const bookmark = `<img
        src="../../assets/icons/bookmark-${type}.png"
        class="bookmark ${type}"
        alt="bookmark"
    />`;
  return bookmark;
};

const addForSale = () => {
  //type can be "sale" or "done"
  const sign = `
  <div class="container-for-sale">
    <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
        d="M5.45833 5.45833H5.46542M5.45833 2.625H9C9.36257 2.62499 9.7251 2.7633 10.0017 3.03993L14.9601 7.99827C15.5134 8.55151 15.5134 9.44849 14.9601 10.0017L10.0017 14.9601C9.44849 15.5133 8.55151 15.5133 7.99827 14.9601L3.03993 10.0017C2.76331 9.72511 2.625 9.36256 2.625 9V5.45833C2.625 3.89353 3.89353 2.625 5.45833 2.625Z"
        stroke="#996F05"
        stroke-width="1.4"
        stroke-linecap="round"
        stroke-linejoin="round"
        />
    </svg>
    <p>For Sale</p>
    </div>`;
  return sign;
};

// Function to generate book card from data
function generateBookCard_allDetails(book) {
  return `
    <div data-book-id=${book.id} class="book-card">
      <div class="book-card-img" style="background-image: url('${
        book.imageLink
      }');">
        <div class="btn like-btn on-cover-bg">
          <img src="../../assets/icons/heart-white-stroke.svg" alt="heart"/>
        </div>
        <div class="container-flex flex-end-space width100">
          <div class="price-wrapper on-cover-bg white-text xsm-text">
            $${book.price}
          </div>
          <div class="type-wrapper on-cover-bg white-text xsm-text">
            ${book.isEbook ? "eBook" : "Physical"}
          </div>
        </div>
      </div>
      <div class="container-flex-col gap-0 width100">
        <p class="md-text">${book.title}</p>
        <p class="xsm-text grey-text font-reg">
        ${book.authors.map((author) => author.name).join(", ")}
          </p>
      </div>
      <div class="extra-details-card">
        <div class="container-flex-col gap-0">
          <div class="container-flex gap-03 center-hor">
            <p class="md-text">${book.avgRating}</p>
            <img src="../../assets/icons/star-empty.svg" alt="star"/>
            <p class="xsm-text grey-text font-reg">(${book.ratingCount})</p>
          </div>
          <p class="sm-text grey-text font-reg">${book.ratingCount} reviews</p>
        </div>
        <div class="btn add-to-cart">
          <img src="../../assets/icons/btn-add-cart.svg" alt="more info" data-book-id="${
            book.id
          }"/>
        </div>
      </div>
    </div>
  `;
}
