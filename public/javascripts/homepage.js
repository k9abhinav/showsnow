gsap.from(".inbanner h1, .inbanner h5", {
    opacity: 0, // Start from 0 opacity
    y: 20, // Move 20 pixels down
    duration: 1, // Animation duration
    delay: 0.5, // Delay the animation
    ease: "power4.out" // Easing function
  });
  document.addEventListener('DOMContentLoaded', function () {
    const locoScroll = new LocomotiveScroll({
      el: document.getElementsByClassName('all'), // Use the appropriate element here
      smooth: true
    });
  });
  
  
  // var currentIndex = 0;

  //   function prevBtn() {
  //     currentIndex = (currentIndex - 1 + 4) % 4;
  //     updateCarousel();
  //   }

  //   function nextBtn() {
  //     currentIndex = (currentIndex + 1) % 4;
  //     updateCarousel();
  //   }

  //   function updateCarousel() {
  //     const carouselInner = document.querySelector('.carousel-inner');
  //     const translateValue = -currentIndex * 100;
  //     carouselInner.style.transform = `translateX(${translateValue}%)`;
  //   }
