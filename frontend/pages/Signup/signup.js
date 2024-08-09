import { register } from '../../services/auth.js';

$(document).ready(function() {
    $('.form-login').on('submit', function(event) {
        event.preventDefault();

        const username = $('.form-login input[type="text"]').val();
        const email = $('.form-login input[type="email"]').val();
        const password = $('.form-login input[type="password"]').eq(0).val();
        const confirmPassword = $('.form-login input[type="password"]').eq(1).val();

        // Simple validation for password match
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // Call the register function
        register(username, password, email)
            .then(success => {
                if (success) {
                    console.log('Registration successful');
                    // Redirect to login or home page
                    window.location.href = '/pages/Home/';
                } else {
                    console.log('Registration failed');
                    // Optionally, show an error message to the user
                }
            })
            .catch(error => {
                console.error('Error during registration:', error);
                // Optionally, show an error message to the user
            });
    });
});
