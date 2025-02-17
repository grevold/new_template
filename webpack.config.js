const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const packageJson = require("./package.json");

const OUTPUT_FOLDER_NAME = path.resolve(__dirname, "build"); // Папка, куда всё заливаться сбилженный проект.

module.exports = (env, arg) => ({
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: OUTPUT_FOLDER_NAME,
    filename: "bundle.js",
    clean: true, // Очищает выходную папку перед сборкой
  }, // выходной файл
  resolve: {
    extensions: [".tsx", ".ts", ".js", "jsx", ".scss"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /.scss$/,
        use: [
          "style-loader", // Добавляет CSS в DOM
          "css-loader", // Обрабатывает @import и url()
          {
            loader: "sass-loader", // Компилирует Sass в CSS
            options: {
              // Дополнительные настройки, если необходимо
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      BASE_URL: arg.mode === "production" ? packageJson.homepage : "/",
    }),
  ],
  devServer: {
    static: {
      directory: OUTPUT_FOLDER_NAME,
    },
    port: 3000,
    historyApiFallback: true,
    compress: true,
  },
});
