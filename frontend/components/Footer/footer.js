$(document).ready(function () {
  generateFooter();
});

const generateFooter = () => {
  const footer = `
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
              class="huge-img ran-img"
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
              class="huge-img hila-img"
            />
            <div class="container-flex-col center gap-0">
              <p class="l-text bold">Hila Tsivion</p>
              <p class="sm-text">211413216</p>
              <p class="sm-text">hilatsivion@gmail.com</p>
            </div>
          </div>
        </div>
        <a href="../../additions.html"><div class="btn btn-border-bot">click to see additions</div></a>
      </div> `;
  $(".footer").html(footer);
};
