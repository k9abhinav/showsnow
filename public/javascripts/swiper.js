var swiper = new Swiper(".mySwiper", {
  
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  grabcursor:true,
  slidesPerView: 1,
  spaceBetween: 10,
  breakpoints: {
    900: {
        slidesPerView: 3,
    },
    600: {
      slidesPerView:2 ,
  }},
});
