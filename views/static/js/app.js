

const nav = document.querySelector('nav');
window.onscroll = function() {myFunction()};

function myFunction() {
  if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
    nav.classList.add("scroll", "shadow-sm");
  } else {
    nav.classList.remove("scroll", "shadow-sm");
  }
}
