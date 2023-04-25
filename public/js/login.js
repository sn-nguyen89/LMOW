// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var user;
var signInCheck;

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            user = authResult.user;
            if (authResult.additionalUserInfo.isNewUser) {
                db.collection("users").doc(user.uid).set({
                    name: user.displayName,
                    email: user.email,
                    privilege: "Guest"
                }).then(function () {
                    console.log("New user added to firestore");
                    setID(user.uid, user.displayName).then(function () {
                        window.location.href = "index.html";
                    });

                }).catch(function (error) {
                    console.log("Error adding new user: " + error);
                });

            } else {
                setID(user.uid, user.displayName).then(function () {
                });
                return true;
            }
            console.log("test2");
            console.log(user.uid);
            setID(user.uid);
            return false;
        },
        uiShown: function () {}
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'index.html',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        //firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        //firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
};

// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

async function setID(user, name) {
    sessionStorage.setItem('user_auth', JSON.stringify(user));
    sessionStorage.setItem('user_name', JSON.stringify(name));

}