let slider = tns({
  container: '.article-slider',
  items: 2,
  slideBy: 1,
  controlsContainer: '#carousel-controls',
  mouseDrag: true,
  nav: false,
  autoplayButtonOutput: false,
  swipeAngle: false,
  responsive: {
    350: {
      items: 1,
      edgePadding: 30
    },
    500: {
      items: 3
    }
  }
});
