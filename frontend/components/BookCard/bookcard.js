const generateBookCard = (isDefault) => {
  // check if need to add extra details to card
  if (!isDefault) {
    const bookcardFull = `<div class="book-card">
    <div class="book-card-img">
        <div class="btn like-btn on-cover-bg">
        <img
            src="../../assets/icons/heart-white-stroke.svg"
            alt="heart"
        />
        </div>
        <div class="container-flex flex-end-space width100">
        <div
            class="price-wrapper on-cover-bg white-text xsm-text"
        >
            7 $
        </div>
        <div
            class="type-wrapper on-cover-bg white-text xsm-text"
        >
            Physical
        </div>
        </div>
    </div>
        <div class="container-flex-col gap-0">
            <p class="md-text">Name of the Book</p>
            <p class="xsm-text grey-text font-reg">
            Name of the Author
            </p>
        </div>
    <div class="extra-details-card">
        <div class="container-flex-col gap-0">
        <div class="container-flex gap-03 center-hor">
            <p class="md-text">0.0</p>
            <img
            src="../../assets/icons/star-empty.svg"
            alt="star"
            />
            <p class="xsm-text grey-text font-reg">
            (<span class="grey-text font-reg">000</span>)
            </p>
        </div>
        <p class="sm-text grey-text font-reg">
            <span>000</span> reviews
        </p>
        </div>
        <img
        src="../../assets/icons/btn-add-cart.svg"
        alt="add to cart"
        class="btn add-to-cart"
        />
    </div>
    </div>`;
    return bookcardFull;
  }

  const bookcardDefault = `<div class="book-card">
    <div class="book-card-img">
        <div class="btn like-btn on-cover-bg">
        <img
            src="../../assets/icons/heart-white-stroke.svg"
            alt="heart"
        />
        </div>
        <div class="container-flex flex-end-space width100">
        <div
            class="price-wrapper on-cover-bg white-text xsm-text"
        >
            7 $
        </div>
        <div
            class="type-wrapper on-cover-bg white-text xsm-text"
        >
            Physical
        </div>
        </div>
    </div>
        <div class="container-flex-col gap-0">
            <p class="md-text">Name of the Book</p>
            <p class="xsm-text grey-text font-reg">
            Name of the Author
            </p>
        </div>
    
    </div>`;
  return bookcardDefault;
};

const addBookmark = (type) => {
  //type can be "sale" or "done"
  const bookmark = `<img
        src="../../assets/icons/bookmark-${type}.png"
        class="bookmark"
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
