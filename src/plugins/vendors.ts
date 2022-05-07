export const vendors = [
  {
    name: 'tiny-slider',
    resources: {
      script: {
        scriptUrl: 'assets/vendors/tiny-slider/tiny-slider.js',
        isLoaded: false
      },
      style: 'assets/vendors/tiny-slider/tiny-slider.min.css',
      config: {
        configUrl: 'assets/vendors/tiny-slider/tiny-slider.config.js',
        configObjects: []
      }
    }
  },
  {
    name: 'typesense',
    resources: {
      script: {
        scriptUrl: 'assets/vendors/typesense/typesense.min.js',
        isLoaded: false
      },
      style: '',
      config: {
        configUrl: 'assets/vendors/typesense/typesense.config.js',
        configObjects: []
      }
    }
  },
  {
    name: 'botpress',
    resources: {
      script: {
        scriptUrl: 'http://localhost:3000/assets/modules/channel-web/inject.js',
        isLoaded: false
      },
      style: '',
      config: {
        configUrl: 'assets/vendors/botpress/botpress.config.js',
        configObjects: []
      }
    }
  }
];
