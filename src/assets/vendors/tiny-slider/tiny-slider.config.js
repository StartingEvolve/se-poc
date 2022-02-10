export default class TinySliderConfig {
  constructor() {
    this.slider = this.init();
  }

  init() {
    return window.tns({
      container: '.article-slider',
      slideBy: 1,
      controlsContainer: '#carousel-controls',
      mouseDrag: true,
      loop: false,
      nav: false,
      gutter: 50,
      autoplayButtonOutput: false,
      swipeAngle: false,
      preventScrollOnTouch: 'force',
      responsive: {
        350: {
          items: 1,
          edgePadding: 30,
          fixedWidth: 300
        },
        500: {
          items: 3,
          fixedWidth: 400
        }
      }
    });
  }

  destroy() {
    this.slider.destroy();
  }

  rebuild() {
    return this.slider.rebuild();
  }
}
