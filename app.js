const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  links.forEach(link => {
    link.classList.toggle("fade");
  });
});

$(document).ready(function(){
  
  PopUpHide();
});

function PopUpShow(){
  $("#popup1").show();
}

function PopUpHide(){
  $("#popup1").hide();
}

// jQuery(function($) {
//   // code
//       const sign = $('.singIn');
//       const signBlock = $('.sign-blok');
//       const signBlock_active =  $('.sign-blok_active');
//       const exit = $('.exit')
  
//       sign.click(function (){
//           signBlock.toggleClass('sign-blok_active')
//       });
//       exit.click(function (){
//           signBlock.removeClass('sign-blok_active')
//       });
//   });