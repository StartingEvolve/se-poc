export default class TinySliderConfig {
  constructor(container) {
    this.slider = this.init(container);
  }

  init(container) {
    return window.tns({
      container: '.' + container + '-slider',
      slideBy: 1,
      controlsContainer: '#carousel-controls',
      mouseDrag: true,
      loop: false,
      nav: false,
      gutter: 50,
      autoplayButtonOutput: false,
      swipeAngle: false,
      preventScrollOnTouch: 'auto',
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
