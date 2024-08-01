const popupLogin = () => {
  const popup = `
  <div class="bg-dark">
        <div class="popup-container gap-2">
          <img src="../../assets/icons/X.svg" class="btn-x" />
          <p class="xxl-text">You're not connected</p>
          <div class="container-flex-col center gap-1">
            <a
              href="/pages/signup"
              class="btn btn-gradient btn-signup-nav md-text"
              >Sign up</a
            >
            <a href="/pages/login" class="sm-text">Login</a>
          </div>
        </div>
      </div>`;

  $(".main").append(popup);
  $(".bg-dark").addClass("open");

  // Remove previous event listeners
  $(".btn-x").off("click");

  // Add event listener to the "btn-x" to close the nav slide
  $(".btn-x").on("click", () => {
    $(".bg-dark").removeClass("open");
  });
};
