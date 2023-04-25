// Change the button text when user is logged in
$(document).ready(function () {
        var id = JSON.parse(sessionStorage.getItem('user_auth'));
        if (id) {
            $('#login-btn').html("Logout");
        }

    }

);
$(document).on('click', '#login-btn', function () {

    var id = JSON.parse(sessionStorage.getItem('user_auth'));
    var login_text = $('#login-btn').html();
    // redirect to login page when the user is not logged in
    if (id && (login_text == "Volunteer Login")) {
        window.location.href = "/login";
        console.log($('#login-btn').html());
    } else if (!id && (login_text == "Volunteer Login")) {
        window.location.href = "/login";
    } else {
        // clear the session storage on successfull logout
        sessionStorage.clear();
        $('#login-btn').html("Volunteer Login");

        // Alert for confirmation of logout
        swal.fire({
            title: "Logout Successful",
            showConfirmButton: true,
            cancelButtonColor: "#FF0000",
            confirmButtonColor: "#008000",
            allowOutsideClick: false,
            confirmButtonText: 'OK'
        }).then(function(){
            // redirect to home page
            window.location.href = "index.html";
        })
    }
})