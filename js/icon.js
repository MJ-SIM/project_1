document.addEventListener("DOMContentLoaded", function() {
    var myIcon1 = document.getElementById("myIcon1");
    var myIcon2 = document.getElementById("myIcon2");
  
    if (myIcon1) {
      myIcon1.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "https://blog.naver.com/newzerto8";
      });
    }
  
    if (myIcon2) {
      myIcon2.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "https://www.instagram.com";
      });
    }
  });
  