const nav = document.querySelector("nav");
window.onscroll = function () {
  myFunction();
};

function myFunction() {
  if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
    nav.classList.add("scroll", "shadow-sm");
  } else {
    nav.classList.remove("scroll", "shadow-sm");
  }
}

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
