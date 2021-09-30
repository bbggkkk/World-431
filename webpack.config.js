const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/main.ts",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          /* devMode ? 'style-loader' : */
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, '@src'),
      path.resolve(__dirname, 'node_modules'),
    ],
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      "@src": path.resolve(__dirname, './src')
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
  mode: "development",
  watch: true,
};
