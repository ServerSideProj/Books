$(document).ready(function() {
    const navbarHTML = `
        <div class="navbar-desktop">
            <div class="container-full-space">
                <a href="/cart"><img src="../assets/icons/Shopping cart.svg" alt="Shopping Cart" class="cart-icon"></a>
                <a href="/store" class="sm-text">Bookstore</a>
            </div>
            <div class="logo-container">
                <a href="/"><img src="../assets/logo/logo-nav.svg" alt="logo" class="logo-nav"></a>
            </div>
            <div class="container-full-space right">
                <a href="/login" class="sm-text">Login</a>
                <a href="/signup" class="btn btn-gradient btn-signup-nav sm-text">Sign up</a>
            </div>
        </div>
    `;

    $('.navbar').html(navbarHTML);
});