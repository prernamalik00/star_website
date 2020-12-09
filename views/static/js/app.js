const nav = document.querySelector("nav");
window.onscroll = function () {
  myFunction();
};

// CHANGING NAVBAR COLOUR ON SCROLL

function myFunction() {
  if (window.pageYOffset > 10) {
    nav.classList.add("scroll", "shadow-sm");
  } else {
    nav.classList.remove("scroll", "shadow-sm");
  }
}

// STOPPING PHOTO GALLERY ON HOVER
var pictures = document.getElementsByClassName("gallery-pic");
for (var i = 0; i < pictures.length; i++) {
  pictures[i].addEventListener("mouseover", function () {
    document.getElementsByClassName("box")[0].style.webkitAnimationPlayState =
      "paused";
  });
  pictures[i].addEventListener("mouseout", function () {
    document.getElementsByClassName("box")[0].style.webkitAnimationPlayState =
      "running";
  });
}

// EXPANDING & COLLAPSING OF ALUMNI TALKS SEASON SECTION

function showMore(id, collapse_element) {
  document.getElementById(id).classList.remove("d-block");
  document.getElementById(id).classList.add("d-none");
  document.getElementById(collapse_element).classList.remove("d-none");
  document.getElementById(collapse_element).classList.add("d-block");
}
function closeMore(id, collapse_element) {
  document.getElementById(id).classList.remove("d-none");
  document.getElementById(id).classList.add("d-block");
  document.getElementById(collapse_element).classList.remove("d-block");
  document.getElementById(collapse_element).classList.add("d-none");
}
