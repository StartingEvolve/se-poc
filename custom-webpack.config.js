const { DefinePlugin } = require("webpack");

// Export a configuration object
// See [Wepack's documentation](https://webpack.js.org/configuration/) for additional ideas of how to
// customize your build beyond what Angular provides.
module.exports = {
  plugins: [
    new DefinePlugin({
      'process.env.SE_API_KEY': JSON.stringify(process.env.SE_API_KEY),
      'process.env.SE_AUTH_DOMAIN': JSON.stringify(process.env.SE_AUTH_DOMAIN),
      'process.env.SE_PROJECT_ID': JSON.stringify(process.env.SE_PROJECT_ID),
      'process.env.SE_STORAGE_BUCKET': JSON.stringify(process.env.SE_STORAGE_BUCKET),
      'process.env.SE_MESSAGING_SENDER_ID': JSON.stringify(process.env.SE_MESSAGING_SENDER_ID),
      'process.env.SE_APP_ID': JSON.stringify(process.env.SE_APP_ID),
      'process.env.SE_MEASUREMENT_ID': JSON.stringify(process.env.SE_MEASUREMENT_ID)
    })
  ]
};
