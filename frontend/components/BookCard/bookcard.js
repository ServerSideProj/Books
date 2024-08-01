const generateBookCard = (isDefault) => {
  // check if need to add extra details to card
  if (!isDefault) {
    const bookcardFull = `<div class="book-card">
    <div class="book-car-img">
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
    <div class="book-car-img">
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
