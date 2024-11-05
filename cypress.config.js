const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
  },
  numTestsKeptInMemory: 0, // Adjust as needed; 0 keeps no test results in memory
  experimentalMemoryManagement: true, // Optional: add this for better memory handling
});
