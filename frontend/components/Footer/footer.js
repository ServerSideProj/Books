$(document).ready(function () {
  generateFooter();
});

const generateFooter = () => {
  const footer = `<div class="container-strokes">
        <img
          src="../../assets/images/curved-gradient.svg"
          alt="curved-line"
          class="curved-gradient c-g-1"
        />
        <img
          src="../../assets/images/curved-gradient.svg"
          alt="curved-line"
          class="curved-gradient c-g-2"
        />
      </div>
      <img
        src="../../assets/images/book1-100.svg"
        class="fly-book fly-book1"
        alt=""
      />
      <img
        src="../../assets/images/book2-100.svg"
        class="fly-book fly-book2"
        alt=""
      />
      <div class="container-flex-col center margin-top-4">
        <img
          src="../../assets/logo/logo-nav.svg"
          alt="logo"
          class="logo-footer"
        />
        <div class="container-flex gap-5">
          <div class="container-flex-col center gap-1">
            <img
              src="../../assets/images/ran-photo.png"
              alt="ran-meshulam"
              class="huge-img"
            />
            <div class="container-flex-col center gap-0">
              <p class="l-text bold">Ran Meshulam</p>
              <p class="sm-text">208211292</p>
              <p class="sm-text">ranmes16@gmail.com</p>
            </div>
          </div>
          <div class="container-flex-col center gap-1">
            <img
              src="../../assets/images/hila-photo.png"
              alt="hila-tsivion"
              class="huge-img"
            />
            <div class="container-flex-col center gap-0">
              <p class="l-text bold">Hila Tsivion</p>
              <p class="sm-text">211413216</p>
              <p class="sm-text">hilatsivion@gmail.com</p>
            </div>
          </div>
        </div>
      </div> `;
  $(".footer").html(footer);
};
