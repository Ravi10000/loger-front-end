window.fbAsyncInit = function () {
  console.log("initializing facebook sdk");
  FB.init({
    appId: "1365874960801238",
    cookie: true,
    xfbml: true,
    version: "18.0",
  });

  FB.AppEvents.logPageView();
};

(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");
