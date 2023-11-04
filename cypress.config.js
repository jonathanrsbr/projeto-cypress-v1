const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    pluginsFile: false,
    viewportWidth: 1280,
    viewportHeight: 880
  },
});
