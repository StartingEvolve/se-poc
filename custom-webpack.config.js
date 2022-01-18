const { EnvironmentPlugin } = require("webpack");

// Export a configuration object
// See [Wepack's documentation](https://webpack.js.org/configuration/) for additional ideas of how to
// customize your build beyond what Angular provides.
module.exports = {
  plugins: [
    new EnvironmentPlugin([
      'SE_API_KEY',
      'SE_AUTH_DOMAIN',
      'SE_PROJECT_ID',
      'SE_STORAGE_BUCKET',
      'SE_MESSAGING_SENDER_ID',
      'SE_APP_ID',
      'SE_MEASUREMENT_ID'
    ])
  ]
};
