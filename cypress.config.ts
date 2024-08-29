import { defineConfig } from "cypress";
import path from "path";
import { NormalModuleReplacementPlugin } from "webpack";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
      webpackConfig: {
        plugins: [
          new NormalModuleReplacementPlugin(
            /next\/image/,
            require.resolve(
              path.join(__dirname, "cypress", "mocks", "next", "image")
            )
          ),
        ],
      },
    },
  },
});
